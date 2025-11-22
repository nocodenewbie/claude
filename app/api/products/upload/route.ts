import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Papa from "papaparse";
import prisma from "@/lib/db/prisma";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get or create user in database
    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      // Create user if doesn't exist
      const clerkUser = await (await import("@clerk/nextjs/server")).currentUser();
      user = await prisma.user.create({
        data: {
          clerkId: userId,
          email: clerkUser?.emailAddresses[0]?.emailAddress || "",
          name: clerkUser?.firstName || "",
        },
      });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    const text = await file.text();

    // Parse CSV
    const results = Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
    });

    if (results.errors.length > 0) {
      return NextResponse.json(
        { error: "CSV parsing error", details: results.errors },
        { status: 400 }
      );
    }

    // Validate and create products
    const productsToCreate = results.data.map((row: any) => ({
      userId: user.id,
      name: row.name,
      description: row.description || null,
      sku: row.sku || null,
      category: row.category || null,
      costPrice: parseFloat(row.costPrice) || 0,
      sellPrice: parseFloat(row.sellPrice) || 0,
      unit: row.unit || "un",
      stock: parseInt(row.stock) || 0,
      active: true,
    }));

    // Bulk create products
    await prisma.product.createMany({
      data: productsToCreate,
      skipDuplicates: true,
    });

    return NextResponse.json({
      success: true,
      count: productsToCreate.length,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
