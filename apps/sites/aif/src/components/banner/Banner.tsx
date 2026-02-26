'use client';

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Banner.module.scss";
import TextWithMap from "../TextWithMap/TextWithMap";
import HomeBanner from "../home-banner/HomeBanner";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Banner = () => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const firstpageRef = useRef<HTMLDivElement>(null);
  const secondPageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Create a single timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: bannerRef.current,
          start: "top top",
          end: "+=200vh", // Adjust this value based on how long you want the animation to last
          scrub: 1, // Smooth scrubbing
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        }
      });

      // Animation sequence
      tl.fromTo(secondPageRef.current,
        { 
          opacity: 0, 
          pointerEvents: "none" 
        },
        { 
          opacity: 1, 
          pointerEvents: "auto",
          duration: 1,
          ease: "none"
        },
        0 // Start at beginning
      );

      // Optional: Add more animations
      tl.to({}, { duration: 0.5 }); // Hold for a bit

    }, bannerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={bannerRef} className={styles.mainSec}>
      <div ref={firstpageRef} className={styles.firstPage}>
        <HomeBanner />
      </div>
      <div ref={secondPageRef} className={styles.secondPage}>
        <TextWithMap />
      </div>
    </div>
  );
};

export default Banner;