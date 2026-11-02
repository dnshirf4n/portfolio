import { currentlyExploring } from '../../data/skills';
import { Reveal } from '../ui/Reveal';
import styles from './Exploring.module.css';

export function Exploring() {
  if (!currentlyExploring.length) return null;
  return (
    <section id="exploring" className={styles.section} aria-labelledby="exploring-title">
      <div className="container">
        <Reveal className={styles.panel}>
          <div className={styles.intro}>
            <p className={styles.badge}>
              <span className={styles.pulse} aria-hidden="true" /> Currently exploring
            </p>
            <h2 id="exploring-title" className={styles.title}>
              What I am <span className="serif">learning</span> right now.
            </h2>
            <p className={styles.lede}>
              Topics I am actively studying and practising. They are on my learning roadmap, not claims of expertise.
            </p>
          </div>
          <ol className={styles.list}>
            {currentlyExploring.map((item, i) => (
              <li key={item.topic} className={styles.item}>
                <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <p className={styles.topic}>{item.topic}</p>
                  <p className={styles.note}>{item.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
