import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { profile } from '../../data/profile';
import { site } from '../../data/site';
import styles from './Loader.module.css';

const KEY = 'di-loaded';

function shouldRun() {
  if (!site.showLoader) return false;
  try {
    return sessionStorage.getItem(KEY) !== '1';
  } catch {
    return true;
  }
}

/** Short branded intro, shown once per browser session. */
export function Loader() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(() => shouldRun() && !reduce);

  useEffect(() => {
    if (!visible) return;
    document.body.classList.add('scroll-locked');
    const t = window.setTimeout(() => setVisible(false), 1450);
    try {
      sessionStorage.setItem(KEY, '1');
    } catch {
      /* ignore */
    }
    return () => {
      window.clearTimeout(t);
      document.body.classList.remove('scroll-locked');
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.loader}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1] } }}
          aria-hidden="true"
        >
          <div className={styles.inner}>
            <motion.div
              className={styles.mark}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {profile.initials}
            </motion.div>
            <motion.p
              className={styles.text}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
            >
              {profile.name}
            </motion.p>
            <div className={styles.track}>
              <motion.div
                className={styles.bar}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1], delay: 0.15 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
