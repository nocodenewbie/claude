import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { QuoteExtractor } from "@/lib/services/quote-extractor";
import { NegotiationEngine } from "@/lib/services/negotiation-engine";
import { buildSystemPrompt } from "@/lib/services/prompt-builder";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { messages, userId } = await req.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        {
          error: "API key not configured",
          message:
            "Desculpe, estou com um problema técnico. Por favor, contate o suporte.",
        },
        { status: 500 }
      );
    }

    // Format messages for Anthropic
    const formattedMessages = messages.map((msg: any) => ({
      role: msg.role === "assistant" ? "assistant" : "user",
      content: msg.content,
    }));

    // Build context-aware system prompt with product catalog
    const systemPrompt = await buildSystemPrompt(userId);

    // Call Anthropic Claude API
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      system: systemPrompt,
      messages: formattedMessages,
    });

    const assistantMessage = response.content[0];
    const messageText =
      assistantMessage.type === "text" ? assistantMessage.text : "";

    // Extract quote information from conversation (if userId provided)
    let quoteData = null;

    if (userId) {
      try {
        const extractor = new QuoteExtractor(userId);

        // Add Max's response to the conversation for extraction
        const fullConversation = [
          ...messages,
          { role: "assistant", content: messageText },
        ];

        // Extract quote information
        const extracted = await extractor.extractFromConversation(fullConversation);

        if (extracted.products.length > 0) {
          // Match products to database
          const matchedProducts = await extractor.matchProducts(extracted.products);

          if (matchedProducts.length > 0) {
            // Calculate negotiated prices
            const engine = new NegotiationEngine(userId);
            const negotiation = await engine.calculateQuote(
              matchedProducts.map((m) => ({
                productId: m.productId,
                quantity: m.quantity,
              }))
            );

            quoteData = {
              extracted,
              matchedProducts,
              negotiation,
              isReady: extractor.isReadyForQuote(extracted),
            };
          }
        }
      } catch (error) {
        console.error("Quote processing error:", error);
        // Don't fail the whole request if quote extraction fails
      }
    }

    return NextResponse.json({
      message: messageText,
      metadata: {
        model: response.model,
        usage: response.usage,
      },
      quoteData,
    });
  } catch (error: any) {
    console.error("Chat API error:", error);

    // Handle specific Anthropic errors
    if (error.status === 401) {
      return NextResponse.json(
        {
          error: "Invalid API key",
          message: "Configuração inválida. Contate o administrador.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Desculpe, tive um problema. Pode tentar novamente?",
      },
      { status: 500 }
    );
  }
}
