import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';
import { profile } from './src/data/profile';
import { site } from './src/data/site';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** Injects SEO metadata and structured data from src/data into index.html. */
function seo(base: string): Plugin {
  return {
    name: 'portfolio-seo',
    transformIndexHtml(html) {
      const url = site.url.replace(/\/$/, '');
      const og = `${url}${site.ogImage}`;
      const sameAs = [profile.socials.linkedin, profile.socials.github, ...profile.socials.other.map((o) => o.href)].filter(Boolean);
      const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: profile.name,
        url,
        image: profile.photo ? `${url}${profile.photo}` : undefined,
        jobTitle: `Aspiring ${profile.ambition}`,
        description: site.description,
        address: { '@type': 'PostalAddress', addressCountry: 'MY' },
        alumniOf: { '@type': 'CollegeOrUniversity', name: profile.university },
        knowsAbout: ['Data Science', 'Machine Learning', 'Artificial Intelligence', 'Statistical Analysis', 'Natural Language Processing'],
        sameAs,
      };
      const tags = `
    <title>${esc(site.title)}</title>
    <meta name="description" content="${esc(site.description)}" />
    <meta name="keywords" content="${esc(site.keywords.join(', '))}" />
    <meta name="author" content="${esc(profile.name)}" />
    <meta name="theme-color" content="${site.themeColor}" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${url}/" />
    <meta property="og:type" content="profile" />
    <meta property="og:site_name" content="${esc(profile.name)}" />
    <meta property="og:title" content="${esc(site.title)}" />
    <meta property="og:description" content="${esc(site.description)}" />
    <meta property="og:url" content="${url}/" />
    <meta property="og:image" content="${og}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="${site.locale}" />
    <meta property="profile:first_name" content="${esc(profile.firstName)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(site.title)}" />
    <meta name="twitter:description" content="${esc(site.description)}" />
    <meta name="twitter:image" content="${og}" />
    <script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`;
      // Prefix root-relative asset links when deploying to a sub-path.
      const prefixed = base === '/' ? html : html.replace(/(href)="\/(favicon|apple-touch|site\.webmanifest)/g, `$1="${base}$2`);
      return prefixed.replace('<!--seo-->', tags);
    },
  };
}

// BASE_PATH lets you deploy under a sub-path, e.g. GitHub Pages: BASE_PATH=/portfolio/ npm run build
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  base,
  plugins: [react(), seo(base)],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
});
