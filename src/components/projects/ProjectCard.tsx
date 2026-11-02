import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import type { Project } from '../../data/types';
import { asset } from '../../lib/content';
import { GitHubIcon } from '../../lib/icons';
import { Chip } from '../ui/Chip';
import { CoverArt } from '../ui/CoverArt';
import { highlights, statusTone } from './meta';
import styles from './ProjectCard.module.css';

interface Props {
  project: Project;
  index: number;
  onOpen: (slug: string) => void;
}

export function ProjectCard({ project: p, index, onOpen }: Props) {
  const cover = p.images[0];
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`${styles.card} ${p.featured ? styles.featured : ''}`}
    >
      <div className={styles.media}>
        {cover ? (
          <img src={asset(cover.src)} alt={cover.alt} loading="lazy" decoding="async" className={styles.img} />
        ) : (
          <CoverArt project={p} className={styles.art} />
        )}
        <div className={styles.badges}>
          {p.status && <Chip tone={statusTone[p.status]}>{p.status}</Chip>}
          {p.year && <Chip mono>{p.year}</Chip>}
        </div>
        <span className={styles.idx} aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className={styles.body}>
        <p className={styles.cats}>{p.categories.join(' · ')}</p>
        <h3 className={styles.title}>
          <button type="button" className={styles.open} onClick={() => onOpen(p.slug)} aria-label={`Open case study: ${p.name}`}>
            {p.name}
          </button>
        </h3>
        <p className={styles.tagline}>{p.tagline}</p>
        <p className={styles.desc}>{p.description}</p>

        <div className={styles.footer}>
          <ul role="list" className={styles.tags}>
            {highlights(p).map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          <div className={styles.links}>
            {p.links.github && (
              <a href={p.links.github} target="_blank" rel="noopener noreferrer" className={styles.linkBtn} aria-label={`${p.name} on GitHub`}>
                <GitHubIcon size={16} />
              </a>
            )}
            {p.links.demo && (
              <a href={p.links.demo} target="_blank" rel="noopener noreferrer" className={styles.linkBtn} aria-label={`${p.name} live demo`}>
                <ExternalLink size={16} aria-hidden="true" />
              </a>
            )}
            <span className={styles.arrow} aria-hidden="true">
              <ArrowUpRight size={18} />
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
