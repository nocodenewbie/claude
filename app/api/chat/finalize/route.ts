import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";

export async function POST(req: NextRequest) {
  try {
    const {
      userId,
      customerName,
      customerEmail,
      customerPhone,
      items,
      subtotal,
      discount,
      total,
      notes,
    } = await req.json();

    // Validation
    if (!userId || !customerName || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create quote with items in a transaction
    const quote = await prisma.quote.create({
      data: {
        userId,
        customerName,
        customerEmail: customerEmail || null,
        customerPhone: customerPhone || null,
        subtotal: subtotal || 0,
        discount: discount || 0,
        total: total || 0,
        status: "pending",
        notes: notes || null,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            discountPercent: item.discountPercent || 0,
            subtotal: item.subtotal,
          })),
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
    console.error("Finalize quote error:", error);
    return NextResponse.json(
      { error: "Failed to create quote" },
      { status: 500 }
    );
  }
}
