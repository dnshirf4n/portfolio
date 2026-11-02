import { FileText, Globe, Mail } from 'lucide-react';
import type { ReactNode } from 'react';
import { profile } from '../../data/profile';
import { asset } from '../../lib/content';
import { GitHubIcon, LinkedInIcon } from '../../lib/icons';
import styles from './SocialLinks.module.css';

export interface SocialItem {
  key: string;
  label: string;
  href: string | null;
  display: string;
  icon: ReactNode;
  external: boolean;
}

/** All contact channels, in display order. `href: null` = not provided yet. */
export function getSocials(size = 18): SocialItem[] {
  const s = profile.socials;
  const strip = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
  return [
    {
      key: 'email',
      label: 'Email',
      href: s.email ? `mailto:${s.email}` : null,
      display: s.email ?? 'Add your email',
      icon: <Mail size={size} aria-hidden="true" />,
      external: false,
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      href: s.linkedin,
      display: s.linkedin ? strip(s.linkedin) : 'Add your LinkedIn URL',
      icon: <LinkedInIcon size={size - 1} />,
      external: true,
    },
    {
      key: 'github',
      label: 'GitHub',
      href: s.github,
      display: s.github ? strip(s.github) : 'Add your GitHub URL',
      icon: <GitHubIcon size={size} />,
      external: true,
    },
    {
      key: 'resume',
      label: 'Resume',
      href: profile.resume ? asset(profile.resume) : null,
      display: profile.resume ? 'Download PDF' : 'Add your resume',
      icon: <FileText size={size} aria-hidden="true" />,
      external: false,
    },
    ...s.other.map((o) => ({
      key: o.label,
      label: o.label,
      href: o.href,
      display: strip(o.href),
      icon: <Globe size={size} aria-hidden="true" />,
      external: true,
    })),
  ];
}

/** Compact row of icon buttons (hero, footer). Only filled-in channels are shown. */
export function SocialLinks({ exclude = [] as string[] }) {
  const items = getSocials().filter((i) => i.href && !exclude.includes(i.key));
  if (!items.length) return null;
  return (
    <ul className={styles.row} role="list">
      {items.map((i) => (
        <li key={i.key}>
          <a
            href={i.href!}
            className={styles.icon}
            aria-label={i.label}
            title={i.label}
            {...(i.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            {...(i.key === 'resume' ? { download: '' } : {})}
          >
            {i.icon}
          </a>
        </li>
      ))}
    </ul>
  );
}
