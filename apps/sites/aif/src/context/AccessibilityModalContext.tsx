"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface PanelContextType {
  isOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
  togglePanel: () => void;
}

const PanelContext = createContext<PanelContextType | undefined>(undefined);

interface AccessibilityModalProviderProps {
  children: ReactNode;
}

export function AccessibilityModalProvider({ children }: AccessibilityModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openPanel = () => setIsOpen(true);
  const closePanel = () => setIsOpen(false);
  const togglePanel = () => setIsOpen(prev => !prev);

  return (
    <PanelContext.Provider value={{ isOpen, openPanel, closePanel, togglePanel }}>
      {children}
    </PanelContext.Provider>
  );
}

export const useAccessibilityModal = () => {
  const context = useContext(PanelContext);
  if (context === undefined) {
    throw new Error('useAccessibilityModal must be used within an AccessibilityModalProvider');
  }
  return context;
};