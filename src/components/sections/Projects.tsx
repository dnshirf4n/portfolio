import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { projects } from '../../data/projects';
import { useProjectRoute } from '../../hooks/useHashRoute';
import { ProjectCard } from '../projects/ProjectCard';
import { ProjectDetail } from '../projects/ProjectDetail';
import { SectionHeader } from '../ui/SectionHeader';
import styles from './Projects.module.css';

const ALL = 'All';

export function Projects() {
  const [filter, setFilter] = useState<string>(ALL);
  const { slug, open, close } = useProjectRoute();

  // Categories derived from the data, ordered by frequency.
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    projects.forEach((p) => p.categories.forEach((c) => counts.set(c, (counts.get(c) ?? 0) + 1)));
    return [[ALL, projects.length] as const, ...[...counts.entries()].sort((a, b) => b[1] - a[1])];
  }, []);

  const visible = filter === ALL ? projects : projects.filter((p) => p.categories.includes(filter as never));
  const activeIndex = slug ? projects.findIndex((p) => p.slug === slug) : -1;
  const active = activeIndex >= 0 ? projects[activeIndex] : null;

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeader
          index="03"
          label="Featured projects"
          id="projects-title"
          title={
            <>
              Things I have <span className="serif gradient-text">built</span> and explored.
            </>
          }
          lede="Machine learning, NLP and applied AI projects — many started at hackathons and competitions. Open any project for the full case study."
        />

        <LayoutGroup>
          <div className={styles.filters} role="toolbar" aria-label="Filter projects by category">
            {categories.map(([name, count]) => (
              <button
                key={name}
                type="button"
                onClick={() => setFilter(name)}
                className={`${styles.filter} ${filter === name ? styles.filterActive : ''}`}
                aria-pressed={filter === name}
              >
                {filter === name && (
                  <motion.span layoutId="filter-pill" className={styles.filterPill} transition={{ type: 'spring', stiffness: 420, damping: 36 }} />
                )}
                <span className={styles.filterLabel}>
                  {name}
                  <span className={styles.filterCount}>{count}</span>
                </span>
              </button>
            ))}
          </div>

          <p className="visually-hidden" aria-live="polite">
            Showing {visible.length} project{visible.length === 1 ? '' : 's'}
          </p>

          <motion.div layout className={styles.grid}>
            <AnimatePresence mode="popLayout">
              {visible.map((p) => (
                <ProjectCard key={p.slug} project={p} index={projects.indexOf(p)} onOpen={open} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>

      <AnimatePresence>
        {active && (
          <ProjectDetail
            key="detail"
            project={active}
            prev={activeIndex > 0 ? projects[activeIndex - 1] : null}
            next={activeIndex < projects.length - 1 ? projects[activeIndex + 1] : null}
            onClose={close}
            onNavigate={open}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
