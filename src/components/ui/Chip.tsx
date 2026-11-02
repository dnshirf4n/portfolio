import type { ReactNode } from 'react';
import styles from './Chip.module.css';

interface Props {
  children: ReactNode;
  tone?: 'default' | 'accent' | 'violet' | 'success' | 'muted';
  mono?: boolean;
}

export function Chip({ children, tone = 'default', mono = false }: Props) {
  return <span className={`${styles.chip} ${styles[tone]} ${mono ? styles.mono : ''}`}>{children}</span>;
}
