'use client';

import React from 'react'
import styles from "./TextWithMap.module.scss"
import gsap from 'gsap';
import { useAccessibility } from '@/src/context/AccessibilityContext';
import { benguluru, hyderabad, mumbai, rightIcons } from '..';
import Image from 'next/image';

const TextWithMap = () => {
    const { 
        textLevel,
        lineLevel,
        letterLevel,
        hideImages,
        grayscale,
        lowSaturation,
        highlightLinks,
    } = useAccessibility();
    const [activeTab, setActiveTab] = React.useState('india');
    const indiaRef = React.useRef<HTMLImageElement>(null);
    const globalRef = React.useRef<HTMLImageElement>(null);
    const isMounted = React.useRef(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    React.useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }

        if (activeTab === 'global') {

            if (indiaRef.current) {
                gsap.to(indiaRef.current, {
                    opacity: 0,
                    scale: 0.4,
                    transformOrigin: "75% 40%",
                    duration: 1.5,
                    ease: 'power3.inOut'
                });
            }

            if (globalRef.current) {
                gsap.fromTo(globalRef.current,
                    { opacity: 0, scale: 2.5, transformOrigin: "75% 40%" },
                    { opacity: 1, scale: 1, duration: 1.5, ease: 'power3.inOut' }
                );
            }
        } else {

            if (globalRef.current) {
                gsap.to(globalRef.current,
                    {
                        opacity: 0,
                        scale: 2.5,
                        transformOrigin: "75% 40%",
                        duration: 1.5,
                        ease: 'power3.inOut'
                    }
                );
            }

            if (indiaRef.current) {
                gsap.fromTo(indiaRef.current,
                    { opacity: 0, scale: 0.4, transformOrigin: "75% 40%" },
                    { opacity: 1, scale: 1, duration: 1.5, ease: 'power3.inOut' }
                );
            }
        }
    }, [activeTab]);

    return (
        <div
            className={`${styles.wrapper} 
                ${styles[`textLevel${textLevel}`]} 
                ${styles[`lineLevel${lineLevel}`]} 
                ${styles[`letterLevel${letterLevel}`]}
                ${grayscale ? styles.grayscale : ''}
                ${lowSaturation ? styles.lowSaturation : ''}
                ${highlightLinks ? styles.highlightLinks : ''}
            `}
        >
            {!hideImages && (
                <Image
                    ref={indiaRef}
                    src="/asset/image/home/Banner9.png"
                    alt="India Presence"
                    className={styles.bgImage}
                    style={{ opacity: 1, zIndex: 1 }}
                    fill
                />
            )}
            {!hideImages && (
                <Image
                    ref={globalRef}
                    src="/asset/image/home/Banner10.png"
                    alt="Global Reach"
                    className={styles.bgImage}
                    style={{ opacity: 0, zIndex: 0 }}
                    fill
                />
            )}
            <div className={styles.fadeOverlay}></div>
            <div className={styles.leftSectionDiv}>
                <div className={styles.leftSection}>
                    <div className={styles.toggleContainer}>
                        <div
                            className={`${styles.toggleBtn} ${activeTab === 'india' ? styles.active : ''}`}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActiveTab('india')}
                            onClick={() => setActiveTab('india')}
                        >
                            INDIA PRESENCE
                        </div>
                        <div
                            className={`${styles.toggleBtn} ${activeTab === 'global' ? styles.active : ''}`}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActiveTab('global')}
                            onClick={() => setActiveTab('global')}
                        >
                            GLOBAL REACH
                        </div>
                    </div>

                    <h2 className={styles.heading}>
                        <span className={styles.sub}>A Presence That</span>
                        <span className={styles.subBold}>Spans Markets</span>
                    </h2>

                    <p className={styles.description}>
                        Strong domestic reach combined with a growing
                        footprint across emerging global markets.
                    </p>

                    <div className={styles.locationGrid}>
                        <div className={styles.locationCard}>
                            <div className={styles.icon}>
                                {!hideImages && (<Image src={hyderabad} alt="hyderabad" width={30} height={31} />)}
                            </div>
                            <div className={styles.conDiv}>
                                <h4>Mumbai</h4>
                                <p>12 Branches</p>
                            </div>
                            <div className={styles.arrow}>
                                {!hideImages && (<Image src={rightIcons} alt="right icons" width={11} height={11} />)}
                            </div>
                        </div>
                        <div className={styles.locationCard}>
                            <div className={styles.icon}>
                                {!hideImages && (<Image src={benguluru} alt="benguluru" width={51} height={31} />)}
                            </div>
                            <div className={styles.conDiv}>
                                <h4>Delhi</h4>
                                <p>12 Branches</p>
                            </div>
                            <div className={styles.arrow}>
                                {!hideImages && (<Image src={rightIcons} alt="right icons" width={11} height={11} />)}
                            </div>
                        </div>
                        <div className={styles.locationCard}>
                            <div className={styles.icon}>
                                {!hideImages && (<Image src={mumbai} alt="mumbai" width={49} height={31} />)}
                            </div>
                            <div className={styles.conDiv}>
                                <h4>Chennai</h4>
                                <p>12 Branches</p>
                            </div>
                            <div className={styles.arrow}>
                                {!hideImages && (<Image src={rightIcons} alt="right icons" width={11} height={11} />)}
                            </div>
                        </div>
                    </div>

                    <div
                        className={styles.link}
                        onClick={scrollToTop}
                    >
                        GO TO BANNER
                    </div>
                </div>
            </div>

            <div className={styles.mapSection}>
                <div className={`${styles.floatingStat} ${styles.stat1}`}>
                    <h3>90+</h3>
                    <p>Pan-India Locations</p>
                </div>

                <div className={`${styles.floatingStat} ${styles.stat2}`}>
                    <h3>100+</h3>
                    <p>Emerging Markets</p>
                </div>
            </div>
        </div>
    )
}

export default TextWithMap