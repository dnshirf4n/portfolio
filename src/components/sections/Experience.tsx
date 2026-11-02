import { Briefcase, ExternalLink } from 'lucide-react';
import { site } from '../../data/site';
import { experience } from '../../data/experience';
import { filled } from '../../lib/content';
import { Chip } from '../ui/Chip';
import { Placeholder } from '../ui/Placeholder';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';
import styles from './Experience.module.css';

const FILE = 'experience.ts';

function Group({ label, items, chips = false }: { label: string; items: string[]; chips?: boolean }) {
  if (!items.length && !site.showPlaceholders) return null;
  return (
    <div className={styles.group}>
      <h4 className={styles.groupLabel}>{label}</h4>
      {items.length === 0 ? (
        <Placeholder label={label.toLowerCase()} file={FILE} />
      ) : chips ? (
        <ul role="list" className={styles.chips}>
          {items.map((i) => (
            <li key={i}>
              <Chip>{i}</Chip>
            </li>
          ))}
        </ul>
      ) : (
        <ul className={styles.list}>
          {items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeader
          index="04"
          label="Professional experience"
          id="experience-title"
          title={
            <>
              Applying what I learn in a <span className="serif gradient-text">professional setting.</span>
            </>
          }
        />

        <div className={styles.list}>
          {experience.map((e) => (
            <Reveal key={e.id} className={styles.card}>
              <div className={styles.side}>
                <span className={styles.logo} aria-hidden="true">
                  <Briefcase size={20} />
                </span>
                <div>
                  <p className={styles.period}>{e.period ?? <Placeholder label="employment period" file={FILE} />}</p>
                  {(e.location || site.showPlaceholders) && (
                    <p className={styles.location}>{e.location ?? <Placeholder label="location" file={FILE} />}</p>
                  )}
                </div>
              </div>

              <div className={styles.main}>
                <div className={styles.head}>
                  <div>
                    <h3 className={styles.title}>{filled(e.title) ? e.title : <Placeholder label="job title" file={FILE} />}</h3>
                    <p className={styles.company}>
                      {e.link ? (
                        <a href={e.link} target="_blank" rel="noopener noreferrer">
                          {e.company} <ExternalLink size={13} aria-hidden="true" />
                        </a>
                      ) : (
                        e.company
                      )}
                    </p>
                  </div>
                  <Chip tone="accent">{e.type}</Chip>
                </div>

                {filled(e.summary) ? <p className={styles.summary}>{e.summary}</p> : <Placeholder label="role summary" file={FILE} block />}

                <div className={styles.groups}>
                  <Group label="Responsibilities" items={e.responsibilities} />
                  <Group label="Key achievements" items={e.achievements} />
                  <Group label="Projects contributed to" items={e.projects} />
                  <Group label="Technologies used" items={e.technologies} chips />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
