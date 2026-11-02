import { PencilLine } from 'lucide-react';
import { site } from '../../data/site';
import styles from './Placeholder.module.css';

interface Props {
  /** What the person should add, e.g. "CGPA" */
  label: string;
  /** Where to edit it, e.g. "education.ts" */
  file?: string;
  block?: boolean;
}

/**
 * Visible marker for content that has not been provided yet.
 * Renders nothing when site.showPlaceholders is false.
 */
export function Placeholder({ label, file, block = false }: Props) {
  if (!site.showPlaceholders) return null;
  return (
    <span className={`${styles.ph} ${block ? styles.block : ''}`} title={file ? `Edit in src/data/${file}` : undefined}>
      <PencilLine size={13} aria-hidden="true" />
      <span>
        To add: {label}
        {file && <span className={styles.file}> · {file}</span>}
      </span>
    </span>
  );
}
