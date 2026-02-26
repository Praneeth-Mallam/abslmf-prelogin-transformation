import { akshat, amit, sameer, sudhirs } from "../components";

export interface PartnerMember {
  name: string;
  title: string;
  description: string;
  image: any;
}

export const partnerTeamData: PartnerMember[] = [
  {
    name: "Sameer Narayan",
    title: "Head - Equity",
    description:
      "Mr. Sameer Narayan is a seasoned professional with over 27 years of experience in the Indian equity markets.",
    image: sameer,
  },
  {
    name: "Amit Kansal",
    title: "Head - Fixed Income",
    description:
      "Mr. Amit Kansal is an expert in fixed income markets with extensive experience in debt instruments and portfolio management.",
    image: amit,
  },
  {
    name: "Akshat Pandya",
    title: "Head - Real Estate Advisory",
    description:
      "Mr. Akshat Pandya leads our real estate advisory practice with comprehensive knowledge of property markets and investment strategies.",
    image: akshat,
  },
  {
    name: "Sudhir S",
    title: "Head - GIFT City",
    description:
      "Mr. Sudhir S oversees our GIFT City operations, bringing expertise in international financial services and regulations.",
    image: sudhirs,
  },
];