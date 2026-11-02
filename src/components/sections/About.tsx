import { about, profile } from '../../data/profile';
import { Icon } from '../../lib/icons';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';
import styles from './About.module.css';

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <SectionHeader
          index="01"
          label="About"
          id="about-title"
          title={
            <>
              From computer science fundamentals to <span className="serif gradient-text">data-driven intelligence.</span>
            </>
          }
          lede={about.lede}
        />

        <div className={styles.bento}>
          <Reveal className={`${styles.card} ${styles.story}`}>
            <p className={styles.kicker}>My journey</p>
            <div className={styles.storyBody}>
              {about.story.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>

          {about.blocks.map((b, i) => (
            <Reveal key={b.id} delay={0.05 * (i + 1)} className={`${styles.card} ${styles.block}`}>
              <span className={styles.iconBox}>
                <Icon name={b.icon} size={18} />
              </span>
              <h3 className={styles.blockTitle}>{b.title}</h3>
              <p className={styles.blockBody}>{b.body}</p>
            </Reveal>
          ))}

          <Reveal delay={0.2} className={`${styles.card} ${styles.identity}`}>
            <p className={styles.kicker}>How I describe myself</p>
            <ul role="list" className={styles.roles}>
              {profile.roles.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <div className={styles.traitsWrap} aria-label="Personal traits">
              <ul role="list" className={styles.traits}>
                {[...profile.traits, ...profile.traits].map((t, i) => (
                  <li key={`${t}-${i}`} aria-hidden={i >= profile.traits.length ? 'true' : undefined}>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal className={styles.principlesWrap}>
          <h3 className={styles.principlesTitle}>How I approach problems</h3>
          <ol className={styles.principles}>
            {about.principles.map((p, i) => (
              <li key={p.title} className={styles.principle}>
                <span className={styles.pIndex}>{String(i + 1).padStart(2, '0')}</span>
                <h4>{p.title}</h4>
                <p>{p.body}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
