import { useEffect, useState } from 'react';

/** Returns the id of the section currently in the reading zone of the viewport. */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState('');

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!elements.length) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top);
          else visible.delete(entry.target.id);
        });
        if (visible.size === 0) {
          if (window.scrollY < 200) setActive('');
          return;
        }
        // Pick the section whose top is closest to (but above) the reading line.
        const [first] = [...visible.entries()].sort((a, b) => a[1] - b[1]);
        setActive(first[0]);
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
