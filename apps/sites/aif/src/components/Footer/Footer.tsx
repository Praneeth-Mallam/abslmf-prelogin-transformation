"use client";

import React, { useState } from "react";
import styles from "./Footer.module.scss";
import {
  SOCIAL_ICONS,
  UPPER_NOTICE_ITEMS,
  createFooter1,
  createFooter2,
  createFooter3,
  FooterGroupProps,
  FooterData,
  MenuItem,
  UpperNoticeItem,
} from "../../data/footer";
import { useAccessibility } from "@/src/context/AccessibilityContext";

const UpperNoticeAccordion: React.FC<{ items: UpperNoticeItem[] }> = ({
  items,
}) => {
  const [open, setOpen] = useState<string | null>(null);
  const toggle = (key: string) => setOpen((p) => (p === key ? null : key));

  return (
    <div className={styles.upperNotice}>
      {items.map((it) => (
        <div key={it.key} className={styles.upperNoticeRow}>
          <button
            type="button"
            className={styles.upperNoticeBtn}
            onClick={() => toggle(it.key)}
          >
            <span className={styles.upperNoticeLabel}>{it.label}</span>
            <span className={styles.upperNoticePlus}>
              {open === it.key ? "−" : "+"}
            </span>
          </button>

          {open === it.key && it.content ? (
            <div className={styles.upperNoticeContent}>{it.content}</div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

const FraudNotice: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.fraudBar}>
      <div className={styles.fraudHeader} onClick={() => setIsOpen(!isOpen)}>
        <span className={styles.fraudPlus}>{isOpen ? "−" : "+"}</span>
        <span className={styles.fraudTitle}>
          BEWARE OF SPURIOUS/FRAUD PHONE CALLS!
        </span>
      </div>

      {isOpen && (
        <div className={styles.fraudInner}>
          <div className={styles.fraudText}>
            IRDAI is not involved in activities like selling insurance policies,
            announcing bonus or investment of premiums. Public receiving such
            phone calls are requested to lodge a police complaint.
          </div>
        </div>
      )}
    </div>
  );
};

const BottomPurpleBar: React.FC<{
  socials: { src: string; alt: string }[];
  hideImages: boolean;
}> = ({ socials, hideImages }) => (
  <div className={styles.bottomBar}>
    <div className={styles.bottomLeft}>
      © 2023, Aditya Birla Capital Ltd. All Rights Reserved.
    </div>

    <div className={styles.bottomRight}>
      {!hideImages &&
        socials.map((s) => (
          <img
            key={s.alt}
            src={s.src}
            alt={s.alt}
            className={styles.bottomIcon}
          />
        ))}
    </div>
  </div>
);

const FooterBlock: React.FC<{ data: FooterData; hideImages: boolean }> = ({
  data,
  hideImages,
}) => {
  const [open, setOpen] = useState<string | null>(data.defaultOpenKey || null);
  const toggle = (key: string) => setOpen((p) => (p === key ? null : key));

  const chunk = (arr: MenuItem[], size: number) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size),
    );

  const rows = chunk(data.menu, 4);

  const renderSubmenu = (row: MenuItem[]) => {
    const activeItem = row.find((i) => i.key === open);
    if (!activeItem?.children?.length) return null;

    return (
      <div className={styles.subMenu}>
        {activeItem.children.map((child) => (
          <div key={child} className={styles.subItem}>
            {child}
          </div>
        ))}
      </div>
    );
  };

  return (
    <footer className={`${styles.container} ${styles[data.variant]}`}>
      <div className={styles.logoSection}>
        <div className={styles.logoCard}>
          {!hideImages && (
            <img
              src={data.logo.src}
              alt={data.logo.alt}
              className={styles.logoImg}
            />
          )}

          {data.logo.subText ? (
            <div className={styles.logoSub}>{data.logo.subText}</div>
          ) : null}
        </div>

        {data.socials?.length ? (
          <div className={styles.socialRow}>
            {data.socials.map((s) => (
              <div key={s.alt} className={styles.socialCircle}>
                {!hideImages && <img src={s.src} alt={s.alt} />}
              </div>
            ))}
          </div>
        ) : null}
        {data.contact ? (
          <div className={styles.contactCard}>
            <div className={styles.contactItem}>
              <div className={styles.contactDot}>
                {!hideImages && (
                  <img
                    src={data.contact.whatsappIcon as string}
                    alt="WhatsApp"
                  />
                )}
              </div>
              <div>
                <div className={styles.contactLabel}>
                  {data.contact.whatsappLabel}
                </div>
                <div className={styles.contactValue}>
                  {data.contact.whatsappValue}
                </div>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactDot}>
                {!hideImages && (
                  <img src={data.contact.emailIcon as string} alt="Email" />
                )}
              </div>
              <div>
                <div className={styles.contactLabel}>
                  {data.contact.emailLabel}
                </div>
                <div className={styles.contactValue}>
                  {data.contact.emailValue}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className={styles.menuSection}>
        {rows.map((row, idx) => (
          <React.Fragment key={idx}>
            <div className={styles.row}>
              {row.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  className={`${styles.menuHeader} ${
                    open === item.key ? styles.activeHeader : ""
                  }`}
                  onClick={() => toggle(item.key)}
                >
                  <span className={styles.symbol}>
                    {open === item.key ? "−" : "+"}
                  </span>
                  {item.label}
                </button>
              ))}
            </div>

            {renderSubmenu(row)}
          </React.Fragment>
        ))}
      </div>

      {data.download ? (
        <div className={styles.download}>
          <div className={styles.downloadIcon}>
            {!hideImages && <img src={data.download.iconSrc} alt="" />}
          </div>
          <div className={styles.downloadTitle}>{data.download.title}</div>
          <div className={styles.pills}>
            {data.download.stores.map((st) => (
              <div key={st.text} className={styles.pill}>
                {!hideImages && <img src={st.icon} alt="" />}
                <span>{st.text}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </footer>
  );
};

const FooterGroup: React.FC<FooterGroupProps> = ({ logos }) => {
  const {
    lineLevel,
    letterLevel,
    hideImages,
    grayscale,
    lowSaturation,
    highlightLinks,
  } = useAccessibility();

  const footer1 = createFooter1(logos);
  const footer2 = createFooter2(logos);
  const footer3 = createFooter3(logos);

  const accessibilityClasses = [
    styles.stack,
    styles[`lineLevel${lineLevel}`],
    styles[`letterLevel${letterLevel}`],
    grayscale ? styles.grayscale : "",
    lowSaturation ? styles.lowSaturation : "",
    highlightLinks ? styles.highlightLinks : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={accessibilityClasses}>
      <UpperNoticeAccordion items={UPPER_NOTICE_ITEMS} />
      <FooterBlock data={footer1} hideImages={hideImages} />
      <FooterBlock data={footer2} hideImages={hideImages} />
      <FooterBlock data={footer3} hideImages={hideImages} />
      <FraudNotice />
      <BottomPurpleBar socials={SOCIAL_ICONS} hideImages={hideImages} />
    </div>
  );
};

export default FooterGroup;
