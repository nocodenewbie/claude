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

    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const active = searchParams.get("active");
    const category = searchParams.get("category");

    // Build where clause
    const where: any = {
      userId: user.id,
    };

    if (active !== null) {
      where.active = active === "true";
    }

    if (category) {
      where.category = category;
    }

    // Get negotiation rules
    const rules = await prisma.negotiationRule.findMany({
      where,
      orderBy: [
        { priority: "desc" },
        { createdAt: "desc" },
      ],
    });

    return NextResponse.json({
      rules,
      total: rules.length,
      success: true,
    });
  } catch (error) {
    console.error("Rules GET error:", error);
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
    const {
      name,
      description,
      category,
      minQuantity,
      maxQuantity,
      minMarginPercent,
      maxDiscountPercent,
      discountRanges,
      priority,
      active,
    } = body;

    // Validation
    if (!name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (minMarginPercent === undefined || maxDiscountPercent === undefined) {
      return NextResponse.json(
        { error: "Margin and discount percentages are required" },
        { status: 400 }
      );
    }

    // Create negotiation rule
    const rule = await prisma.negotiationRule.create({
      data: {
        userId: user.id,
        name,
        description: description || null,
        category: category || null,
        minQuantity: minQuantity || 1,
        maxQuantity: maxQuantity || null,
        minMarginPercent,
        maxDiscountPercent,
        discountRanges: discountRanges || [],
        priority: priority || 0,
        active: active !== false,
      },
    });

    return NextResponse.json({
      rule,
      success: true,
    });
  } catch (error) {
    console.error("Rules POST error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
