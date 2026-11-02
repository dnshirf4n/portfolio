import { animate, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

/** Counts up from 0 to `value` when it scrolls into view. */
export function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return <span ref={ref}>{display}</span>;
}
