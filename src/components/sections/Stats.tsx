import { achievements } from '../../data/achievements';
import { leadership } from '../../data/leadership';
import { projects } from '../../data/projects';
import { skillCategories } from '../../data/skills';
import { Counter } from '../ui/Counter';
import { Reveal } from '../ui/Reveal';
import styles from './Stats.module.css';

/**
 * Every number here is counted from your data files, so it can never drift
 * from what is actually listed on the site.
 */
export function Stats() {
  const podiums = achievements.filter((a) => a.placing !== null).length;
  const skills = new Set(skillCategories.flatMap((c) => c.skills)).size;

  const stats = [
    { value: projects.length, label: 'Projects showcased', note: 'ML, NLP & applied AI' },
    { value: podiums, label: 'Hackathon podium finishes', note: achievements.find((a) => a.placing === 1) ? 'Including a championship' : 'Competitions' },
    { value: leadership.length, label: 'Leadership & volunteer roles', note: 'Leading teams & projects' },
    { value: skills, label: 'Tools & methods in my toolkit', note: 'From EDA to deployment' },
  ];

  return (
    <section className={styles.stats} aria-label="At a glance">
      <div className="container">
        <Reveal className={styles.grid}>
          {stats.map((s) => (
            <div key={s.label} className={styles.stat}>
              <p className={styles.value}>
                <Counter value={s.value} />
              </p>
              <p className={styles.label}>{s.label}</p>
              <p className={styles.note}>{s.note}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
