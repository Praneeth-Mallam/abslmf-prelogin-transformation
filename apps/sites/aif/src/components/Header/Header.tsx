"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Header.module.scss";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo, search } from "..";
import MegaMenu from './MegaMenu';
import { NAV_LINKS } from "@/src/data/navigation";
import LoginDropdown from "./LoginDropdown";
import TopLaunchHeader from "../top-launch-header/TopLaunchHeader";
import { useAccessibility } from "@/src/context/AccessibilityContext";

const Header = () => {
  const { hideImages, grayscale } = useAccessibility();
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const toggleSubMenu = (title: string) => {
    setOpenMenu((prev) => (prev === title ? null : title));
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header
      className={`${styles.header} ${grayscale ? styles.grayscale : ""}`}
      role="banner"
    >
      <TopLaunchHeader />
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo} aria-label="Go to homepage">
          {!hideImages && (
            <Image
              src={Logo}
              alt="Aditya Birla Capital"
              width={114}
              height={44}
            />
          )}
        </Link>

        {/* Desktop Nav */}
        <nav
          className={styles.nav}
          aria-label="Primary navigation"
          ref={navRef}
        >
          {NAV_LINKS.map((link, idx) => {
            const isOpen = openMenu === link.title;

            if (link.isParent && link.megaMenu?.items?.length) {
              return (
                <div className={styles.navItem} key={idx}>
                  <button
                    type="button"
                    className={styles.navLink}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={() => toggleSubMenu(link.title!)}
                  >
                    {link.title}
                    <span
                      className={`${styles.dropdownIcon} ${isOpen ? styles.dropdownOpen : ""}`}
                    >
                      <ChevronDown size={16} />
                    </span>
                  </button>

                  <div
                    className={`${styles.megaMenu} ${isOpen ? styles.megaMenuOpen : ""}`}
                    role="menu"
                  >
                    <MegaMenu
                      items={link.megaMenu.items}
                      onNavigate={() => setOpenMenu(null)}
                    />
                  </div>
                </div>
              );
            }

            return (
              <Link key={idx} href={`/${link.slug}`} className={styles.navLink}>
                {link.title}
              </Link>
            );
          })}
        </nav>

        <div className={styles.actions}>
          <div className={styles.spacer}>
            <Image src={search} alt="211251" width={24} height={24} />
          </div>
          <Link href="#" className={styles.iconBtn}>
            Get in touch
          </Link>
          <LoginDropdown />
        </div>

        {/* Mobile Toggle */}
        <button
          className={styles.menuBtn}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <nav className={styles.mobileNav} aria-label="Mobile navigation">
          {NAV_LINKS.map((l, i) => (
            <Link key={i} href={`/${l.slug}`} onClick={() => setOpen(false)}>
              {l.title}
            </Link>
          ))}
          <Link href="/register" className={styles.ctaMobile}>
            Register
          </Link>
          <Link href="/login" className={styles.loginMobile}>
            Login
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
