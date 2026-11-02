import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';

interface Props extends HTMLMotionProps<'div'> {
  delay?: number;
  y?: number;
}

/** Fades and lifts its children into view once, when scrolled into the viewport. */
export function Reveal({ delay = 0, y = 18, children, ...rest }: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
