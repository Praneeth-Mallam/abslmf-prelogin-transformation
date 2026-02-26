"use client"
import React, { useState, useRef } from 'react';
import style from "./Questionnaire.module.scss";
import { User, Building, Globe, ChevronLeft, Calendar, Wallet, ShieldCheck, BarChart3, Check } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import QuestionnaireFinalPage from '../QuestionnaireFinalPage/QuestionnaireFinalPage';
import { questionsData } from '@/src/data/questionnaireData';
import Image from 'next/image';
import { qntFrame } from '..';
import { useAccessibility } from '@/src/context/AccessibilityContext';

interface SelectedOption {
  id: number;
  label: string;
  icon: string;
};

const iconMap: Record<string, any> = {
  User,
  Building,
  Globe,
  Calendar,
  Wallet,
  ShieldCheck,
  BarChart3,
};

interface QuestionnaireProps {
    onClose?: () => void;
}

export default function Questionnaire({ onClose }: QuestionnaireProps) {
    const {
        textLevel,
        lineLevel,
        letterLevel,
        hideImages,
        grayscale,
        lowSaturation,
        highlightLinks,
    } = useAccessibility();
    // currentStep is 1-indexed. 1, 2, 3 are questions. 4 is summary.
    const [currentStep, setCurrentStep] = useState(1);
    const [showFinalPage, setShowFinalPage] = useState(false);

    // Store selections. Key is step ID, Value is selected option object.
    const [selections, setSelections] = useState<Record<number, SelectedOption>>({});

    // Temporary state to show visual feedback before automatically advancing
    const [tempSelected, setTempSelected] = useState<number | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const { contextSafe } = useGSAP({ scope: containerRef });

    React.useLayoutEffect(() => {
        const animate = contextSafe(() => {
            // Animate sidebar lines vertically
            gsap.utils.toArray(`.${style.lineFill}`).forEach((el: any, index) => {
                const isCompleted = currentStep > (index + 1);
                gsap.to(el, {
                    scaleY: isCompleted ? 1 : 0,
                    duration: 0.6,
                    ease: "power2.inOut",
                    overwrite: "auto"
                });
            });

            // Contextual animations for dynamic content popping in
            if (currentStep <= questionsData.length) {
                gsap.fromTo(`.${style.questionHeader} > *`,
                    { y: 15, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.4,
                        stagger: 0.1,
                        ease: "power2.out",
                        overwrite: "auto"
                    }
                );
                gsap.fromTo(".option-anim-wrapper",
                    { y: 20, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.4,
                        stagger: 0.08,
                        ease: "power2.out",
                        delay: 0.1,
                        overwrite: "auto"
                    }
                );
            } else {
                // Animate the final summary rendering items left to right
                const tl = gsap.timeline();

                tl.fromTo(`.${style.summaryHeader} > *`,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" }
                );

                const checks = gsap.utils.toArray(`.${style.summaryCheck}`);
                const lines = gsap.utils.toArray(`.${style.summaryLineFill}`);
                const items = gsap.utils.toArray(`.${style.summaryItem}`);

                checks.forEach((check: any, i: number) => {
                    tl.fromTo(check,
                        { scale: 0, opacity: 0 },
                        { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2)" }
                    );

                    if (items[i]) {
                        tl.fromTo(items[i] as any,
                            { y: 20, opacity: 0 },
                            { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
                            "-=0.2"
                        );
                    }

                    if (lines[i]) {
                        tl.fromTo(lines[i] as any,
                            { scaleX: 0 },
                            { scaleX: 1, duration: 0.3, ease: "none" },
                            "-=0.1"
                        );
                    }
                });

                tl.fromTo(".action-anim-wrapper",
                    { y: 10, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" },
                    "-=0.2"
                );
            }
        });

        animate();
    }, [currentStep, contextSafe]);

    const handleOptionSelect = (option: any) => {
        if (tempSelected !== null) return;
        setTempSelected(option.id);

        // Save choice
        setSelections(prev => ({
            ...prev,
            [currentStep]: option
        }));

        // Auto-advance after giving visual feedback
        setTimeout(() => {
            setTempSelected(null);
            setCurrentStep(prev => prev + 1);
        }, 400);
    };

    const handleBack = () => {
        if (tempSelected !== null) return;
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const renderSidebar = () => {
        return (
            <div className={style.sidebar}>
                {questionsData.map((q, index) => {
                    const isCompleted = currentStep > q.id;
                    const isActive = currentStep === q.id;
                    const isLast = index === questionsData.length - 1;

                    return (
                        <div key={q.id} className={style.step}>
                            <div className={style.stepIndicator}>
                                {isCompleted ? (
                                    <div className={style.numberCompleted}>
                                        <Check size={14} strokeWidth={3} />
                                    </div>
                                ) : (
                                    <div className={isActive ? style.numberActive : style.number}>
                                        {q.id}
                                    </div>
                                )}

                                {!isLast && (
                                    <div className={style.line}>
                                        <div className={style.lineFill}></div>
                                    </div>
                                )}
                            </div>
                            <div className={style.stepText}>
                                <h4 className={
                                    isCompleted ? style.completedStepTitle :
                                        isActive ? style.activeStepTitle :
                                            style.inactive
                                }>{q.stepTitle}</h4>
                                <p>{q.stepSubtitle}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    // Render for steps 1-3
    const renderQuestionnaire = () => {
        const currentQuestion = questionsData.find(q => q.id === currentStep)!;
        const currentSelectionId = tempSelected || selections[currentStep]?.id;

        return (
            <>
                <div className={style.textContainer}>
                    <div style={{ position: 'absolute', top: 15, left: 0, zIndex: 10 }}>
                        <button className={style.topBackToHome} onClick={() => onClose && onClose()}>
                            <ChevronLeft size={16} strokeWidth={2} /> <span>Back To Home</span>
                        </button>
                    </div>
                    <h1>
                        Your Personal <br />{" "}
                        <strong>Investment Profile</strong>
                    </h1>
                    <p className={style.subtext}>
                        A simple way to understand your investing outlook.
                    </p>
                </div>

                <div className={style.questionContainer}>
                    {renderSidebar()}

                    <div key={currentStep} className={style.contentArea}>
                        <div className={style.questionHeader}>
                            <p className={style.questionNumber}>{currentQuestion.questionLabel}</p>
                            <h2>{currentQuestion.questionTitle}</h2>
                        </div>

                        <div className={style.optionsGrid}>
                            {currentQuestion.options.map((opt) => {
                                const Icon = iconMap[opt.icon];
                                return(
                                    <div key={opt.id} className="option-anim-wrapper">
                                        <div
                                            className={`${style.optionCard} ${currentSelectionId === opt.id ? style.selected : ''}`}
                                            onClick={() => handleOptionSelect(opt)}
                                        >
                                            <div className={style.iconWrapper}>
                                                {!hideImages && Icon && <Icon strokeWidth={1.5} size={24} />}
                                            </div>
                                            <span className={style.optionLabel}>{opt.label}</span>
                                            <div className={style.radioCircle}>
                                                {currentSelectionId === opt.id && <div className={style.radioInner} />}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            )}
                        </div>

                        {currentStep > 1 && (
                            <div className="back-anim-wrapper">
                                <button className={style.backButton} onClick={handleBack}>
                                    <ChevronLeft size={20} strokeWidth={1.5} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </>
        );
    };

    // Render for step 4 (Summary)
    const renderSummary = () => {
        return (
            <div key="summary" className={style.summaryWrapper}>
                <div className={style.summaryHeader}>
                    <div className="action-anim-wrapper" style={{ position: 'absolute', top: 5, left: 0, zIndex: 10 }}>
                        <button className={style.topBackToHome} onClick={() => {
                            if (onClose) {
                                onClose();
                            } else {
                                setSelections({});
                                setCurrentStep(1);
                            }
                        }}>
                            <ChevronLeft size={16} strokeWidth={2} /> <span>Back To Home</span>
                        </button>
                    </div>
                    <h2>Your Personal</h2>
                    <h1>Investing Profile</h1>
                    <p>A simple way to understand your investing outlook.</p>
                </div>

                <div className={style.summaryContent}>
                    <div className={style.summaryStepsBar}>
                        {questionsData.map((q, idx) => (
                            <React.Fragment key={q.id}>
                                <div className={style.summaryCheck}>
                                    <Check size={16} strokeWidth={3} />
                                </div>
                                {idx < questionsData.length - 1 && (
                                    <div className={style.summaryLine}>
                                        <div className={style.summaryLineFill}></div>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    <div className={style.summaryItemsGrid}>
                        {questionsData.map((q) => {
                            const choice = selections[q.id];
                            const Icon = iconMap[choice?.icon];
                            return (
                                <div key={q.id} className={style.summaryItem}>
                                    <p className={style.summaryQuestionText}>
                                        {q.id === 1 ? "Please select the category\nthat best describes you." : q.questionTitle}
                                    </p>
                                    <div className={style.summaryCard}>
                                        <div className={style.iconWrapper}>
                                            {!hideImages && Icon && <Icon strokeWidth={1.5} size={24} />}
                                        </div>
                                        <span className={style.optionLabel}>{choice?.label}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className={style.summaryActions}>
                    <div className="action-anim-wrapper">
                        <button className={style.editChoicesBtn} onClick={() => {
                            setSelections({});
                            setCurrentStep(1);
                        }}>
                            <ChevronLeft size={16} strokeWidth={2} /> EDIT CHOICES
                        </button>
                    </div>
                    <div className="action-anim-wrapper">
                        <button className={style.submitBtn} onClick={() => setShowFinalPage(true)}>
                            SUBMIT <ChevronLeft size={16} strokeWidth={2} style={{ transform: "rotate(180deg)" }} />
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    if (showFinalPage) {
        return <QuestionnaireFinalPage onClose={onClose} />;
    }

    return (
        <section
            className={`${style.wrapper}
                ${style[`textLevel${textLevel}`]}
                ${style[`lineLevel${lineLevel}`]}
                ${style[`letterLevel${letterLevel}`]}
                ${grayscale ? style.grayscale : ''}
                ${lowSaturation ? style.lowSaturation : ''}
                ${highlightLinks ? style.highlightLinks : ''}
            `}
            ref={containerRef}
        >
            {currentStep <= questionsData.length ? renderQuestionnaire() : renderSummary()}
        </section>
    );
}