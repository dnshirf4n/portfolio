import { interests } from '../../data/interests';
import { site } from '../../data/site';
import { filled } from '../../lib/content';
import { Icon } from '../../lib/icons';
import { Placeholder } from '../ui/Placeholder';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';
import styles from './Beyond.module.css';

export function Beyond() {
  const items = interests.filter((i) => filled(i.body) || site.showPlaceholders);
  if (!items.length) return null;
  return (
    <section id="beyond" className="section" aria-labelledby="beyond-title">
      <div className="container">
        <SectionHeader
          index="08"
          label="Beyond technology"
          id="beyond-title"
          title={
            <>
              The person behind the <span className="serif gradient-text">projects.</span>
            </>
          }
        />
        <div className={styles.grid}>
          {items.map((it, i) => (
            <Reveal key={`${it.title}-${i}`} delay={i * 0.05} className={styles.card}>
              <span className={styles.icon}>
                <Icon name={it.icon} size={18} />
              </span>
              <h3 className={styles.title}>{it.title}</h3>
              {filled(it.body) ? <p className={styles.body}>{it.body}</p> : <Placeholder label="a personal interest" file="interests.ts" />}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
