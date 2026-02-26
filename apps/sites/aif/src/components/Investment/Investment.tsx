"use client";

import React, { useState } from "react";
import styles from "./investement.module.scss";
import { ChevronRight } from "lucide-react";
import { TABS, investmentData, TabType } from "../../data/investmentData";
import { useAccessibility } from "@/src/context/AccessibilityContext";
import Image from "next/image";

const Investment = () => {
  const {
    textLevel,
    lineLevel,
    letterLevel,
    hideImages,
    grayscale,
    lowSaturation,
    highlightLinks,
  } = useAccessibility();

  const [activeTab, setActiveTab] = useState<TabType>("AIFs");
  const currentData = investmentData[activeTab];

  return (
    <section
      className={`${styles.container}
        ${styles[`textLevel${textLevel}`]}
        ${styles[`lineLevel${lineLevel}`]}
        ${styles[`letterLevel${letterLevel}`]}
        ${grayscale ? styles.grayscale : ""}
        ${lowSaturation ? styles.lowSaturation : ""}
        ${highlightLinks ? styles.highlightLinks : ""}
      `}
    >
      <div className={styles.title}>
        <h2>
          Product Suite of Alternate
          <span>Investment Opportunities</span>
        </h2>
      </div>

      <div className={styles.tabs} role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            aria-controls={`${tab.toLowerCase()}-panel`}
            className={`${styles.tab} ${activeTab === tab ? styles.active : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div
        className={styles.cards}
        role="tabpanel"
        id={`${activeTab.toLowerCase()}-panel`}
      >
        <div className={`${styles.card} ${styles.large}`}>
          {!hideImages && (
            <Image
              className={styles.media}
              src={currentData.largeCard.image}
              alt={currentData.largeCard.title}
              loading="lazy"
              width={486}
              height={459}
            />
          )}
          <div className={styles.cardContent}>
            <h4>{currentData.largeCard.title}</h4>
            {currentData.largeCard.stats && (
              <span className={styles.stats}>{currentData.largeCard.stats}</span>
            )}
            <p>{currentData.largeCard.description}</p>
          </div>
          <div className={styles.cardOverlay}>
            <button type="button">
              Send Inquiry <ChevronRight />
            </button>
          </div>
        </div>

        <div className={styles.rightCol}>
          <div className={styles.rightline}>
            {currentData.smallCards.map((card, index) => (
              <div key={index} className={styles.card}>
                {!hideImages && (
                  <Image
                    className={styles.media}
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    width={323}
                    height={347}
                  />
                )}
                <div className={styles.cardContent}>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
                <div className={styles.cardOverlay}>
                  <button type="button">
                    Send Inquiry <ChevronRight />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.cta} role="region" aria-labelledby="cta-heading">
            <div className={styles.ctacontent}>
              <h3 id="cta-heading">Get Curated Investment Opportunities</h3>
              <p>
                We offer customized portfolios in{" "}
                <span>Equity, Debt and Real Estate </span>
                for clients with<span> large ticket sizes.</span>
              </p>
            </div>

            <button
              type="button"
              className={styles.ctaButton}
              aria-label="Start a conversation about curated investment opportunities"
            >
              Start a Conversation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Investment;