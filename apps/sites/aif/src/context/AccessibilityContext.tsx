'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface AccessibilityContextType {
  textLevel: number;       // 0 | 1 | 2
  lineLevel: number;       // 0 | 1 | 2
  letterLevel: number;     // 0 | 1 | 2
  setTextLevel: (v: number) => void;
  setLineLevel: (v: number) => void;
  setLetterLevel: (v: number) => void;

  hideImages: boolean;
  toggleImages: () => void;

  grayscale: boolean;
  toggleGrayscale: () => void;

  lowSaturation: boolean;
  toggleLowSaturation: () => void;

  highlightLinks: boolean;
  toggleHighlightLinks: () => void;

  resetAll: () => void;
};

const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

const TEXT_SIZE_LEVELS = [1, 1.055, 1.11];
const LINE_SPACING_LEVELS = [1.6, 1.9, 2.2];
const LETTER_SPACING_LEVELS = [0, 1, 2];

export const AccessibilityProvider = ({ children }: { children: React.ReactNode }) => {
  const [textLevel, setTextLevel] = useState(0);
  const [lineLevel, setLineLevel] = useState(0);
  const [letterLevel, setLetterLevel] = useState(0);

  const [hideImages, setHideImages] = useState(false);
  const [grayscale, setGrayscale] = useState(false);
  const [lowSaturation, setLowSaturation] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty('--a11y-text-scale', TEXT_SIZE_LEVELS[textLevel].toString());
    root.style.setProperty('--a11y-line-height', LINE_SPACING_LEVELS[lineLevel].toString());
    root.style.setProperty('--a11y-letter-spacing', `${LETTER_SPACING_LEVELS[letterLevel]}px`);

    root.classList.toggle('a11y-hide-images', hideImages);
    root.classList.toggle('a11y-grayscale', grayscale);
    root.classList.toggle('a11y-low-saturation', lowSaturation);
    root.classList.toggle('a11y-highlight-links', highlightLinks);
  }, [textLevel, lineLevel, letterLevel, hideImages, grayscale, lowSaturation, highlightLinks]);

  const toggleImages = () => setHideImages((p) => !p);
  const toggleGrayscale = () => setGrayscale((p) => !p);
  const toggleLowSaturation = () => setLowSaturation((p) => !p);
  const toggleHighlightLinks = () => setHighlightLinks((p) => !p);

  const resetAll = () => {
    setTextLevel(0);
    setLineLevel(0);
    setLetterLevel(0);
    setHideImages(false);
    setGrayscale(false);
    setLowSaturation(false);
    setHighlightLinks(false);

    const root = document.documentElement;
    root.style.setProperty('--a11y-text-scale', TEXT_SIZE_LEVELS[0].toString());
    root.style.setProperty('--a11y-line-height', LINE_SPACING_LEVELS[0].toString());
    root.style.setProperty('--a11y-letter-spacing', `${LETTER_SPACING_LEVELS[0]}px`);

    root.classList.remove(
      'a11y-hide-images',
      'a11y-grayscale',
      'a11y-low-saturation',
      'a11y-highlight-links'
    );
  };

  return (
    <AccessibilityContext.Provider
      value={{
        textLevel,
        lineLevel,
        letterLevel,
        setTextLevel,
        setLineLevel,
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
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error('useAccessibility must be used within AccessibilityProvider');
  return ctx;
};