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

    // Get widget settings (should be only one per user)
    const settings = await prisma.widgetSettings.findFirst({
      where: { userId: user.id },
    });

    // Return default settings if none exist
    if (!settings) {
      return NextResponse.json({
        settings: {
          companyName: "Minha Empresa",
          primaryColor: "#2563eb",
          personality: "friendly",
          welcomeMessage: "Olá! Sou o Max, seu assistente de vendas. Como posso ajudar?",
        },
        success: true,
      });
    }

    return NextResponse.json({
      settings,
      success: true,
    });
  } catch (error) {
    console.error("Widget settings GET error:", error);
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
      companyName,
      primaryColor,
      personality,
      welcomeMessage,
      position,
      showOnPages,
    } = body;

    // Validation
    if (!companyName) {
      return NextResponse.json(
        { error: "Company name is required" },
        { status: 400 }
      );
    }

    // Check if settings already exist
    const existingSettings = await prisma.widgetSettings.findFirst({
      where: { userId: user.id },
    });

    let settings;

    if (existingSettings) {
      // Update existing settings
      settings = await prisma.widgetSettings.update({
        where: { id: existingSettings.id },
        data: {
          companyName,
          primaryColor: primaryColor || "#2563eb",
          personality: personality || "friendly",
          welcomeMessage:
            welcomeMessage ||
            "Olá! Sou o Max, seu assistente de vendas. Como posso ajudar?",
          position: position || "bottom-right",
          showOnPages: showOnPages || [],
        },
      });
    } else {
      // Create new settings
      settings = await prisma.widgetSettings.create({
        data: {
          userId: user.id,
          companyName,
          primaryColor: primaryColor || "#2563eb",
          personality: personality || "friendly",
          welcomeMessage:
            welcomeMessage ||
            "Olá! Sou o Max, seu assistente de vendas. Como posso ajudar?",
          position: position || "bottom-right",
          showOnPages: showOnPages || [],
        },
      });
    }

    return NextResponse.json({
      settings,
      success: true,
    });
  } catch (error) {
    console.error("Widget settings POST error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
