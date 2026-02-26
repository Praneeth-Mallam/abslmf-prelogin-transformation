"use client"; // Add this directive at the top

import Image, { StaticImageData } from "next/image";
import styles from "./FloatingBar.module.scss";
import { ai, askai, headphonesround, user } from "..";
import { useAccessibilityModal } from "@/src/context/AccessibilityModalContext";

type ActionItem = {
  label: string;
  icon: StaticImageData | string;
  dark?: boolean;
  onClick?: () => void;
};

const actions: ActionItem[] = [
  { label: "Accessibility", icon: ai },
  { label: "Persona", icon: user },
  { label: "Get in touch", icon: headphonesround },
  { label: "Ask AI", icon: askai, dark: true },
];

export default function FloatingBar() {
  const { openPanel } = useAccessibilityModal();
  
  const handleActionClick = (label: string) => {
    console.log('la', label);
    
    if (label === "Accessibility") {
      openPanel();
    }
  };

  return (
    <nav className={styles.wrapper} aria-label="Floating quick actions">
      <ul className={styles.floatingBar}>
        {actions.map(({ label, icon, dark }) => (
          <li key={label}>
            <button
              type="button"
              onClick={() => handleActionClick(label)}
              className={`${styles.item} ${dark ? styles.dark : ""}`}
              aria-label={label}
            >
              <Image
                src={icon}
                alt=""
                width={24}
                height={24}
                aria-hidden="true"
              />
              <span>{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}