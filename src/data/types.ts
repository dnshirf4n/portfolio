/**
 * Content types for the portfolio.
 *
 * Convention used across every data file:
 *   - A value of `null` (or an empty array) means "not provided yet".
 *   - While `site.showPlaceholders` is `true`, empty fields render as a
 *     dashed "To add" hint so you can see what still needs filling in.
 *   - Set `site.showPlaceholders` to `false` before going live and every
 *     empty field is hidden automatically.
 */

export interface Link {
  label: string;
  href: string;
}

export type IconName =
  | 'code'
  | 'table'
  | 'chart'
  | 'brain'
  | 'sparkles'
  | 'wrench'
  | 'database'
  | 'shield'
  | 'cpu'
  | 'layers'
  | 'compass'
  | 'trending'
  | 'eye'
  | 'server'
  | 'flask'
  | 'book'
  | 'users'
  | 'pen'
  | 'video'
  | 'heart'
  | 'zap'
  | 'target'
  | 'lightbulb';

/* ---------- Profile ---------- */

export interface SocialLinks {
  email: string | null;
  linkedin: string | null;
  github: string | null;
  /** Any other profiles (Kaggle, Medium, Devpost, Google Scholar, etc.) */
  other: Link[];
}

export interface Profile {
  name: string;
  firstName: string;
  initials: string;
  headline: { lead: string; accent: string; tail: string; accent2: string };
  brandStatement: string;
  intro: string;
  roles: string[];
  traits: string[];
  location: string;
  university: string;
  universityShort: string;
  program: string;
  ambition: string;
  interests: string[];
  availability: { open: boolean; label: string };
  /** Path inside /public, e.g. "/images/profile.jpg". null = monogram placeholder */
  photo: string | null;
  /** Path inside /public, e.g. "/resume/Danish-Irfan-Resume.pdf". null hides the button */
  resume: string | null;
  socials: SocialLinks;
}

/* ---------- About ---------- */

export interface AboutBlock {
  id: string;
  title: string;
  icon: IconName;
  body: string;
}

export interface About {
  heading: string;
  lede: string;
  story: string[];
  blocks: AboutBlock[];
  principles: { title: string; body: string }[];
}

/* ---------- Skills ---------- */

export interface SkillCategory {
  id: string;
  title: string;
  icon: IconName;
  description: string;
  skills: string[];
  /** Bento sizing hint: "wide" spans two columns on desktop */
  size?: 'normal' | 'wide';
}

export interface ExploringItem {
  topic: string;
  note: string;
}

/* ---------- Projects ---------- */

export type ProjectStatus = 'Concept' | 'In Progress' | 'Prototype' | 'Completed' | 'Competition Entry';

export type ProjectCategory =
  | 'Machine Learning'
  | 'NLP'
  | 'Generative AI'
  | 'Cybersecurity'
  | 'Data Science'
  | 'Data Analytics'
  | 'Data Engineering'
  | 'Applications'
  | 'Software';

/** Data-science workflow — used when `workflow` is "ml". */
export interface MLWorkflow {
  kind: 'ml';
  dataset: string | null;
  dataSources: string[];
  preprocessing: string[];
  eda: string[];
  featureEngineering: string[];
  models: string[];
  evaluationMetrics: string[];
}

/** Engineering / AI-application workflow — used when `workflow` is "engineering". */
export interface EngineeringWorkflow {
  kind: 'engineering';
  architecture: string | null;
  components: string[];
  dataSources: string[];
  /** Ordered development / pipeline steps */
  pipeline: string[];
  evaluation: string[];
}

/** Analytics / insight workflow — used when `workflow` is "analytics". */
export interface AnalyticsWorkflow {
  kind: 'analytics';
  dataset: string | null;
  dataSources: string[];
  preparation: string[];
  analysis: string[];
  findings: string[];
  recommendations: string[];
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  categories: ProjectCategory[];
  status: ProjectStatus | null;
  year: string | null;
  featured?: boolean;
  /** Hue (0–360) for the generated cover art when no image is supplied */
  hue: number;
  /** Visual motif for the generated cover art */
  motif: 'grid' | 'wave' | 'nodes' | 'bars' | 'rings' | 'scatter' | 'contour';
  problem: string | null;
  solution: string | null;
  workflow: MLWorkflow | EngineeringWorkflow | AnalyticsWorkflow;
  techStack: string[];
  contribution: string | null;
  team: string | null;
  challenges: string[];
  futureImprovements: string[];
  /** Paths inside /public. Empty = generated cover art */
  images: { src: string; alt: string }[];
  links: { github: string | null; demo: string | null; other: Link[] };
}

/* ---------- Achievements ---------- */

export interface Achievement {
  id: string;
  event: string;
  award: string;
  /** 1 = champion, 2 = runner-up, 3 = third, null = other recognition */
  placing: 1 | 2 | 3 | null;
  /** Optional medal colour for non-ranked awards, e.g. a Silver Award */
  medal?: 'gold' | 'silver' | 'bronze';
  year: string | null;
  organiser: string | null;
  description: string | null;
  relatedProject: string | null;
  certificate: { src: string; alt: string } | null;
  links: Link[];
}

/* ---------- Leadership ---------- */

export interface LeadershipRole {
  id: string;
  role: string;
  organisation: string;
  period: string | null;
  icon: IconName;
  description: string | null;
  highlights: string[];
  competencies: string[];
}

/* ---------- Experience ---------- */

export interface Experience {
  id: string;
  company: string;
  title: string | null;
  type: string;
  period: string | null;
  location: string | null;
  summary: string | null;
  responsibilities: string[];
  technologies: string[];
  projects: string[];
  achievements: string[];
  link: string | null;
}

/* ---------- Education ---------- */

export interface Education {
  id: string;
  institution: string;
  shortName: string;
  programme: string;
  degree: string | null;
  location: string;
  studyPeriod: string | null;
  expectedGraduation: string | null;
  cgpa: string | null;
  coursework: string[];
  achievements: string[];
}

/* ---------- Beyond technology ---------- */

export interface Interest {
  title: string;
  icon: IconName;
  body: string | null;
}
