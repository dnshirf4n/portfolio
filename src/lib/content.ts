import { site } from '../data/site';

/** True when a content field has been filled in. */
export function filled<T>(value: T | null | undefined): value is T {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

/** Whether to render a field: filled, or empty but placeholders are enabled. */
export function shouldShow(value: unknown): boolean {
  return filled(value) || site.showPlaceholders;
}

/** Prefix a /public path with Vite's base URL so it works on sub-path hosting (e.g. GitHub Pages). */
export function asset(path: string): string {
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:') || path.startsWith('mailto:')) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
