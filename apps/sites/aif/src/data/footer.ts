import {
  Letter,
  fb,
  insta,
  linkind,
  playstore,
  X,
  yt,
  apple,
  Vector,
} from "../components";

export type MenuItem = {
  key: string;
  label: string;
  children?: string[];
};

export type UpperNoticeItem = {
  key: string;
  label: string;
  content?: string;
};

export type FooterData = {
  id: string;
  variant: "grey" | "purple" | "grey2";
  logo: { src: string; alt: string; subText?: string };
  socials?: { src: string; alt: string }[];
  contact?: {
    emailIcon: string | Blob | undefined;
    whatsappLabel: string;
    whatsappValue: string;
    emailLabel: string;
    emailValue: string;
    whatsappIcon?: string | Blob | undefined;
  };
  download?: {
    title: string;
    iconSrc: string;
    stores: { icon: string; text: string }[];
  };
  menu: MenuItem[];
  defaultOpenKey?: string;
};

export interface FooterGroupProps {
  logos: {
    alternateInvestmentsLogo: string;
    assetManagementLogo: string;
    capitalLogo: string;
    abcdLogo: string;
  };
}

// Social media icons
export const SOCIAL_ICONS = [
  { src: fb, alt: "facebook" },
  { src: X, alt: "twitter" },
  { src: insta, alt: "instagram" },
  { src: linkind, alt: "linkedin" },
  { src: yt, alt: "youtube" },
];

// Upper notice items
export const UPPER_NOTICE_ITEMS: UpperNoticeItem[] = [
  {
    key: "disclaimer",
    label: "DISCLAIMER",
    content:
      "Nulla vel aliquam pulvinar feugiat tempor tellus. Vitae egestas nisl gravida morbi. Nascetur non nibh urna hendrerit. Nec proin purus amet sed. Nibh non sed volutpat aliquet. Fringilla congue viverra pellentesque sit turpis scelerisque nisl tellus amet. Cum malesuada a vulputate venenatis ultricies lectus. Tellus ut vitae at nec auctor euismod laoreet.",
  },
  {
    key: "terms",
    label: "TERMS & CONDITION",
    content:
      "Nulla vel aliquam pulvinar feugiat tempor tellus. Vitae egestas nisl gravida morbi. Nascetur non nibh urna hendrerit. Nec proin purus amet sed. Nibh non sed volutpat aliquet. Fringilla congue viverra pellentesque sit turpis scelerisque nisl tellus amet. Cum malesuada a vulputate venenatis ultricies lectus. Tellus ut vitae at nec auctor euismod laoreet.",
  },
];

// Common menu items
const COMMON_MENU_ITEMS: MenuItem[] = [
  {
    key: "about",
    label: "ABOUT US",
    children: ["Our Company", "Our Team"],
  },
  { key: "offerings", label: "OUR OFFERINGS" },
  { key: "products", label: "PRODUCT SUITE" },
  { key: "benefit", label: "WHO CAN BENEFIT" },
  { key: "insights", label: "INSIGHTS" },
  { key: "resources", label: "RESOURCES" },
  { key: "careers", label: "CAREERS" },
  { key: "contact", label: "GET IN TOUCH" },
];

// Footer 1 data
export const createFooter1 = (
  logos: FooterGroupProps["logos"],
): FooterData => ({
  id: "footer-1",
  variant: "grey",
  logo: { src: logos.alternateInvestmentsLogo, alt: "Aditya Birla Capital" },
  socials: SOCIAL_ICONS,
  defaultOpenKey: "about",
  menu: COMMON_MENU_ITEMS,
});

// Footer 2 data
export const createFooter2 = (
  logos: FooterGroupProps["logos"],
): FooterData => ({
  id: "footer-2",
  variant: "purple",
  logo: { src: logos.assetManagementLogo, alt: "Aditya Birla Capital" },
  defaultOpenKey: "about",
  menu: COMMON_MENU_ITEMS,
});

// Footer 3 data
export const createFooter3 = (
  logos: FooterGroupProps["logos"],
): FooterData => ({
  id: "footer-3",
  variant: "grey2",
  logo: { src: logos.capitalLogo, alt: "Aditya Birla Capital" },
  defaultOpenKey: "company",
  contact: {
    whatsappLabel: "WhatsApp",
    whatsappValue: "1800 270 7000",
    emailLabel: "Email ID",
    emailValue: "abc@gmail.com",
    whatsappIcon: Vector,
    emailIcon: Letter,
  },
  download: {
    title: "DOWNLOAD ABCD",
    iconSrc: logos.abcdLogo,
    stores: [
      { icon: playstore, text: "Playstore" },
      { icon: apple, text: "Appstore" },
    ],
  },
  menu: [
    {
      key: "company",
      label: "COMPANY",
      children: [
        "Aditya Birla Housing Finance Limited",
        "Aditya Birla Health Insurance Company Limited",
        "Aditya Birla Sun Life Pension Fund Management Limited",
        "Aditya Birla Asset Reconstruction Company Limited",
        "Aditya Birla Finance Limited",
        "Aditya Birla Capital Limited",
        "Aditya Birla Capital Advisors Private Limited",
        "Aditya Birla Capital Services Limited",
        "Aditya Birla Money Limited",
        "Aditya Birla Sun Life Mutual Fund Limited",
        "Aditya Birla Wellness Private Limited",
        "Aditya Birla Capital Digital Limited",
      ],
    },
    {
      key: "solutions",
      label: "SOLUTIONS",
      children: [
        "Aditya Birla Sun Life Insurance Company Limited",
        "Aditya Birla Money Limited",
      ],
    },
    {
      key: "tools",
      label: "TOOLS & RESOURCES",
      children: [
        "Aditya Birla Sun Life Mutual Fund Limited",
        "Aditya Birla Wellness Private Limited",
      ],
    },
    {
      key: "useful",
      label: "USEFUL LINK",
      children: ["Aditya Birla Capital Digital Limited"],
    },
  ],
});
