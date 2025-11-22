import prisma from "@/lib/db/prisma";

export interface ProductQuote {
  productId: string;
  quantity: number;
  category?: string;
}

export interface NegotiatedItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  costPrice: number;
  originalPrice: number;
  discountPercent: number;
  discountAmount: number;
  subtotal: number;
  marginPercent: number;
  category: string | null;
}

export interface NegotiationResult {
  items: NegotiatedItem[];
  subtotal: number;
  totalDiscount: number;
  total: number;
  averageMargin: number;
  appliedRules: string[];
}

export class NegotiationEngine {
  private userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  /**
   * Main method to calculate discounts for a list of products
   */
  async calculateQuote(items: ProductQuote[]): Promise<NegotiationResult> {
    // Get all products
    const productIds = items.map((item) => item.productId);
    const products = await prisma.product.findMany({
      where: {
        id: { in: productIds },
        userId: this.userId,
        active: true,
      },
    });

    // Get active negotiation rules
    const rules = await prisma.negotiationRule.findMany({
      where: {
        userId: this.userId,
        active: true,
      },
      orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
    });

    const negotiatedItems: NegotiatedItem[] = [];
    const appliedRules: string[] = [];
    let subtotal = 0;
    let totalDiscount = 0;

    // Process each item
    for (const item of items) {
      const product = products.find((p) => p.id === item.productId);

      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }

      // Find applicable rule
      const applicableRule = this.findApplicableRule(
        rules,
        item.quantity,
        product.category
      );

      // Calculate discount
      const { discountPercent, marginPercent } = this.calculateDiscount(
        product,
        item.quantity,
        applicableRule
      );

      const originalPrice = product.sellPrice;
      const unitPrice = originalPrice * (1 - discountPercent / 100);
      const discountAmount = (originalPrice - unitPrice) * item.quantity;
      const itemSubtotal = unitPrice * item.quantity;

      negotiatedItems.push({
        productId: product.id,
        productName: product.name,
        quantity: item.quantity,
        unitPrice,
        costPrice: product.costPrice,
        originalPrice,
        discountPercent,
        discountAmount,
        subtotal: itemSubtotal,
        marginPercent,
        category: product.category,
      });

      subtotal += itemSubtotal;
      totalDiscount += discountAmount;

      if (applicableRule && !appliedRules.includes(applicableRule.name)) {
        appliedRules.push(applicableRule.name);
      }
    }

    const total = subtotal;
    const averageMargin = this.calculateAverageMargin(negotiatedItems);

    return {
      items: negotiatedItems,
      subtotal,
      totalDiscount,
      total,
      averageMargin,
      appliedRules,
    };
  }

  /**
   * Find the most applicable rule for a product
   */
  private findApplicableRule(
    rules: any[],
    quantity: number,
    category: string | null
  ): any | null {
    // Rules are already sorted by priority (descending)
    for (const rule of rules) {
      // Check quantity range
      if (quantity < rule.minQuantity) continue;
      if (rule.maxQuantity && quantity > rule.maxQuantity) continue;

      // Check category match
      if (rule.category) {
        if (rule.category !== category) continue;
      }

      // Rule matches!
      return rule;
    }

    return null;
  }

  /**
   * Calculate discount percentage based on product, quantity, and rule
   */
  private calculateDiscount(
    product: any,
    quantity: number,
    rule: any | null
  ): { discountPercent: number; marginPercent: number } {
    if (!rule) {
      // No rule applies, no discount
      const marginPercent = this.calculateMargin(
        product.costPrice,
        product.sellPrice
      );
      return { discountPercent: 0, marginPercent };
    }

    // Get discount from rule's discount ranges
    let discountPercent = 0;

    if (rule.discountRanges && Array.isArray(rule.discountRanges)) {
      // Find the highest discount that applies
      for (const range of rule.discountRanges) {
        if (quantity >= range.minQty && quantity <= (range.maxQty || Infinity)) {
          discountPercent = Math.max(discountPercent, range.discount);
        }
      }
    }

    // Cap at max discount from rule
    if (rule.maxDiscountPercent) {
      discountPercent = Math.min(discountPercent, rule.maxDiscountPercent);
    }

    // Calculate the price after discount
    const discountedPrice = product.sellPrice * (1 - discountPercent / 100);

    // Calculate margin at discounted price
    const marginPercent = this.calculateMargin(
      product.costPrice,
      discountedPrice
    );

    // Enforce minimum margin
    if (rule.minMarginPercent && marginPercent < rule.minMarginPercent) {
      // Reduce discount to meet minimum margin
      const minPrice =
        product.costPrice / (1 - rule.minMarginPercent / 100);
      const adjustedDiscount =
        ((product.sellPrice - minPrice) / product.sellPrice) * 100;
      discountPercent = Math.max(0, adjustedDiscount);

      const finalMarginPercent = this.calculateMargin(
        product.costPrice,
        product.sellPrice * (1 - discountPercent / 100)
      );

      return { discountPercent, marginPercent: finalMarginPercent };
    }

    return { discountPercent, marginPercent };
  }

  /**
   * Calculate margin percentage
   */
  private calculateMargin(costPrice: number, sellPrice: number): number {
    if (sellPrice <= 0) return 0;
    return ((sellPrice - costPrice) / sellPrice) * 100;
  }

  /**
   * Calculate average margin across all items
   */
  private calculateAverageMargin(items: NegotiatedItem[]): number {
    if (items.length === 0) return 0;

    const totalRevenue = items.reduce((sum, item) => sum + item.subtotal, 0);
    const totalCost = items.reduce(
      (sum, item) => sum + item.costPrice * item.quantity,
      0
    );

    if (totalRevenue <= 0) return 0;
    return ((totalRevenue - totalCost) / totalRevenue) * 100;
  }

  /**
   * Get a summary of available discounts for a product
   */
  async getDiscountInfo(productId: string): Promise<string> {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return "Produto não encontrado.";
    }

    const rules = await prisma.negotiationRule.findMany({
      where: {
        userId: this.userId,
        active: true,
        OR: [{ category: product.category }, { category: null }],
      },
      orderBy: [{ priority: "desc" }],
    });

    if (rules.length === 0) {
      return "Sem descontos disponíveis no momento.";
    }

    let info = "Descontos disponíveis:\n";
    for (const rule of rules) {
      if (rule.discountRanges && Array.isArray(rule.discountRanges)) {
        for (const range of rule.discountRanges) {
          info += `- ${range.minQty}+ unidades: ${range.discount}% de desconto\n`;
        }
      }
    }

    return info;
  }
}
