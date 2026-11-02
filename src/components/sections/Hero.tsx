import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowDown, ArrowRight, Download, GraduationCap, MapPin, Send, Telescope } from 'lucide-react';
import { profile } from '../../data/profile';
import { asset } from '../../lib/content';
import { Button } from '../ui/Button';
import { Placeholder } from '../ui/Placeholder';
import { SocialLinks } from '../ui/SocialLinks';
import { DataField } from './DataField';
import styles from './Hero.module.css';

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const { headline } = profile;

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
  };
  const word: Variants = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: '0.45em', filter: 'blur(8px)' },
        show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease } },
      };
  const fade = (delay: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease, delay } };

  const words = (text: string, accent = false) =>
    text.split(' ').map((w, i) => (
      <motion.span key={`${w}-${i}`} variants={word} className={`${styles.word} ${accent ? `serif ${styles.accent}` : ''}`}>
        {w}
      </motion.span>
    ));

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <DataField className={styles.field} />
      <div className={styles.glow} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <motion.div className={styles.status} {...fade(0.05)}>
            <span className={`${styles.dot} ${profile.availability.open ? styles.dotOpen : ''}`} aria-hidden="true" />
            {profile.availability.label}
          </motion.div>

          <motion.p className={styles.name} {...fade(0.1)}>
            {profile.name} <span className={styles.nameSep}>/</span> <span className={styles.role}>Aspiring {profile.ambition}</span>
          </motion.p>

          <motion.h1 id="hero-title" className={styles.title} variants={container} initial="hidden" animate="show">
            <span className={styles.line}>
              {words(headline.lead)}
              {words(headline.accent, true)}
            </span>
            <span className={styles.line}>
              {words(headline.tail)}
              {words(headline.accent2, true)}
            </span>
          </motion.h1>

          <motion.p className={styles.intro} {...fade(0.55)}>
            {profile.intro}
          </motion.p>

          <motion.div className={styles.ctas} {...fade(0.65)}>
            <Button href="#projects" iconRight={<ArrowRight size={17} />}>
              Explore my work
            </Button>
            {profile.resume ? (
              <Button href={asset(profile.resume)} variant="secondary" icon={<Download size={16} />} download>
                Download resume
              </Button>
            ) : null}
            <Button href="#contact" variant="ghost" icon={<Send size={15} />}>
              Get in touch
            </Button>
          </motion.div>

          <motion.dl className={styles.meta} {...fade(0.75)}>
            <div>
              <dt>
                <MapPin size={14} aria-hidden="true" /> Location
              </dt>
              <dd>{profile.location}</dd>
            </div>
            <div>
              <dt>
                <GraduationCap size={14} aria-hidden="true" /> University
              </dt>
              <dd>{profile.university}</dd>
            </div>
            <div>
              <dt>
                <Telescope size={14} aria-hidden="true" /> Ambition
              </dt>
              <dd>{profile.ambition}</dd>
            </div>
          </motion.dl>
        </div>

        <motion.aside
          className={styles.visual}
          aria-label="Profile"
          initial={reduce ? false : { opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.35 }}
        >
          <div className={styles.photoCard}>
            {profile.photo ? (
              <img
                src={asset(profile.photo)}
                alt={`Portrait of ${profile.name}`}
                className={styles.photo}
                width={800}
                height={1000}
                fetchPriority="high"
              />
            ) : (
              <div className={styles.photoPlaceholder}>
                <span className={styles.monogram}>{profile.initials}</span>
                <span className={styles.photoHint}>
                  <Placeholder label="profile photo" file="profile.ts → photo" />
                </span>
              </div>
            )}
            <div className={styles.photoFooter}>
              <div>
                <p className={styles.photoName}>{profile.name}</p>
                <p className={styles.photoSub}>
                  {profile.program} · {profile.universityShort}
                </p>
              </div>
              <SocialLinks exclude={['resume', 'email']} />
            </div>
          </div>

          <div className={styles.interestCard}>
            <p className={styles.cardLabel}>Current interests</p>
            <ul role="list" className={styles.interestList}>
              {profile.interests.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        </motion.aside>
      </div>

      <a href="#about" className={styles.scrollCue} aria-label="Scroll to About section">
        <ArrowDown size={16} aria-hidden="true" />
      </a>
    </section>
  );
}
