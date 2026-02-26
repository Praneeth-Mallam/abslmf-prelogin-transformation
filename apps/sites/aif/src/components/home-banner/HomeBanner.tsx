'use client';

import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useAccessibility } from '@/src/context/AccessibilityContext';
import Image from 'next/image';
import styles from './HomeBanner.module.scss';
import { 
  HOME_BANNER_DATA, 
  BannerTabKey, 
  titleSmall, 
  description, 
  ctaPrimary, 
  // ctaSecondary
} from '@/src/data/homeBanner.data';
import { ArrowRight, bannerSec1 } from '..';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const ROTATE_INTERVAL = 4000;
const FADE_DURATION = 300;

const HomeBanner = () => {
  const {
    textLevel,
    lineLevel,
    letterLevel,
    hideImages,
    grayscale,
    lowSaturation,
    highlightLinks,
  } = useAccessibility();
  const [activeTab, setActiveTab] = useState<BannerTabKey>('equity');
  const [isFading, setIsFading] = useState(false);
  const [pause, setPause] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  const activeData = useMemo(
    () => HOME_BANNER_DATA.find((d) => d.key === activeTab)!,
    [activeTab]
  );

  const changeTabWithFade = useCallback((nextKey: BannerTabKey) => {
    if (nextKey === activeTab) return;

    setIsFading(true);

    setTimeout(() => {
      setActiveTab(nextKey);
      setIsFading(false);
    }, FADE_DURATION);
  }, [activeTab]);

  useEffect(() => {
    if (pause) return;

    const interval = setInterval(() => {
      const currentIndex = HOME_BANNER_DATA.findIndex((d) => d.key === activeTab);
      const nextIndex = (currentIndex + 1) % HOME_BANNER_DATA.length;
      changeTabWithFade(HOME_BANNER_DATA[nextIndex].key);
    }, ROTATE_INTERVAL);

    return () => clearInterval(interval);
  }, [activeTab, pause, changeTabWithFade]);

  useGSAP(() => {
    gsap.fromTo(bannerRef.current,
      {opacity:0},
      {opacity:1,duration:1,delay:1}
    )

  })

  return (
    <section
      ref={bannerRef}
      className={`${styles.banner} 
        ${styles[`textLevel${textLevel}`]} 
        ${styles[`lineLevel${lineLevel}`]} 
        ${styles[`letterLevel${letterLevel}`]}
        ${grayscale ? styles.grayscale : ''}
        ${lowSaturation ? styles.lowSaturation : ''}
        ${highlightLinks ? styles.highlightLinks : ''}
      `}
      aria-labelledby="home-banner-title"
    >
      {/* Background Video (lazy + no LCP impact) */}
      <video
        className={styles.video}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
      >
        <source src={bannerSec1} type="video/mp4" />
      </video>

      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.inner}>
        {/* LEFT CONTENT */}
        <div className={`${styles.left}`}>
          <p className={styles.kicker}>{titleSmall}</p>
          <div className={styles.homeBannerTitle}>
            <div className={styles.titleWrap}>
              <h1
                id="home-banner-title"
                className={isFading ? styles.fadeOut : styles.fadeIn}
              >
                <span className={styles.italicTitle}>{activeData.italicTitleBig}</span>
                <span className={styles.boldTitle}>{activeData.titleBig}</span>
              </h1>
            </div>
            <p className={`${styles.desc}`}>{description}</p>

            <div className={`${styles.actions}`}>
              <a href="/contact" className={styles.primaryBtn}>
                <span>{ctaPrimary}</span>
                {!hideImages && (
                  <Image src={ArrowRight} alt="ArrowRight" width={12} height={9} />
                )}
              </a>
              {/* <a href="/explore" className={styles.secondaryBtn}>
                <span>{ctaSecondary}</span>
                {!hideImages && (
                  <Image src={ArrowRight} alt="ArrowRight" width={12} height={9} />
                )}
              </a> */}
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className={`${styles.right}`}>
          {!hideImages && (
            <Image
              src={activeData.image}
              alt={activeData.titleBig}
              fill
              sizes="(max-width: 768px) 90vw, 40vw"
              priority={activeTab === 'equity'} // LCP only for first slide
              className={styles.heroImage}
            />
          )}
        </div>
      </div>
      {/* Tabs */}
      <div className={styles.tabSection}>
        <div
          className={styles.tabs}
          role="tablist"
          aria-label="Investment offerings"
        >
          {HOME_BANNER_DATA.map((tab) => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={activeTab === tab.key}
              className={`${styles.tab} ${
                activeTab === tab.key ? styles.active : ''
              }`}
              onClick={() => {
                setPause(true);
                changeTabWithFade(tab.key);
              }}
              type="button"
            >
              {tab.tabLabel}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;