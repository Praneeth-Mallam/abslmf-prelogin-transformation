'use client';

import styles from './TopLaunchHeader.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { HomeIcon, ArrowRightUp, PhoneRounded, redhome, redarrowright } from '..';
import { useAccessibility } from '@/src/context/AccessibilityContext';

const TopLaunchHeader = () => {
  const { hideImages } = useAccessibility();
  return (
    <div className={styles.topLaunchHeader} role="region" aria-label="Top quick links">
      <div className={styles.container}>
        <div className={styles.left} />

        <div className={styles.right}>
          <Link href="#" className={styles.quickLinkred} aria-label="ABC Home">
            {!hideImages && (
              <Image src={redhome} alt="homeicon" width={16} height={16} />
            )}
            <span>ABC Home</span>
            {!hideImages && (
              <Image src={redarrowright} alt="homeicon" width={16} height={16} />
            )}
          </Link>

          <Link href="#" className={styles.quickLink}>
          {!hideImages && (
              <Image src={HomeIcon} alt="homeicon" width={16} height={16} />
            )}
            ABSLAMC
            {!hideImages && (
              <Image src={ArrowRightUp} alt="homeicon" width={16} height={16} />
            )}
          </Link>

          <Link href="tel:18002707000" className={`${styles.quickLink} ${styles.whiteQuickLink}`} aria-label="Call 1800 270 7000">
            {!hideImages && (
              <Image src={PhoneRounded} alt="homeicon" width={20} height={20} />
            )}
            <span>1800 270 7000</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopLaunchHeader;
