import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useScrolled } from '../../hooks/useScrolled';
import styles from './BackToTop.module.css';

export function BackToTop() {
  const show = useScrolled(900);
  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#top"
          className={styles.btn}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.25 }}
        >
          <ArrowUp size={18} aria-hidden="true" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
