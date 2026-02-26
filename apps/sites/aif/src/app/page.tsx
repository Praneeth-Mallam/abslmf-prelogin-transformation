"use client";

import { motion, AnimatePresence } from "framer-motion";
import SmoothScroll from "../components/common/common";

import Header from "@/src/components/Header/Header";
import Investment from "../components/Investment/Investment";
import { usePathname } from "next/navigation";
import CeoDetails from "../components/ceo-details/CeoDetail";
import InvestingCards from "../components/investing-cards/InvestingCards";
import Partner from "../components/partners/Partner";
import LetConnect from "../components/letconnect/LetConnect";
import Banner from "../components/banner/Banner";
import FooterGroup from "@/src/components/Footer/Footer";
import { ABC, abcd, AIFLogo, assetlogo } from "../components";

export default function Home() {
  const pathname = usePathname();
  return (
    <>
      <Header />
      <SmoothScroll>
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <main>
              <Banner />
              <Investment />
              <InvestingCards />
              <CeoDetails />
              <Partner />
              <LetConnect />
            </main>
            <FooterGroup
              logos={{
                alternateInvestmentsLogo: AIFLogo,
                assetManagementLogo: assetlogo,
                capitalLogo: ABC,
                abcdLogo: abcd,
              }}
            />
          </motion.div>
        </AnimatePresence>
      </SmoothScroll>
    </>
  );
}
