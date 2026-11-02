/**
 * Site-wide configuration: SEO, contact form, and display switches.
 * This file is also read by vite.config.ts to fill in index.html metadata,
 * so keep it free of browser-only code.
 */
export const site = {
  /**
   * Shows dashed "To add" hints for every field you have not filled in yet.
   * Set to `false` before deploying publicly: empty fields are then hidden.
   */
  showPlaceholders: false,

  /** Show the short branded loading animation on first visit in a session. */
  showLoader: true,

  /** Your public URL once deployed (no trailing slash). Used for SEO tags. */
  url: 'https://your-domain.com',

  title: 'Danish Irfan — Aspiring Data Scientist',
  description:
    'Danish Irfan is a Computer Science student at Universiti Teknologi PETRONAS (UTP), Malaysia, building toward a career in Data Science through machine learning projects, AI applications and hackathons.',
  keywords: [
    'Danish Irfan',
    'Data Science',
    'Machine Learning',
    'Artificial Intelligence',
    'Universiti Teknologi PETRONAS',
    'UTP',
    'Computer Science',
    'Malaysia',
    'Portfolio',
  ],
  /** Image used when the site is shared on LinkedIn, X, WhatsApp, etc. */
  ogImage: '/og-image.png',
  locale: 'en_MY',
  themeColor: '#07080a',

  /**
   * Contact form delivery.
   *  - provider "formspree": create a form at https://formspree.io and paste
   *    the endpoint, e.g. "https://formspree.io/f/abcdwxyz".
   *  - provider "web3forms": create an access key at https://web3forms.com and
   *    paste it as `accessKey` (endpoint stays as below).
   *  - provider "mailto": no service needed; opens the visitor's email app
   *    addressed to profile.socials.email.
   */
  contactForm: {
    provider: 'mailto' as 'formspree' | 'web3forms' | 'mailto',
    endpoint: '',
    accessKey: '',
  },
} as const;

export type SiteConfig = typeof site;
