import type { Project, ProjectStatus } from '../../data/types';

export const statusTone: Record<ProjectStatus, 'accent' | 'violet' | 'success' | 'default'> = {
  Concept: 'violet',
  'In Progress': 'accent',
  Prototype: 'accent',
  Completed: 'success',
  'Competition Entry': 'default',
};

/** Short highlights for a card: tech stack first, then workflow keywords. */
export function highlights(p: Project, max = 3): string[] {
  if (p.techStack.length) return p.techStack.slice(0, max);
  const w = p.workflow;
  const pool =
    w.kind === 'ml'
      ? [...w.models, ...w.featureEngineering]
      : w.kind === 'analytics'
        ? [...w.analysis, ...w.findings]
        : [...(w.architecture ? [w.architecture] : []), ...w.components];
  return pool.slice(0, max);
}
