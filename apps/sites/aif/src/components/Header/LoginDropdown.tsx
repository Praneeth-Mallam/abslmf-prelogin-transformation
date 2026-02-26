'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Header.module.scss';
import Link from 'next/link';
import { ChevronDown, UserRound, UsersRound } from 'lucide-react';
import { useAccessibility } from '@/src/context/AccessibilityContext';

const LoginDropdown = () => {
  const { grayscale } = useAccessibility();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className={`${styles.loginWrap} ${grayscale ? styles.grayscale : ''}`} ref={ref}>
      <button
        type="button"
        className={styles.loginPill}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        LOGIN
        <ChevronDown size={16} className={`${styles.loginChevron} ${open ? styles.loginChevronOpen : ''}`} />
      </button>

      {open && (
        <div className={styles.loginMenu} role="menu">
          <Link href="/login/pms-investor" className={styles.loginItem} role="menuitem" onClick={() => setOpen(false)}>
            <span className={styles.loginIcon}>
              <UserRound size={18} />
            </span>
            <span className={styles.loginText}>PMS investor</span>
          </Link>

          <Link href="/login/pms-distributor" className={styles.loginItem} role="menuitem" onClick={() => setOpen(false)}>
            <span className={styles.loginIcon}>
              <UsersRound size={18} />
            </span>
            <span className={styles.loginText}>PMS distributor</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default LoginDropdown;