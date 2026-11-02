import { useRef, type HTMLAttributes, type PointerEvent } from 'react';
import styles from './Spotlight.module.css';

/** Card wrapper with a soft light that follows the pointer. */
export function Spotlight({ className = '', children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <div ref={ref} onPointerMove={onMove} className={`${styles.spot} ${className}`} {...rest}>
      {children}
    </div>
  );
}
