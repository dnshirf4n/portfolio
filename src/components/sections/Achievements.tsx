import { Award, ExternalLink, FileImage, Trophy } from 'lucide-react';
import { achievements } from '../../data/achievements';
import { projects } from '../../data/projects';
import { site } from '../../data/site';
import { asset, filled } from '../../lib/content';
import { Placeholder } from '../ui/Placeholder';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';
import { Spotlight } from '../ui/Spotlight';
import styles from './Achievements.module.css';

const FILE = 'achievements.ts';
const ordinal = { 1: '1st', 2: '2nd', 3: '3rd' } as const;
const tone = { 1: styles.gold, 2: styles.silver, 3: styles.bronze } as const;
const medalTone = { gold: styles.gold, silver: styles.silver, bronze: styles.bronze } as const;

export function Achievements() {
  return (
    <section id="achievements" className="section" aria-labelledby="achievements-title">
      <div className="container">
        <SectionHeader
          index="05"
          label="Achievements & awards"
          id="achievements-title"
          title={
            <>
              Recognition earned under <span className="serif gradient-text">competition pressure.</span>
            </>
          }
          lede="Hackathons are where I test ideas fastest: scope a real problem, build with a team against the clock, and defend the result in front of judges."
        />

        <div className={styles.grid}>
          {achievements.map((a, i) => {
            const project = a.relatedProject ? projects.find((p) => p.slug === a.relatedProject) : null;
            return (
              <Reveal key={a.id} delay={i * 0.08}>
                <Spotlight className={`${styles.card} ${a.placing ? tone[a.placing] : a.medal ? medalTone[a.medal] : ''}`}>
                  <div className={styles.top}>
                    <div className={styles.rank}>
                      <span className={styles.rankIcon}>{a.placing === 1 ? <Trophy size={20} aria-hidden="true" /> : <Award size={20} aria-hidden="true" />}</span>
                      {a.placing && <span className={`serif ${styles.ordinal}`}>{ordinal[a.placing]}</span>}
                    </div>
                    {a.year && <span className={styles.year}>{a.year}</span>}
                  </div>

                  <p className={styles.award}>{a.award}</p>
                  <h3 className={styles.event}>{a.event}</h3>

                  <dl className={styles.meta}>
                    <div>
                      <dt>Organiser</dt>
                      <dd>{a.organiser ?? <Placeholder label="organiser" file={FILE} />}</dd>
                    </div>
                    {!a.year && site.showPlaceholders && (
                      <div>
                        <dt>Year</dt>
                        <dd>
                          <Placeholder label="year" file={FILE} />
                        </dd>
                      </div>
                    )}
                    {project && (
                      <div>
                        <dt>Project</dt>
                        <dd>
                          <a href={`#/projects/${project.slug}`} className={styles.projectLink}>
                            {project.name}
                          </a>
                        </dd>
                      </div>
                    )}
                  </dl>

                  {filled(a.description) ? (
                    <p className={styles.desc}>{a.description}</p>
                  ) : (
                    <Placeholder label="what you built and why it won" file={FILE} block />
                  )}

                  {(a.certificate || site.showPlaceholders) && (
                    <div className={styles.cert}>
                      {a.certificate ? (
                        <a href={asset(a.certificate.src)} target="_blank" rel="noopener noreferrer" aria-label={`View certificate: ${a.certificate.alt}`}>
                          <img src={asset(a.certificate.src)} alt={a.certificate.alt} loading="lazy" decoding="async" />
                        </a>
                      ) : (
                        <div className={styles.certPlaceholder}>
                          <FileImage size={22} aria-hidden="true" />
                          <span>Certificate image</span>
                          <Placeholder label="certificate" file={FILE} />
                        </div>
                      )}
                    </div>
                  )}

                  {a.links.length > 0 && (
                    <ul role="list" className={styles.links}>
                      {a.links.map((l) => (
                        <li key={l.href}>
                          <a href={l.href} target="_blank" rel="noopener noreferrer">
                            {l.label} <ExternalLink size={13} aria-hidden="true" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </Spotlight>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
