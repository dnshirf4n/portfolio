import { useCallback, useEffect, useState } from 'react';

const PREFIX = '#/projects/';

/**
 * Tiny hash router for project case studies: #/projects/<slug>.
 * Keeps detail pages linkable and shareable without a router dependency.
 */
export function useProjectRoute() {
  const read = () => (window.location.hash.startsWith(PREFIX) ? decodeURIComponent(window.location.hash.slice(PREFIX.length)) : null);
  const [slug, setSlug] = useState<string | null>(read);

  useEffect(() => {
    const onHash = () => setSlug(read());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const open = useCallback((next: string) => {
    window.location.hash = `${PREFIX}${next}`;
  }, []);

  const close = useCallback(() => {
    // Return to the projects section without adding a history entry.
    history.replaceState(null, '', `${window.location.pathname}${window.location.search}#projects`);
    setSlug(null);
  }, []);

  return { slug, open, close };
}
