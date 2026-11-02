import { leadership, leadershipThemes } from '../../data/leadership';
import { filled } from '../../lib/content';
import { Icon } from '../../lib/icons';
import { Placeholder } from '../ui/Placeholder';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';
import styles from './Leadership.module.css';

const FILE = 'leadership.ts';

export function Leadership() {
  return (
    <section id="leadership" className="section" aria-labelledby="leadership-title">
      <div className="container">
        <SectionHeader
          index="06"
          label="Leadership & activities"
          id="leadership-title"
          title={
            <>
              Leading people, not just <span className="serif gradient-text">projects.</span>
            </>
          }
          lede="Beyond code, I take on roles that build the skills data science work depends on: communicating clearly, organising teams, and owning outcomes."
        />

        <div className={styles.layout}>
          <Reveal className={styles.themes}>
            <ul role="list">
              {leadershipThemes.map((t) => (
                <li key={t.title} className={styles.theme}>
                  <p className={styles.themeTitle}>{t.title}</p>
                  <p className={styles.themeBody}>{t.body}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <ol className={styles.timeline}>
            {leadership.map((r, i) => (
              <Reveal key={r.id} delay={i * 0.05} className={styles.item}>
                <span className={styles.node} aria-hidden="true">
                  <Icon name={r.icon} size={16} />
                </span>
                <div className={styles.content}>
                  <div className={styles.head}>
                    <div>
                      <h3 className={styles.role}>{r.role}</h3>
                      <p className={styles.org}>{r.organisation}</p>
                    </div>
                    {r.period ? <span className={styles.period}>{r.period}</span> : <Placeholder label="period" file={FILE} />}
                  </div>
                  {filled(r.description) ? <p className={styles.desc}>{r.description}</p> : <Placeholder label="what you led / did" file={FILE} />}
                  {r.highlights.length > 0 && (
                    <ul className={styles.highlights}>
                      {r.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  )}
                  <ul role="list" className={styles.tags}>
                    {r.competencies.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
