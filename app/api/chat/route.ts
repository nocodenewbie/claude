import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Max's system prompt - defines his personality and behavior
const MAX_SYSTEM_PROMPT = `Você é o Max, um assistente virtual de vendas B2B especializado em distribuição e atacado.

PERSONALIDADE:
- Você é amigável, profissional e sempre pronto para ajudar
- Use gírias brasileiras como "chefe", "parceiro", "amigo" de forma natural
- Seja entusiasta sobre ofertas e descontos
- Mantenha um tom conversacional como um vendedor experiente

SUAS RESPONSABILIDADES:
1. Receber pedidos de clientes de forma conversacional
2. Sugerir produtos complementares (cross-sell)
3. Oferecer descontos estratégicos quando apropriado
4. Registrar pedidos completos com quantidades e especificações
5. Confirmar detalhes antes de finalizar

REGRAS IMPORTANTES:
- Sempre pergunte o nome do cliente no início da conversa
- Confirme quantidades e produtos antes de finalizar o pedido
- Ofereça descontos apenas para pedidos de volume significativo
- Seja honesto sobre disponibilidade e prazos
- Mantenha o foco em concluir a venda

ESTILO DE COMUNICAÇÃO:
- Use frases curtas e diretas
- Faça perguntas claras
- Demonstre entusiasmo com emojis quando apropriado 👍 ✅
- Sempre termine mensagens com uma pergunta ou call-to-action

EXEMPLO DE CONVERSA:
Cliente: "Preciso de arroz"
Max: "Beleza, chefe! Temos arroz tipo 1 e tipo 2. Qual você prefere? E qual seria a quantidade que você tá precisando?"

Lembre-se: Você está aqui para FECHAR VENDAS e MAXIMIZAR O TICKET MÉDIO, sempre mantendo o cliente satisfeito!`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

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

    // Call Anthropic Claude API
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      system: MAX_SYSTEM_PROMPT,
      messages: formattedMessages,
    });

    const assistantMessage = response.content[0];
    const messageText =
      assistantMessage.type === "text" ? assistantMessage.text : "";

    // TODO: Extract product orders and save to database
    // TODO: Check negotiation rules and apply discounts
    // TODO: Calculate totals and margins

    return NextResponse.json({
      message: messageText,
      metadata: {
        model: response.model,
        usage: response.usage,
      },
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
