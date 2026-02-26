"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

interface SmoothScrollProps {
  children: React.ReactNode;
}

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create ScrollSmoother instance
    const smoother = ScrollSmoother.create({
      wrapper: container,
      content: container.firstElementChild as HTMLElement,
      smooth: 3,
      effects: true,
    });

    return () => {
      // Cleanup
      if (smoother) {
        try {
          smoother.kill();
        } catch (error) {
          console.warn('Error killing ScrollSmoother:', error);
        }
      }
      ScrollTrigger.getAll().forEach(trigger => {
        try {
          trigger.kill();
        } catch (error) {
          console.warn('Error killing ScrollTrigger:', error);
        }
      });
    };
  }, []);

  return (
    <div ref={containerRef} id="smooth-wrapper">
      <div id="smooth-content">
        {children}
      </div>
    </div>
  );
};

export default SmoothScroll;