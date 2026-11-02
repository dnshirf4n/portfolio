# Danish Irfan — Portfolio

A personal brand website for **Danish Irfan**, a Computer Science student at Universiti Teknologi PETRONAS working toward becoming a Data Scientist.

Built with **React 19 + TypeScript + Vite**, **CSS Modules** (no Tailwind), **Framer Motion** and **Lucide** icons. All content lives in typed data files under `src/data/`, so you can update projects, awards, experience and skills without touching any UI component.

---

## 1. Quick start

Requirements: **Node.js 20.19+ or 22+** and npm.

```bash
npm install        # install dependencies
npm run dev        # start the dev server → http://localhost:5173
```

| Command             | What it does                                                 |
| ------------------- | ------------------------------------------------------------ |
| `npm run dev`       | Local dev server with hot reload                             |
| `npm run typecheck` | TypeScript check only                                        |
| `npm run build`     | Type-check, then build the production site into `dist/`      |
| `npm run preview`   | Serve the built `dist/` locally to test the production build |

---

## 2. Before you go live: checklist

Everything you have not provided yet shows on the site as a dashed **"To add: …"** hint that names the file to edit. Fill these in, then switch the hints off.

1. **Photo:** put `profile.jpg` (about 800×1000px) in `public/images/` and set `photo: '/images/profile.jpg'` in `src/data/profile.ts`.
2. **Resume:** replace `public/resume/Danish-Irfan-Resume.pdf` with your real CV (keep the same name).
3. **Contact links:** in `src/data/profile.ts → socials`, set `email`, `linkedin`, and any `other` profiles. `github` is pre-filled with `https://github.com/dnshirf4n`, so change it if that is not the account you want to show.
4. **Availability badge:** edit `profile.availability` (set `open: false` for a neutral status).
5. **Experience:** fill in the Enygma AI entry in `src/data/experience.ts` (title, period, responsibilities and so on).
6. **Education:** in `src/data/education.ts`, add your degree title, study period, expected graduation, CGPA (optional), coursework and achievements.
7. **Awards:** in `src/data/achievements.ts`, add organisers, the AWS x GenAI Hackathon year, descriptions and certificate images.
8. **Leadership:** in `src/data/leadership.ts`, add periods and one or two lines on what you did in each role.
9. **Projects:** in `src/data/projects.ts`, add problem statements, datasets, models, metrics, your contribution and links.
10. **Beyond Technology:** replace the two "Your interest" cards in `src/data/interests.ts`.
11. **SEO:** set `url` in `src/data/site.ts` to your real domain, and update the domain in `public/robots.txt` and `public/sitemap.xml`.
12. **Contact form:** configure delivery (see section 6).
13. Set **`showPlaceholders: false`** in `src/data/site.ts`. Every field that is still empty is then hidden.

---

## 3. Project structure

```
portfolio/
├── index.html                  # HTML shell (SEO tags injected at build time)
├── vite.config.ts              # Vite config + SEO/JSON-LD injection plugin
├── public/                     # Static files, served as-is
│   ├── favicon.svg / *.png     # Favicon + app icons
│   ├── og-image.png            # Social share image (1200×630)
│   ├── resume/                 # ← your resume PDF
│   ├── images/projects/        # ← project screenshots
│   ├── images/certificates/    # ← award certificates
│   ├── robots.txt, sitemap.xml, site.webmanifest
└── src/
    ├── data/                   # ★ ALL CONTENT LIVES HERE
    │   ├── site.ts             # SEO, contact-form provider, display switches
    │   ├── profile.ts          # Name, headline, intro, socials, About text
    │   ├── skills.ts           # Skill categories + "Currently Exploring"
    │   ├── projects.ts         # Featured projects / case studies (+ template)
    │   ├── achievements.ts     # Awards
    │   ├── leadership.ts       # Leadership roles + highlighted strengths
    │   ├── experience.ts       # Work / internships
    │   ├── education.ts        # Academic background
    │   ├── interests.ts        # "Beyond Technology"
    │   ├── types.ts            # Type definitions for all of the above
    │   └── index.ts
    ├── components/
    │   ├── layout/             # Navbar, Footer, Loader, BackToTop
    │   ├── sections/           # One component per page section
    │   ├── projects/           # Project card, case-study modal
    │   └── ui/                 # Button, Chip, Reveal, SectionHeader, CoverArt, …
    ├── hooks/                  # useTheme, useActiveSection, useProjectRoute, …
    ├── lib/                    # Icons, contact-form logic, content helpers
    ├── styles/global.css       # Design tokens (colours, type, spacing) + reset
    ├── App.tsx
    └── main.tsx
```

---

## 4. Updating content

All content is plain TypeScript objects, and your editor autocompletes every field. Conventions:

- `null` or `[]` means "not provided yet". It shows as a "To add" hint while `showPlaceholders` is on, and is hidden when it is off.
- Images go in `public/…` and are referenced with a leading slash, for example `'/images/projects/voltguard-1.webp'`.
- Order in an array is the order on the page.

### Add a skill
`src/data/skills.ts` → append to the right category's `skills` array:
```ts
skills: ['Python', 'SQL', 'R'],
```
New category: add an object with `id`, `title`, `icon` (see `IconName` in `types.ts`), `description`, `skills`. Use `size: 'wide'` to span two columns.

### Add a project
Copy the **TEMPLATE** at the bottom of `src/data/projects.ts` into the `projects` array and fill it in.

- `workflow.kind: 'ml'` shows the data-science steps: dataset, preprocessing, EDA, feature engineering, models and metrics.
- `workflow.kind: 'engineering'` shows the build steps instead: architecture, components, data sources, pipeline and evaluation. Use it for AI apps and software projects.
- `categories` drive the filter buttons automatically.
- `featured: true` gives the project a wide card.
- No screenshots yet? Leave `images: []`. A cover is generated from `hue` (0–360) and `motif` (`grid`, `wave`, `nodes`, `bars`, `rings`, `scatter`, `contour`).
- Every project has a shareable URL: `https://your-domain.com/#/projects/<slug>`.

### Add an achievement
`src/data/achievements.ts` → add an object at the **top** (newest first):
```ts
{
  id: 'my-new-award',
  event: 'Example Hackathon 2026',
  award: 'Runner-up',
  placing: 2,                       // 1, 2, 3 or null
  year: '2026',
  organiser: 'Organiser name',
  description: 'What you built and why it stood out.',
  relatedProject: 'voltguard-ai',   // optional project slug → links to the case study
  certificate: { src: '/images/certificates/example-2026.webp', alt: 'Example Hackathon certificate' },
  links: [{ label: 'Announcement', href: 'https://…' }],
},
```

### Experience, education, leadership, interests
Edit the matching file in `src/data/`. Each field is commented.

### The statistics strip
The numbers in the stats strip (projects, podium finishes, leadership roles, tools) are **counted from your data files**, so they always match what the site lists. To change them, add or remove data.

---

## 5. Design system

Tokens live at the top of `src/styles/global.css`:

- **Colours:** `--bg`, `--surface`, `--text`, `--accent` (electric blue), `--accent-2` (violet). Light-mode values are under `[data-theme='light']`.
- **Type:** Inter (UI), Instrument Serif italic (accent words), JetBrains Mono (labels), loaded from Google Fonts in `index.html`.
- **Spacing and radii:** the `--space-*` and `--radius-*` scales.

Change `--accent` in both themes to re-brand the whole site.

---

## 6. Contact form

Configure it in `src/data/site.ts → contactForm`:

| Provider      | Setup                                                                                                         |
| ------------- | ------------------------------------------------------------------------------------------------------------- |
| `'mailto'`    | Default. No service needed. Opens the visitor's email app addressed to `profile.socials.email` (set that first). |
| `'formspree'` | Create a free form at [formspree.io](https://formspree.io), then set `endpoint: 'https://formspree.io/f/xxxxxx'`. |
| `'web3forms'` | Get a free access key at [web3forms.com](https://web3forms.com), then set `accessKey: '…'`.                         |

The form validates input, includes a honeypot field against spam bots, and shows success and error states.

---

## 7. Build and deploy

```bash
npm run build      # outputs static files to dist/
```

`dist/` is a static site that any static host can serve.

**Vercel (recommended):** push the folder to a GitHub repo, then go to vercel.com → *Add New Project* → import the repo. Vercel detects Vite automatically (build `npm run build`, output `dist`).

**Netlify:** *Add new site* → import the repo, build command `npm run build`, publish directory `dist`. You can also drag and drop the `dist/` folder onto app.netlify.com/drop.

**GitHub Pages:** the site must be built for its sub-path:
```bash
BASE_PATH=/your-repo-name/ npm run build
```
Then publish `dist/` (for example with the `actions/deploy-pages` GitHub Action). For a user site (`username.github.io`), no `BASE_PATH` is needed.

After deploying, update `site.url` in `src/data/site.ts`, `public/robots.txt` and `public/sitemap.xml`, and rebuild.

---

## 8. Features

- Sticky navigation with an animated active-section indicator, and a full-screen mobile menu
- Dark (default) and light theme toggle. The choice is saved, with no flash on load.
- Animated hero headline and an interactive "data field" background that responds to the cursor
- Bento-grid About and Skills sections with cursor spotlight hover effects
- Filterable project grid, with a case-study view for each project that has its own shareable URL
- Achievement cards, a leadership timeline, Experience, Education, Currently Exploring and Beyond Technology sections
- Count-up statistics computed from your data
- A downloadable resume, social links, a working contact form, a back-to-top button and a branded loader (once per session)
- SEO: meta, Open Graph and Twitter tags, JSON-LD `Person` schema, canonical URL, sitemap, robots.txt, web manifest and favicons
- Accessibility: semantic landmarks, skip link, keyboard-navigable modal with focus trap, visible focus states, `prefers-reduced-motion` support
- Performance: no UI framework or Tailwind, CSS Modules, lazy-loaded images, an animation that pauses off-screen, and vendor chunk splitting
