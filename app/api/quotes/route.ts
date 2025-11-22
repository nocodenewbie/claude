import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Parse query parameters for filtering
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    // Build where clause
    const where: any = {
      userId: user.id,
    };

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { customerName: { contains: search, mode: "insensitive" } },
        { customerEmail: { contains: search, mode: "insensitive" } },
      ];
    }

    // Get quotes with their items
    const quotes = await prisma.quote.findMany({
      where,
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Calculate statistics
    const stats = {
      total: quotes.length,
      pending: quotes.filter((q: any) => q.status === "pending").length,
      processing: quotes.filter((q: any) => q.status === "processing").length,
      completed: quotes.filter((q: any) => q.status === "completed").length,
      cancelled: quotes.filter((q: any) => q.status === "cancelled").length,
      totalRevenue: quotes
        .filter((q: any) => q.status === "completed")
        .reduce((sum: number, q: any) => sum + q.total, 0),
    };

    return NextResponse.json({
      quotes,
      stats,
      success: true,
    });
  } catch (error) {
    console.error("Quotes GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await req.json();
    const { customerName, customerEmail, customerPhone, items, notes } = body;

    // Validation
    if (!customerName || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Customer name and items are required" },
        { status: 400 }
      );
    }

    // Calculate totals
    let subtotal = 0;
    let totalDiscount = 0;

    const quoteItems = items.map((item: any) => {
      const itemSubtotal = item.price * item.quantity;
      const itemDiscount = itemSubtotal * (item.discountPercent || 0) / 100;
      subtotal += itemSubtotal;
      totalDiscount += itemDiscount;

      return {
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.price,
        discountPercent: item.discountPercent || 0,
        subtotal: itemSubtotal - itemDiscount,
      };
    });

    const total = subtotal - totalDiscount;

    // Create quote with items
    const quote = await prisma.quote.create({
      data: {
        userId: user.id,
        customerName,
        customerEmail: customerEmail || null,
        customerPhone: customerPhone || null,
        subtotal,
        discount: totalDiscount,
        total,
        status: "pending",
        notes: notes || null,
        items: {
          create: quoteItems,
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json({
      quote,
      success: true,
    });
  } catch (error) {
    console.error("Quotes POST error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
