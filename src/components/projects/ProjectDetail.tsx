import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, X } from 'lucide-react';
import { useEffect, useRef, type ReactNode } from 'react';
import { site } from '../../data/site';
import type { Project } from '../../data/types';
import { asset, filled } from '../../lib/content';
import { GitHubIcon } from '../../lib/icons';
import { Chip } from '../ui/Chip';
import { CoverArt } from '../ui/CoverArt';
import { Placeholder } from '../ui/Placeholder';
import { statusTone } from './meta';
import styles from './ProjectDetail.module.css';

interface Props {
  project: Project;
  prev: Project | null;
  next: Project | null;
  onClose: () => void;
  onNavigate: (slug: string) => void;
}

const FILE = 'projects.ts';

function Field({ label, value }: { label: string; value: string | null }) {
  if (!filled(value) && !site.showPlaceholders) return null;
  return (
    <div className={styles.field}>
      <h4 className={styles.fieldLabel}>{label}</h4>
      {filled(value) ? <p className={styles.fieldText}>{value}</p> : <Placeholder label={label.toLowerCase()} file={FILE} />}
    </div>
  );
}

function ListField({ label, items, numbered = false }: { label: string; items: string[]; numbered?: boolean }) {
  if (!items.length && !site.showPlaceholders) return null;
  const List = numbered ? 'ol' : 'ul';
  return (
    <div className={styles.field}>
      <h4 className={styles.fieldLabel}>{label}</h4>
      {items.length ? (
        <List className={`${styles.list} ${numbered ? styles.numbered : ''}`}>
          {items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </List>
      ) : (
        <Placeholder label={label.toLowerCase()} file={FILE} />
      )}
    </div>
  );
}

function Block({ title, children, index }: { title: string; children: ReactNode; index: string }) {
  return (
    <section className={styles.block}>
      <h3 className={styles.blockTitle}>
        <span className={styles.blockIndex}>{index}</span>
        {title}
      </h3>
      <div className={styles.blockBody}>{children}</div>
    </section>
  );
}

export function ProjectDetail({ project: p, prev, next, onClose, onNavigate }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Scroll lock, Escape to close, focus management and a simple focus trap.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.classList.add('scroll-locked');
    closeRef.current?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key !== 'Tab' || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('scroll-locked');
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [onClose]);

  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0 });
  }, [p.slug]);

  const w = p.workflow;

  return (
    <motion.div
      className={styles.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
        className={styles.panel}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.topbar}>
          <p className={styles.crumb}>
            Projects <span aria-hidden="true">/</span> <span>{p.name}</span>
          </p>
          <button ref={closeRef} type="button" onClick={onClose} className={styles.close} aria-label="Close case study">
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <header className={styles.hero}>
          <div className={styles.cover}>
            {p.images[0] ? (
              <img src={asset(p.images[0].src)} alt={p.images[0].alt} className={styles.coverImg} />
            ) : (
              <CoverArt project={p} />
            )}
          </div>
          <div className={styles.heading}>
            <div className={styles.chips}>
              {p.status ? <Chip tone={statusTone[p.status]}>{p.status}</Chip> : <Placeholder label="status" file={FILE} />}
              {p.year && <Chip mono>{p.year}</Chip>}
              {p.categories.map((c) => (
                <Chip key={c} tone="muted">
                  {c}
                </Chip>
              ))}
            </div>
            <h2 id="project-title" className={styles.title}>
              {p.name}
            </h2>
            <p className={styles.tagline}>{p.tagline}</p>
            <p className={styles.desc}>{p.description}</p>

            <div className={styles.actions}>
              {p.links.github ? (
                <a href={p.links.github} target="_blank" rel="noopener noreferrer" className={styles.actionPrimary}>
                  <GitHubIcon size={16} /> View repository
                </a>
              ) : (
                site.showPlaceholders && <Placeholder label="GitHub repository link" file={FILE} />
              )}
              {p.links.demo && (
                <a href={p.links.demo} target="_blank" rel="noopener noreferrer" className={styles.actionSecondary}>
                  <ExternalLink size={16} aria-hidden="true" /> Live demo
                </a>
              )}
              {p.links.other.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={styles.actionSecondary}>
                  <ExternalLink size={16} aria-hidden="true" /> {l.label}
                </a>
              ))}
            </div>
          </div>
        </header>

        <div className={styles.content}>
          <Block index="01" title="Problem & solution">
            <div className={styles.twoCol}>
              <Field label="Problem statement" value={p.problem} />
              <Field label="Proposed solution" value={p.solution} />
            </div>
          </Block>

          {w.kind === 'ml' ? (
            <Block index="02" title="Data science workflow">
              <div className={styles.pipeline}>
                <div className={styles.step}>
                  <Field label="Dataset" value={w.dataset} />
                  <ListField label="Data sources" items={w.dataSources} />
                </div>
                <div className={styles.step}>
                  <ListField label="Data preprocessing" items={w.preprocessing} />
                </div>
                <div className={styles.step}>
                  <ListField label="Exploratory data analysis" items={w.eda} />
                </div>
                <div className={styles.step}>
                  <ListField label="Feature engineering" items={w.featureEngineering} />
                </div>
                <div className={styles.step}>
                  <ListField label="Algorithms & models" items={w.models} />
                </div>
                <div className={styles.step}>
                  <ListField label="Evaluation metrics" items={w.evaluationMetrics} />
                </div>
              </div>
            </Block>
          ) : w.kind === 'analytics' ? (
            <Block index="02" title="Analysis workflow">
              <div className={styles.pipeline}>
                <div className={styles.step}>
                  <Field label="Dataset" value={w.dataset} />
                  <ListField label="Data sources" items={w.dataSources} />
                </div>
                <div className={styles.step}>
                  <ListField label="Data preparation" items={w.preparation} />
                </div>
                <div className={styles.step}>
                  <ListField label="Analysis & visualisation" items={w.analysis} />
                </div>
                <div className={styles.step}>
                  <ListField label="Key findings" items={w.findings} />
                </div>
                <div className={styles.step}>
                  <ListField label="Recommendations" items={w.recommendations} />
                </div>
              </div>
            </Block>
          ) : (
            <Block index="02" title="Development workflow">
              <div className={styles.pipeline}>
                <div className={styles.step}>
                  <Field label="Architecture" value={w.architecture} />
                </div>
                <div className={styles.step}>
                  <ListField label="Key components" items={w.components} />
                </div>
                <div className={styles.step}>
                  <ListField label="Data & knowledge sources" items={w.dataSources} />
                </div>
                <div className={styles.step}>
                  <ListField label="Build pipeline" items={w.pipeline} numbered />
                </div>
                <div className={styles.step}>
                  <ListField label="Testing & evaluation" items={w.evaluation} />
                </div>
              </div>
            </Block>
          )}

          <Block index="03" title="Tech stack & contribution">
            <div className={styles.twoCol}>
              <div className={styles.field}>
                <h4 className={styles.fieldLabel}>Technologies</h4>
                {p.techStack.length ? (
                  <ul role="list" className={styles.stack}>
                    {p.techStack.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                ) : (
                  <Placeholder label="tech stack" file={FILE} />
                )}
              </div>
              <div className={styles.fieldGroup}>
                <Field label="My contribution" value={p.contribution} />
                <Field label="Team" value={p.team} />
              </div>
            </div>
          </Block>

          {(p.images.length > 1 || site.showPlaceholders) && (
            <Block index="04" title="Screenshots">
              {p.images.length > 1 ? (
                <div className={styles.gallery}>
                  {p.images.slice(1).map((img) => (
                    <figure key={img.src}>
                      <img src={asset(img.src)} alt={img.alt} loading="lazy" decoding="async" />
                      <figcaption>{img.alt}</figcaption>
                    </figure>
                  ))}
                </div>
              ) : (
                <Placeholder label="project screenshots (images array)" file={FILE} block />
              )}
            </Block>
          )}

          <Block index="05" title="Reflection">
            <div className={styles.twoCol}>
              <ListField label="Challenges" items={p.challenges} />
              <ListField label="Future improvements" items={p.futureImprovements} />
            </div>
          </Block>
        </div>

        <nav className={styles.pager} aria-label="More projects">
          {prev ? (
            <button type="button" onClick={() => onNavigate(prev.slug)} className={styles.pageBtn}>
              <ArrowLeft size={16} aria-hidden="true" />
              <span>
                <small>Previous</small>
                {prev.name}
              </span>
            </button>
          ) : (
            <span />
          )}
          {next && (
            <button type="button" onClick={() => onNavigate(next.slug)} className={`${styles.pageBtn} ${styles.pageNext}`}>
              <span>
                <small>Next</small>
                {next.name}
              </span>
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          )}
        </nav>
      </motion.div>
    </motion.div>
  );
}
