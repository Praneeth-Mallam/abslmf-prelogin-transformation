"use client";
import Image from "next/image";
import styles from "./ceo.module.scss";
import { ceo1, ceobg, comma } from "../index";
import { useAccessibility } from "@/src/context/AccessibilityContext";

export default function CeoDetails() {
  const {
    textLevel,
    lineLevel,
    letterLevel,
    hideImages,
    grayscale,
    lowSaturation,
    highlightLinks,
  } = useAccessibility();
  return (
    <section
      className={`${styles.ourCommitments}
        ${styles[`textLevel${textLevel}`]}
        ${styles[`lineLevel${lineLevel}`]}
        ${styles[`letterLevel${letterLevel}`]}
        ${grayscale ? styles.grayscale : ""}
        ${lowSaturation ? styles.lowSaturation : ""}
        ${highlightLinks ? styles.highlightLinks : ""}
      `}
      aria-labelledby="ceo-heading"
    >
      {!hideImages && (
        <Image
          src={ceobg}
          alt=""
          fill
          priority
          aria-hidden="true"
          className={`${styles.bgImage} w-full h-full object-cover`}
        />
      )}

      <div className={styles.container}>
        <div className={styles.left}>
          <h2 id="ceo-heading" className={styles.ceoMessage}>
            Strategy That Drives <span>Smart Decisions</span>
          </h2>

            {!hideImages && (
            <Image
              src={comma}
              alt=""
              width={100}
              height={100}
              aria-hidden="true"
              className={styles.media}
            />
          )}

          <blockquote className={`${styles.message} m-0`}>
            Our rich long-standing history and our ever-increasing investment
            management experience is a testament to our dedication towards our
            clients in this industry.
          </blockquote>

          <div className={styles.ceo}>
            <p className={styles.ceoTitle}>
              <strong>A. Balasubramanian</strong>
            </p>
            <p className={styles.ceoSubTitle}>
              Managing Director & Chief Executive Officer
            </p>
          </div>
        </div>

        <div className={styles.right}>
        {!hideImages && (
            <Image
              src={ceo1}
              alt="Portrait of A. Balasubramanian, Managing Director & CEO"
              width={750}
              height={740}
              className={`${styles.media} object-contain`}
              priority
            />
          )}
        </div>
      </div>
    </section>
  );
}
