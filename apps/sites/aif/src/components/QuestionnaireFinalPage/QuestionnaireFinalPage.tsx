"use client";

import { useRef, useState } from 'react';
import style from './QuestionnaireFinalPage.module.scss';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { useGSAP } from '@gsap/react';
import { dummyFunds } from '@/src/data/QuestionnaireFinalData';

gsap.registerPlugin(Draggable, InertiaPlugin);

export default function QuestionnaireFinalPage({ onClose }: { onClose?: () => void }) {
    const sliderRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [showArrows, setShowArrows] = useState(true);

    useGSAP(() => {
        const cards = sliderRef.current;
        const wrapper = wrapperRef.current;
        if (!cards || !wrapper) return;

        let draggableContext: any = null;

        const updateArrows = () => {
            const hasPadding = cards.classList.contains(style.hasOverflow);
            const paddingWidth = hasPadding ? 192 : 0; // 76*2 + 20*2 = 192px total padding space
            const intrinsicWidth = cards.scrollWidth - paddingWidth;
            const shouldShow = intrinsicWidth > wrapper.offsetWidth + 1;

            if (shouldShow !== hasPadding) {
                if (shouldShow) cards.classList.add(style.hasOverflow);
                else cards.classList.remove(style.hasOverflow);
            }

            setShowArrows(shouldShow);

            if (draggableContext && draggableContext[0]) {
                const newTotalWidth = cards.scrollWidth - wrapper.offsetWidth;
                draggableContext[0].applyBounds({ minX: -Math.max(0, newTotalWidth), maxX: 0 });
            }

            return cards.scrollWidth - wrapper.offsetWidth;
        };

        const initialTotalWidth = updateArrows();

        draggableContext = Draggable.create(cards, {
            type: "x",
            bounds: { minX: -Math.max(0, initialTotalWidth), maxX: 0 },
            inertia: true,
            cursor: "grab",
            activeCursor: "grabbing",
            edgeResistance: 0.65,
            onDrag: function () {
                if (cards) cards.style.userSelect = "none";
            },
            onDragEnd: function () {
                if (cards) cards.style.userSelect = "";
            }
        });

        const handleResize = () => {
            const newTotalWidth = updateArrows();
            if (draggableContext && draggableContext[0]) {
                draggableContext[0].applyBounds({ minX: -Math.max(0, newTotalWidth), maxX: 0 });
            }

            if (newTotalWidth <= 0 && gsap.getProperty(cards, "x") !== 0) {
                gsap.set(cards, { x: 0 });
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, { scope: wrapperRef });

    const scroll = (direction: 'left' | 'right') => {
        if (!sliderRef.current || !wrapperRef.current) return;
        const cards = sliderRef.current;
        const totalWidth = cards.scrollWidth - wrapperRef.current.offsetWidth;
        if (totalWidth <= 0) return;

        const scrollAmount = 340; // Roughly one card width + gap

        // Get current x position
        const currentX = gsap.getProperty(cards, "x") as number;
        let newX = direction === 'left'
            ? Math.min(currentX + scrollAmount, 0)
            : Math.max(currentX - scrollAmount, -totalWidth);

        gsap.to(cards, {
            x: newX,
            duration: 0.5,
            ease: "power2.out"
        });
    };

    return (
        <section className={style.wrapper}>
            <div className={style.headerContainer}>
                <button className={style.topBackToHome} onClick={() => onClose && onClose()}>
                    <ChevronLeft size={16} strokeWidth={2} /> <span>Back To Home</span>
                </button>
                <h2>Curated Paths</h2>
                <h1><strong>To Invest</strong></h1>
                <p>Below products are thoughtfully aligned with your investment preferences</p>
            </div>

            <div ref={wrapperRef} className={style.carouselWrapper}>
                <div
                    ref={sliderRef}
                    className={style.carouselContainer}
                >
                    {dummyFunds.map((fund) => (
                        <div key={fund.id} className={style.card}>
                            <div className={style.imageWrapper}>
                                <Image
                                    src={fund.image}
                                    alt={fund.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className={style.badges}>
                                    {fund.badges.map((b, idx) => (
                                        <span key={idx}>{b}</span>
                                    ))}
                                </div>
                            </div>
                            <div className={style.textContent}>
                                <h3>{fund.title}</h3>
                                <p>{fund.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={style.bottomControls}>
                {showArrows ? (
                    <div className={style.navArrows}>
                        <button onClick={() => scroll('left')}>
                            <ChevronLeft size={20} strokeWidth={1} />
                        </button>
                        <button onClick={() => scroll('right')}>
                            <ChevronRight size={20} strokeWidth={1} />
                        </button>
                    </div>
                ) : (
                    <div /> /* Empty flex spacer */
                )}

                <button className={style.requestMeetingBtn} onClick={() => alert("Meeting requested!")}>
                    REQUEST A MEETING
                    <div className={style.redArrow}>
                        <ArrowRight size={16} strokeWidth={2.5} />
                    </div>
                </button>
            </div>
        </section>
    );
}