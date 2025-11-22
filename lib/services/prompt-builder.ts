import prisma from "@/lib/db/prisma";

const BASE_SYSTEM_PROMPT = `Você é o Max, um assistente virtual de vendas B2B especializado em distribuição e atacado.

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
- NUNCA mencione produtos que não estão no catálogo fornecido

ESTILO DE COMUNICAÇÃO:
- Use frases curtas e diretas
- Faça perguntas claras
- Demonstre entusiasmo com emojis quando apropriado 👍 ✅
- Sempre termine mensagens com uma pergunta ou call-to-action

PROCESSO DE VENDA:
1. Cumprimente e pergunte o nome do cliente
2. Identifique as necessidades (quais produtos)
3. Sugira produtos do catálogo
4. Informe sobre descontos por volume
5. Confirme quantidades
6. Recapitule o pedido
7. Pergunte dados de contato (email/telefone)
8. Finalize com entusiasmo

EXEMPLO DE CONVERSA:
Cliente: "Preciso de arroz"
Max: "Beleza, chefe! Temos arroz tipo 1 e tipo 2. Qual você prefere? E qual seria a quantidade que você tá precisando?"

Lembre-se: Você está aqui para FECHAR VENDAS e MAXIMIZAR O TICKET MÉDIO, sempre mantendo o cliente satisfeito!`;

export async function buildSystemPrompt(userId?: string): Promise<string> {
  if (!userId) {
    return BASE_SYSTEM_PROMPT;
  }

  try {
    // Get user's products
    const products = await prisma.product.findMany({
      where: {
        userId,
        active: true,
      },
      select: {
        name: true,
        category: true,
        sellPrice: true,
        description: true,
      },
      take: 50, // Limit to avoid token overflow
      orderBy: {
        name: "asc",
      },
    });

    if (products.length === 0) {
      return BASE_SYSTEM_PROMPT;
    }

    // Get negotiation rules for discount info
    const rules = await prisma.negotiationRule.findMany({
      where: {
        userId,
        active: true,
      },
      select: {
        name: true,
        minQuantity: true,
        maxDiscountPercent: true,
        category: true,
      },
      orderBy: {
        priority: "desc",
      },
      take: 10,
    });

    // Build product catalog section
    const productsByCategory: Record<string, any[]> = {};
    products.forEach((product) => {
      const category = product.category || "Outros";
      if (!productsByCategory[category]) {
        productsByCategory[category] = [];
      }
      productsByCategory[category].push(product);
    });

    let catalogText = "\n\n📦 CATÁLOGO DE PRODUTOS DISPONÍVEIS:\n\n";

    for (const [category, items] of Object.entries(productsByCategory)) {
      catalogText += `${category}:\n`;
      items.forEach((product) => {
        catalogText += `  • ${product.name}`;
        if (product.description) {
          catalogText += ` - ${product.description}`;
        }
        catalogText += `\n`;
      });
      catalogText += `\n`;
    }

    // Build discount rules section
    if (rules.length > 0) {
      catalogText += "\n💰 DESCONTOS DISPONÍVEIS:\n\n";
      rules.forEach((rule) => {
        catalogText += `  • ${rule.name}: `;
        if (rule.category) {
          catalogText += `${rule.category} - `;
        }
        catalogText += `a partir de ${rule.minQuantity} unidades, até ${rule.maxDiscountPercent}% de desconto\n`;
      });
    }

    catalogText += `\n⚠️ IMPORTANTE: Ofereça APENAS produtos listados acima. Se o cliente pedir algo não listado, sugira alternativas do catálogo ou informe que não temos no momento.\n`;

    return BASE_SYSTEM_PROMPT + catalogText;
  } catch (error) {
    console.error("Error building system prompt:", error);
    return BASE_SYSTEM_PROMPT;
  }
}
