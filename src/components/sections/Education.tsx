import { GraduationCap, MapPin } from 'lucide-react';
import { education } from '../../data/education';
import { site } from '../../data/site';
import { filled } from '../../lib/content';
import { Placeholder } from '../ui/Placeholder';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';
import styles from './Education.module.css';

const FILE = 'education.ts';

export function Education() {
  return (
    <section id="education" className="section" aria-labelledby="education-title">
      <div className="container">
        <SectionHeader
          index="07"
          label="Education"
          id="education-title"
          title={
            <>
              The academic <span className="serif gradient-text">foundation.</span>
            </>
          }
        />

        {education.map((e, idx) => {
          // Only the main (first) entry shows "To add" hints for optional lists.
          const hints = site.showPlaceholders && idx === 0;
          const facts = [
            { label: 'Study period', value: e.studyPeriod },
            { label: 'Expected graduation', value: e.expectedGraduation },
            { label: 'CGPA', value: e.cgpa },
          ].filter((f) => filled(f.value) || hints);

          return (
            <Reveal key={e.id} className={`${styles.card} ${idx > 0 ? styles.secondary : ''}`}>
              <div className={styles.head}>
                <span className={styles.crest} aria-hidden="true">
                  <GraduationCap size={26} />
                </span>
                <div>
                  <p className={styles.short}>{e.shortName}</p>
                  <h3 className={styles.institution}>{e.institution}</h3>
                  <p className={styles.programme}>
                    {filled(e.degree) ? e.degree : e.programme}
                    {!filled(e.degree) && site.showPlaceholders && (
                      <>
                        {' '}
                        <Placeholder label="full degree title" file={FILE} />
                      </>
                    )}
                  </p>
                  <p className={styles.location}>
                    <MapPin size={14} aria-hidden="true" /> {e.location}
                  </p>
                </div>
              </div>

              {facts.length > 0 && (
                <dl className={styles.facts}>
                  {facts.map((f) => (
                    <div key={f.label} className={styles.fact}>
                      <dt>{f.label}</dt>
                      <dd>{filled(f.value) ? f.value : <Placeholder label={f.label.toLowerCase()} file={FILE} />}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <div className={styles.lists}>
                {(e.coursework.length > 0 || hints) && (
                  <div>
                    <h4 className={styles.listLabel}>Relevant coursework</h4>
                    {e.coursework.length ? (
                      <ul role="list" className={styles.courses}>
                        {e.coursework.map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ul>
                    ) : (
                      <Placeholder label="relevant coursework" file={FILE} />
                    )}
                  </div>
                )}
                {(e.achievements.length > 0 || hints) && (
                  <div>
                    <h4 className={styles.listLabel}>Academic achievements</h4>
                    {e.achievements.length ? (
                      <ul className={styles.achievements}>
                        {e.achievements.map((a) => (
                          <li key={a}>{a}</li>
                        ))}
                      </ul>
                    ) : (
                      <Placeholder label="academic achievements" file={FILE} />
                    )}
                  </div>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
