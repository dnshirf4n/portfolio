import type { ReactNode } from 'react';
import { Reveal } from './Reveal';
import styles from './SectionHeader.module.css';

interface Props {
  index: string;
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: 'left' | 'center';
  id?: string;
}

export function SectionHeader({ index, label, title, lede, align = 'left', id }: Props) {
  return (
    <Reveal className={`${styles.header} ${align === 'center' ? styles.center : ''}`}>
      <p className={styles.eyebrow}>
        <span className={styles.index}>{index}</span>
        <span className={styles.rule} aria-hidden="true" />
        <span>{label}</span>
      </p>
      <h2 className={styles.title} id={id}>
        {title}
      </h2>
      {lede && <p className={styles.lede}>{lede}</p>}
    </Reveal>
  );
}
