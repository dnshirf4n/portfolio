import type { About, Profile } from './types';

/**
 * Who you are. Everything in the hero, contact section and footer reads from here.
 * `null` = not provided yet (shown as a "To add" hint while site.showPlaceholders is true).
 */
export const profile: Profile = {
  name: 'Danish Irfan',
  firstName: 'Danish',
  initials: 'DI',

  // Rendered as: "Turning Data Into *Intelligence*. Building AI That *Matters*."
  headline: {
    lead: 'Turning Data Into',
    accent: 'Intelligence.',
    tail: 'Building AI That',
    accent2: 'Matters.',
  },
  brandStatement: 'Turning Data Into Intelligence. Building AI That Matters.',

  intro:
    'Computer Science student at Universiti Teknologi PETRONAS, passionate about Data Science, Machine Learning, and Artificial Intelligence. Exploring how data, statistical thinking, and intelligent algorithms can solve real-world problems.',

  roles: [
    'Aspiring Data Scientist',
    'Computer Science Student',
    'Machine Learning Enthusiast',
    'AI Enthusiast',
    'Data-Driven Problem Solver',
    'Hackathon Competitor',
  ],

  traits: [
    'Curious',
    'Analytical',
    'Technically driven',
    'Innovative',
    'Adaptable',
    'Problem solver',
    'Continuous learner',
    'Collaborative',
  ],

  location: 'Malaysia',
  university: 'Universiti Teknologi PETRONAS',
  universityShort: 'UTP',
  program: 'Computer Science',
  ambition: 'Data Scientist',
  interests: ['Machine Learning', 'Statistical Analysis', 'Natural Language Processing', 'Generative AI'],

  // EDIT ME: set `open` to false to show a neutral status instead of the green dot.
  availability: {
    open: true,
    label: 'Seeking an internship · May – Dec 2027',
  },

  // EDIT ME: drop your photo in /public/images/ (e.g. profile.jpg, ~800×1000px) and set the path.
  photo: '/images/profile.jpeg', // e.g. '/images/profile.jpg' or null

  // Your CV lives at /public/resume/Danish-Irfan-Resume.pdf — replace the file to update it.
  resume: '/resume/Danish-Irfan-Resume.pdf',

  socials: {
    // From your resume.
    email: 'danishirfan2605@gmail.com',
    linkedin: 'https://www.linkedin.com/in/danish-irfan-596537321/',
    github: 'https://github.com/dnshirf4n',
    // Add any other profiles, e.g. { label: 'Kaggle', href: 'https://www.kaggle.com/you' }
    other: [],
  },
};

export const about: About = {
  heading: 'From computer science fundamentals to data-driven intelligence.',
  lede:
    'I am a Computer Science student at Universiti Teknologi PETRONAS working toward one clear goal: becoming a Data Scientist who builds models and systems that hold up against real problems.',

  story: [
    'My path into technology started with programming, and it quickly became clear that the part I enjoy most is what happens when code meets data. Studying Computer Science at UTP has given me the foundations — algorithms, software development, and mathematical thinking — and I use them to explore Data Science, Machine Learning and Artificial Intelligence.',
    'I am most interested in the full journey from raw data to a decision: cleaning and understanding a dataset, finding the patterns worth trusting, building a predictive model, and judging honestly whether it actually works. Statistics keeps that process grounded; machine learning extends what it can do.',
    'Much of my learning happens by building. Hackathons and technology competitions push me to scope a real problem, work with a team under pressure, and ship something that can be demonstrated — from electricity theft detection to retrieval-augmented assistants. I treat every project as a chance to learn one more thing properly.',
  ],

  blocks: [
    {
      id: 'ambition',
      title: 'Ambition',
      icon: 'target',
      body: 'Grow into a Data Scientist who combines statistical rigour, machine learning, and solid engineering to deliver insight that people can act on.',
    },
    {
      id: 'focus',
      title: 'Focus areas',
      icon: 'brain',
      body: 'Machine Learning, statistical analysis, Natural Language Processing and applied Generative AI.',
    },
    {
      id: 'competitions',
      title: 'Competitions',
      icon: 'zap',
      body: 'I enjoy hackathons and technology challenges because they are where I learn fastest — two of which have ended on the podium.',
    },
  ],

  principles: [
    {
      title: 'Start with the problem',
      body: 'Understand who is affected and what a useful answer looks like before choosing a model.',
    },
    {
      title: 'Respect the data',
      body: 'Most of the work is cleaning, exploring and questioning the data. Shortcuts here show up later.',
    },
    {
      title: 'Measure honestly',
      body: 'Pick evaluation metrics that match the real cost of being wrong, and report them as they are.',
    },
    {
      title: 'Keep learning in public',
      body: 'Build, share, take feedback, iterate. Every project leaves me with a sharper toolkit.',
    },
  ],
};
