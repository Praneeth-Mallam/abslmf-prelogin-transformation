"use client";

import React from "react";
import styles from "./partner.module.scss";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { arrowright } from "..";
import { partnerTeamData } from "@/src/data/teamData";
import { useAccessibility } from "@/src/context/AccessibilityContext";

const Partner = () => {
  const {
    textLevel,
    lineLevel,
    letterLevel,
    hideImages,
    grayscale,
    lowSaturation,
    highlightLinks,
  } = useAccessibility();

  const { contextSafe } = useGSAP();

  const imageBottom = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
    const image = e.currentTarget.querySelector(`.${styles.imagebox} img`);

    if (!image) return;

    gsap.to(image, {
      y: 250,
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
    });
  });

  const imageTop = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
    const image = e.currentTarget.querySelector(`.${styles.imagebox} img`);

    if (!image) return;

    gsap.to(image, {
      y: 0,
      opacity: 1,
      duration: 1.5,
      ease: "power2.out",
    });
  });

  return (
    <div
      className={`${styles.container}
        ${styles[`textLevel${textLevel}`]}
        ${styles[`lineLevel${lineLevel}`]}
        ${styles[`letterLevel${letterLevel}`]}
        ${grayscale ? styles.grayscale : ""}
        ${lowSaturation ? styles.lowSaturation : ""}
        ${highlightLinks ? styles.highlightLinks : ""}
      `}
    >
      <div className={styles.video1}>
        <video
          src="/asset/video/Landing_Page_Animation_Dark_Hole-Left.mp4"
          autoPlay
          loop
          muted
        />
      </div>

      <div className={styles.video2}>
        <video
          src="/asset/video/Landing_Page_Animation_Dark_Hole-Right.mp4"
          autoPlay
          loop
          muted
        />
      </div>

      <div className={styles.mainbox}>
        <div className={styles.card1}>
          <div className={styles.content}>
            <p>
              Your Trusted
              <span> Investment Partners </span>
            </p>
          </div>

          <div className={styles.right}>
            {partnerTeamData.map((member, index) => (
              <div
                className={styles.cards}
                key={member.name}
                onMouseEnter={imageBottom}
                onMouseLeave={imageTop}
              >
                <div className={styles.title}>
                  <h2>{member.name}</h2>
                  <p>{member.title}</p>
                </div>

                <div className={styles.imagebox}>
                  {!hideImages && (
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={248}
                      height={287}
                      priority={index < 2}
                      className={styles.media}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </div>

                <div className={styles.overlay}>
                  <div className={styles.overlayContent}>
                    <p>{member.description}</p>
                    <div className={styles.readMore}>
                      <span className={styles.text}>READ MORE</span>
                      <span className={styles.arrow}>→</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.cta}>
          <p>meet our team</p>
          <div className={styles.arrow}>
            {!hideImages && (
              <Image
                src={arrowright}
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
      </div>
    </div>
  );
};

export default Partner;
