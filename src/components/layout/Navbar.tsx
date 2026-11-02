import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { profile } from '../../data/profile';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useScrolled } from '../../hooks/useScrolled';
import type { Theme } from '../../hooks/useTheme';
import { navItems } from './nav';
import styles from './Navbar.module.css';

interface Props {
  theme: Theme;
  onToggleTheme: () => void;
}

export function Navbar({ theme, onToggleTheme }: Props) {
  const ids = useMemo(() => navItems.map((n) => n.id), []);
  const active = useActiveSection(ids);
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('scroll-locked', open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1080px)');
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled || open ? styles.scrolled : ''}`}>
      <nav className={`container ${styles.nav}`} aria-label="Primary">
        <a href="#top" className={styles.brand} aria-label={`${profile.name} — back to top`} onClick={() => setOpen(false)}>
          <span className={styles.mark} aria-hidden="true">
            {profile.initials}
          </span>
          <span className={styles.brandName}>{profile.name}</span>
        </a>

        <ul className={styles.links} role="list">
          {navItems.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className={styles.link} aria-current={active === item.id ? 'true' : undefined}>
                {active === item.id && (
                  <motion.span layoutId="nav-pill" className={styles.pill} transition={{ type: 'spring', stiffness: 420, damping: 36 }} />
                )}
                <span className={styles.linkText}>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.22 }}
                className={styles.iconWrap}
              >
                {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
              </motion.span>
            </AnimatePresence>
          </button>
          <a href="#contact" className={styles.cta}>
            Get in touch
          </a>
          <button
            type="button"
            className={`${styles.iconBtn} ${styles.menuBtn}`}
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className={styles.mobile}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ul role="list" className="container">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.03 * i, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className={styles.mobileLink}
                    aria-current={active === item.id ? 'true' : undefined}
                  >
                    <span className={styles.mobileIndex}>{String(i + 1).padStart(2, '0')}</span>
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
