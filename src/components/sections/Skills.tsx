import { skillCategories } from '../../data/skills';
import { Icon } from '../../lib/icons';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';
import { Spotlight } from '../ui/Spotlight';
import styles from './Skills.module.css';

export function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeader
          index="02"
          label="Technical skills"
          id="skills-title"
          title={
            <>
              A toolkit built around the <span className="serif gradient-text">data science workflow.</span>
            </>
          }
          lede="From querying and cleaning data, to modelling and evaluation, to turning a model into something people can use. No self-rated percentages — the projects below are the evidence."
        />

        <div className={styles.grid}>
          {skillCategories.map((cat, i) => (
            <Reveal key={cat.id} delay={0.04 * i} className={cat.size === 'wide' ? styles.wide : undefined}>
              <Spotlight className={styles.card}>
                <div className={styles.head}>
                  <span className={styles.icon}>
                    <Icon name={cat.icon} size={18} />
                  </span>
                  <span className={styles.count}>{String(cat.skills.length).padStart(2, '0')}</span>
                </div>
                <h3 className={styles.title}>{cat.title}</h3>
                <p className={styles.desc}>{cat.description}</p>
                <ul role="list" className={styles.skills}>
                  {cat.skills.map((s) => (
                    <li key={s} className={styles.skill}>
                      {s}
                    </li>
                  ))}
                </ul>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
