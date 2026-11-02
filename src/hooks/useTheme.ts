import { useCallback, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';
const KEY = 'di-theme';

function readInitial(): Theme {
  if (typeof document === 'undefined') return 'dark';
  const attr = document.documentElement.getAttribute('data-theme');
  return attr === 'light' ? 'light' : 'dark';
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readInitial);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    meta?.setAttribute('content', theme === 'dark' ? '#07080a' : '#fafafa');
    try {
      localStorage.setItem(KEY, theme);
    } catch {
      /* storage unavailable — theme still applies for this visit */
    }
  }, [theme]);

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), []);
  return { theme, toggle };
}
