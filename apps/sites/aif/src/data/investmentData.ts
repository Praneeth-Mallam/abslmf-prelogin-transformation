// investmentData.ts
import { giftcity1, giftcity2, invest1, invest2, invest3, pm1, pm2, pm3 } from "../components";

export const TABS = ["AIFs", "PMS", "GIFT CITY"] as const;
export type TabType = (typeof TABS)[number];

export interface Card {
  title: string;
  description: string;
  image: string;
  stats?: string;
}

export interface InvestmentCategory {
  largeCard: Card;
  smallCards: Card[];
}

export const investmentData: Record<TabType, InvestmentCategory> = {
  AIFs: {
    largeCard: {
      title: "Equity Strategies",
      description:
        "High-growth equity opportunities for long-term capital appreciation.",
      image: invest3,
    },
    smallCards: [
      {
        title: "Fixed Income",
        description:
          "Private credit strategies focused on stable income generation.",
        image: invest2,
      },
      {
        title: "Real Estate",
        description:
          "Residential and commercial real estate investment opportunities.",
        image: invest1,
      },
    ],
  },
  PMS: {
    largeCard: {
      title: "Equity Strategies",
      description:
        "Focused equity portfolios with personalised oversight.",
      image: pm1,
    },
    smallCards: [
      {
        title: "Fixed Income",
        description: "Structured Private Credit portfolios with disciplined risk management",
        image: pm2,
      },
      {
        title: "Real Estate",
        description: "Curated real estate portfolios with long-term income focus.",
        image: pm3,
      },
    ],
  },
  "GIFT CITY": {
    largeCard: {
      title: "Inbound",
      description:
        "Seamless inbound access to Indian markets.",
      image: giftcity2,
    },
    smallCards: [
      {
        title: "Outbound",
        description: "Indian capital diversifying across global markets",
        image: giftcity1,
      },
    ],
  },
};