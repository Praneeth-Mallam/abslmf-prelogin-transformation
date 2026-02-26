export interface SubLink {
  title?: string;
  slug?: string;
}
export interface MegaItem {
  label: string;
  href: string;
  title: string;
  desc: string;
}

export interface MegaMenu {
  items: MegaItem[];
}

export interface NavLink {
  title?: string;
  slug?: string;
  isParent?: boolean;
  subLinks?: SubLink[];
  megaMenu?: MegaMenu;
}
export const NAV_LINKS: NavLink[] = [
  {
    title: "Alternate Investments",
    slug: "alternate-investments",
    isParent: true,
    megaMenu: {
      items: [
        {
          label: "AIF",
          href: "/alternate-investments/aif",
          title: "Alternate Investment Fund (AIF)",
          desc: "We provide diversified investment options across equity, private credit, and real estate to enhance portfolio performance.",
        },
        {
          label: "PMS",
          href: "/alternate-investments/pms",
          title: "Portfolio Management Services (PMS)",
          desc: "Curated discretionary and non-discretionary strategies aligned to your goals and risk profile.",
        },
        {
          label: "GIFT City",
          href: "/alternate-investments/gift-city",
          title: "GIFT City",
          desc: "Access India-focused global investment solutions through IFSC GIFT City structures.",
        },
      ],
    },
  },

  {
    title: "Asset Classes",
    slug: "asset-classes",
    isParent: true,
    megaMenu: {
      items: [
        {
          label: "Equity",
          href: "/asset-classes/equity",
          title: "Equity Investments",
          desc: "Long-only, thematic, and sector-focused equity strategies for wealth creation.",
        },
        {
          label: "Private Credit",
          href: "/asset-classes/private-credit",
          title: "Private Credit",
          desc: "Structured debt opportunities offering steady yield and capital protection.",
        },
        {
          label: "Real Estate",
          href: "/asset-classes/real-estate",
          title: "Real Estate",
          desc: "Income-generating and growth-oriented real estate investment opportunities.",
        },
      ],
    },
  },

  {
    title: "Investor Profiles",
    slug: "investor-profiles",
  },

  {
    title: "Resources",
    slug: "resources",
    isParent: true,
    megaMenu: {
      items: [
        {
          label: "Insights",
          href: "/resources/insights",
          title: "Market Insights",
          desc: "Thought leadership, research papers, and investment outlook reports.",
        },
        {
          label: "Blogs",
          href: "/resources/blogs",
          title: "Investment Blogs",
          desc: "Educational content and strategic perspectives from our experts.",
        },
        {
          label: "Downloads",
          href: "/resources/downloads",
          title: "Downloads",
          desc: "Brochures, fact sheets, and regulatory disclosures.",
        },
      ],
    },
  },

  {
    title: "About Us",
    slug: "about-us",
    isParent: true,
    megaMenu: {
      items: [
        {
          label: "Company",
          href: "/about-us/company",
          title: "About the Company",
          desc: "Learn about our legacy, philosophy, and leadership team.",
        },
        {
          label: "Leadership",
          href: "/about-us/leadership",
          title: "Leadership Team",
          desc: "Meet the professionals driving our investment strategies.",
        },
        {
          label: "Careers",
          href: "/about-us/careers",
          title: "Careers",
          desc: "Join our team and build a career in alternative investments.",
        },
      ],
    },
  },
];
