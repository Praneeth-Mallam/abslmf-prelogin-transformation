"use client";

import { useRef, useState } from "react";
import styles from "./InvestingCards.module.scss";
import { investingCardsData } from "@/src/data/investingCardsData";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "..";
import Questionnaire from "../Questionnaire/Questionnaire";
import { useAccessibility } from '@/src/context/AccessibilityContext';

const InvestingCards = () => {
  const [showComponent, setShowComponent] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: containerRef });
  const {
    textLevel,
    lineLevel,
    letterLevel,
    hideImages,
    grayscale,
    lowSaturation,
    highlightLinks,
  } = useAccessibility();
  const handleMouseEnter = contextSafe(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target1 = e.currentTarget.querySelector(`.${styles.hoverCircle}`);
      const target2 = e.currentTarget.querySelector(`.${styles.hoverCircle2}`);
      const targetImage = e.currentTarget.querySelector(
        `.${styles.gifWrap} img`,
      );

      if (target1) gsap.killTweensOf(target1);
      if (target2) gsap.killTweensOf(target2);
      if (targetImage) gsap.killTweensOf(targetImage);

      if (target2) {
        gsap.to(target2, {
          clipPath: "circle(150% at 0 0)",
          duration: 1.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      if (target1) {
        gsap.to(target1, {
          clipPath: "circle(150% at 0 0)",
          duration: 1.2,
          ease: "power2.out",
          delay: 0.2,
          overwrite: "auto",
        });
      }

      if (targetImage) {
        gsap.to(targetImage, {
          scale: 1.4,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    },
  );

  const handleMouseLeave = contextSafe(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target1 = e.currentTarget.querySelector(`.${styles.hoverCircle}`);
      const target2 = e.currentTarget.querySelector(`.${styles.hoverCircle2}`);
      const targetImage = e.currentTarget.querySelector(
        `.${styles.gifWrap} img`,
      );

      if (target1) gsap.killTweensOf(target1);
      if (target2) gsap.killTweensOf(target2);
      if (targetImage) gsap.killTweensOf(targetImage);

      if (target1) {
        gsap.to(target1, {
          clipPath: "circle(0% at 0 0)",
          duration: 0.4,
          ease: "power2.in",
          overwrite: "auto",
        });
      }
      if (target2) {
        gsap.to(target2, {
          clipPath: "circle(0% at 0 0)",
          duration: 0.4,
          ease: "power2.in",
          delay: 0.1,
          overwrite: "auto",
        });
      }

      if (targetImage) {
        gsap.to(targetImage, {
          scale: 1,
          duration: 0.4,
          ease: "power2.in",
          overwrite: "auto",
        });
      }
    },
  );

  const newPage = () => {
    setShowComponent(true)
  }

  if (showComponent) {
    return <Questionnaire onClose={() => setShowComponent(false)} />
  }

  return (
    <section
      className={`${styles.wrapper}
        ${styles[`textLevel${textLevel}`]}
        ${styles[`lineLevel${lineLevel}`]}
        ${styles[`letterLevel${letterLevel}`]}
        ${grayscale ? styles.grayscale : ''}
        ${lowSaturation ? styles.lowSaturation : ''}
        ${highlightLinks ? styles.highlightLinks : ''}
      `}
      ref={containerRef}
    >
      <div className={styles.header}>
        <h2>
          Please select a category that <br />{" "}
          <strong>best describes you</strong>
        </h2>
      </div>
      <div className={styles.grid}>
        {investingCardsData.map((card) => (
          <div
            key={card.id}
            className={styles.card}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            tabIndex={0}
            role="button"
            aria-label={card.title}
          >
            {/* Hover Circles */}
            <div className={styles.hoverCircle} />
            <div className={styles.hoverCircle2} />

            {/* Card Content */}
            <div className={styles.content}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>


            {/* Background GIF */}
            <div className={styles.gifWrap}>
              {!hideImages && (
                <Image src={card.gif} alt={card.title} width={204} height={227} unoptimized />
              )}
            </div>
          </div>

        ))}
      </div>
      <div className={styles.cta} onClick={newPage}>
        <p>Find What’s Right for You</p>
        <div className={styles.arrow}>
          {!hideImages && (
            <Image
              src={ArrowRight}
              alt="arrow right"
              width={18}
              height={18}
              style={{
                width: "18px",
                height: "18px",
                objectFit: "contain",
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default InvestingCards;
