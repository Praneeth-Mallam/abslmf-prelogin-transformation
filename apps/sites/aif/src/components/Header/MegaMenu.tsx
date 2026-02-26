'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';
import { ArrowUpRight } from 'lucide-react';

type Item = {
  label: string;
  href: string;
  title: string;
  desc: string;
};

const MegaMenu = ({ items, onNavigate }: { items: Item[]; onNavigate: () => void }) => {
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <div className={styles.megaInner}>
      <div className={styles.megaLeft}>
        {items.map((it, i) => (
          <button
            key={it.label}
            type="button"
            className={`${styles.megaItem} ${i === active ? styles.megaItemActive : ''}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
          >
            <span>{it.label}</span>
            <ArrowUpRight size={16} />
          </button>
        ))}
      </div>

      <div className={styles.megaRight}>
        <h3 className={styles.megaTitle}>{current.title}</h3>
        <p className={styles.megaDesc}>{current.desc}</p>

        <div className={styles.megaCard} />

        <Link href={current.href} className={styles.megaLink} onClick={onNavigate}>
          Explore
        </Link>
      </div>
    </div>
  );
};

export default MegaMenu;