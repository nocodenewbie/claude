import Anthropic from "@anthropic-ai/sdk";
import prisma from "@/lib/db/prisma";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export interface ExtractedProduct {
  name: string;
  quantity: number;
  specifications?: string;
}

export interface ExtractedQuote {
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  products: ExtractedProduct[];
  needsMoreInfo: boolean;
  missingInfo?: string[];
}

export class QuoteExtractor {
  private userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  /**
   * Extract quote information from a conversation
   */
  async extractFromConversation(
    messages: Array<{ role: string; content: string }>
  ): Promise<ExtractedQuote> {
    const extractionPrompt = `Analise esta conversa de vendas B2B e extraia as seguintes informações em formato JSON:

{
  "customerName": "nome do cliente (se mencionado)",
  "customerEmail": "email do cliente (se mencionado)",
  "customerPhone": "telefone do cliente (se mencionado)",
  "products": [
    {
      "name": "nome do produto",
      "quantity": quantidade_numerica,
      "specifications": "especificações adicionais (opcional)"
    }
  ],
  "needsMoreInfo": true/false,
  "missingInfo": ["lista de informações que ainda faltam"]
}

REGRAS:
1. Extraia APENAS produtos que foram claramente solicitados
2. Converta quantidades para números (ex: "duas caixas" = 2)
3. Se não houver produtos definidos ainda, retorne array vazio
4. needsMoreInfo = true se faltar nome do cliente OU produtos
5. missingInfo deve listar o que está faltando

Conversa:
${messages.map((m) => `${m.role}: ${m.content}`).join("\n")}

Retorne APENAS o JSON, sem explicações.`;

    try {
      const response = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: extractionPrompt,
          },
        ],
      });

      const textContent = response.content[0];
      const jsonText =
        textContent.type === "text" ? textContent.text : "{}";

      // Extract JSON from response (might have markdown formatting)
      const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No JSON found in response");
      }

      const extracted = JSON.parse(jsonMatch[0]) as ExtractedQuote;

      // Validate and clean
      if (!extracted.products) {
        extracted.products = [];
      }

      return extracted;
    } catch (error) {
      console.error("Quote extraction error:", error);
      // Return empty result on error
      return {
        products: [],
        needsMoreInfo: true,
        missingInfo: ["Não foi possível processar o pedido"],
      };
    }
  }

  /**
   * Match extracted products to database products
   */
  async matchProducts(
    extractedProducts: ExtractedProduct[]
  ): Promise<
    Array<{
      productId: string;
      quantity: number;
      confidence: number;
      extractedName: string;
    }>
  > {
    if (extractedProducts.length === 0) {
      return [];
    }

    // Get all user's products
    const allProducts = await prisma.product.findMany({
      where: {
        userId: this.userId,
        active: true,
      },
      select: {
        id: true,
        name: true,
        sku: true,
        category: true,
        description: true,
      },
    });

    const matches: Array<{
      productId: string;
      quantity: number;
      confidence: number;
      extractedName: string;
    }> = [];

    for (const extracted of extractedProducts) {
      const match = this.findBestMatch(extracted.name, allProducts);

      if (match) {
        matches.push({
          productId: match.id,
          quantity: extracted.quantity,
          confidence: match.confidence,
          extractedName: extracted.name,
        });
      }
    }

    return matches;
  }

  /**
   * Find best matching product using fuzzy matching
   */
  private findBestMatch(
    searchName: string,
    products: Array<{
      id: string;
      name: string;
      sku: string | null;
      category: string | null;
      description: string | null;
    }>
  ): { id: string; confidence: number } | null {
    const searchLower = searchName.toLowerCase().trim();

    let bestMatch: { id: string; confidence: number } | null = null;
    let highestScore = 0;

    for (const product of products) {
      let score = 0;

      const nameLower = product.name.toLowerCase();
      const skuLower = product.sku?.toLowerCase() || "";
      const categoryLower = product.category?.toLowerCase() || "";

      // Exact match on name or SKU
      if (nameLower === searchLower || skuLower === searchLower) {
        score = 100;
      }
      // Name contains search
      else if (nameLower.includes(searchLower)) {
        score = 80;
      }
      // Search contains name (partial match)
      else if (searchLower.includes(nameLower)) {
        score = 70;
      }
      // SKU match
      else if (skuLower && searchLower.includes(skuLower)) {
        score = 75;
      }
      // Category match (weak signal)
      else if (categoryLower && searchLower.includes(categoryLower)) {
        score = 40;
      }
      // Word overlap
      else {
        const searchWords = searchLower.split(/\s+/);
        const nameWords = nameLower.split(/\s+/);
        const overlap = searchWords.filter((w) => nameWords.includes(w)).length;
        score = (overlap / Math.max(searchWords.length, nameWords.length)) * 60;
      }

      if (score > highestScore) {
        highestScore = score;
        bestMatch = {
          id: product.id,
          confidence: score,
        };
      }
    }

    // Only return matches with confidence > 50
    return bestMatch && bestMatch.confidence > 50 ? bestMatch : null;
  }

  /**
   * Check if conversation is ready to create a quote
   */
  isReadyForQuote(extracted: ExtractedQuote): boolean {
    return (
      !extracted.needsMoreInfo &&
      extracted.products.length > 0 &&
      !!extracted.customerName
    );
  }

  /**
   * Format missing information as a friendly message
   */
  formatMissingInfo(extracted: ExtractedQuote): string {
    if (!extracted.needsMoreInfo) {
      return "";
    }

    if (!extracted.missingInfo || extracted.missingInfo.length === 0) {
      return "Preciso de algumas informações para continuar.";
    }

    const items = extracted.missingInfo.join(", ");
    return `Para finalizar, preciso saber: ${items}`;
  }
}
