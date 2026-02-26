'use client';

import styles from './AccessibilityModal.module.scss';
import { useAccessibility } from '@/src/context/AccessibilityContext';
import { useAccessibilityModal } from '@/src/context/AccessibilityModalContext';
import Image from 'next/image';
import { greyScale, highlightLink, imageHideShow, lineSpacing, lowSaturationImg, textSize } from '..';

const nextLevel = (current: number) => (current + 1) % 3;

export default function AccessibilityModal() {
  const { isOpen, closePanel } = useAccessibilityModal();

  const {
    textLevel,
    setTextLevel,
    lineLevel,
    setLineLevel,
    letterLevel,
    setLetterLevel,
    hideImages,
    toggleImages,
    grayscale,
    toggleGrayscale,
    lowSaturation,
    toggleLowSaturation,
    highlightLinks,
    toggleHighlightLinks,
    resetAll,
  } = useAccessibility();

  return (
    <>
      {/* Right Panel */}
      <aside className={`${styles.panel} ${isOpen ? styles.open : ''}`} role="dialog" aria-modal="true">
        <div className={styles.header}>
          <button onClick={closePanel} aria-label="Close">✕</button>
        </div>

        <div className={styles.sectionTitle}>Content Size</div>

        <div className={styles.grid}>
          {/* Text Size */}
          <div
            className={`${styles.card} ${textLevel > 0 ? styles.cardActive : ''}`}
            onClick={() => setTextLevel(nextLevel(textLevel))}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setTextLevel(nextLevel(textLevel));
              }
            }}
          >
            <div className={styles.icon}>
              <Image src={textSize} alt="Text size" width={24} height={24} />
            </div>
            <span>Text Size</span>
            <div className={styles.dots} onClick={(e) => e.stopPropagation()}>
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  type="button"
                  className={`${styles.dot} ${textLevel === i ? styles.active : ''}`}
                  onClick={() => setTextLevel(i)}
                  aria-label={`Text size level ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Hide / Show Image */}
          <button
            className={`${styles.card} ${hideImages ? styles.cardActive : ''}`}
            onClick={toggleImages}
            aria-pressed={hideImages}
          >
            <div className={styles.icon}>
              <Image src={imageHideShow} alt="Hide/Show image" width={24} height={24} />
            </div>
            <span>Hide/Show Image</span>
          </button>

          {/* Line Spacing */}
          <div
            className={`${styles.card} ${lineLevel > 0 ? styles.cardActive : ''}`}
            onClick={() => setLineLevel(nextLevel(lineLevel))}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setLineLevel(nextLevel(lineLevel));
              }
            }}
          >
            <div className={styles.icon}>
              <Image src={lineSpacing} alt="Line spacing" width={24} height={24} />
            </div>
            <span>Line Spacing</span>

            <div className={styles.dots} onClick={(e) => e.stopPropagation()}>
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  type="button"
                  className={`${styles.dot} ${lineLevel === i ? styles.active : ''}`}
                  onClick={() => setLineLevel(i)}
                  aria-label={`Line spacing level ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Letter Spacing */}
          <div
            className={`${styles.card} ${letterLevel > 0 ? styles.cardActive : ''}`}
            onClick={() => setLetterLevel(nextLevel(letterLevel))}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setLetterLevel(nextLevel(letterLevel));
              }
            }}
          >
            <div className={styles.icon}>
              <Image src={lineSpacing} alt="Letter spacing" width={24} height={24} />
            </div>
            <span>Letter Spacing</span>

            <div className={styles.dots} onClick={(e) => e.stopPropagation()}>
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  type="button"
                  className={`${styles.dot} ${letterLevel === i ? styles.active : ''}`}
                  onClick={() => setLetterLevel(i)}
                  aria-label={`Letter spacing level ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className={styles.sectionTitle}>Color</div>
        <div className={styles.grid}>
          <button
            className={`${styles.card} ${grayscale ? styles.cardActive : ''}`}
            onClick={toggleGrayscale}
            aria-pressed={grayscale}
          >
            <div className={styles.icon}>
              <Image src={greyScale} alt="Grey scale" width={24} height={24} />
            </div>
            <span>Grey Scale</span>
          </button>

          <button 
            className={`${styles.card} ${lowSaturation ? styles.cardActive : ''}`}
            onClick={toggleLowSaturation}
            aria-pressed={lowSaturation}
          >
            <div className={styles.icon}>
              <Image src={lowSaturationImg} alt="Low saturation" width={24} height={24} />
            </div>
            <span>Low Saturation</span>
          </button>
        </div>

        <div className={styles.sectionTitle}>Navigation</div>
        <div className={styles.grid}>
          <button 
            className={`${styles.card} ${highlightLinks ? styles.cardActive : ''}`}
            onClick={toggleHighlightLinks}
            aria-pressed={highlightLinks}
          >
            <div className={styles.icon}>
              <Image src={highlightLink} alt="Highlight links" width={24} height={24} />
            </div>
            <span>Highlight Link</span>
          </button>
        </div>

        <button className={styles.reset} onClick={resetAll}>
          RESET
        </button>
      </aside>
    </>
  );
}