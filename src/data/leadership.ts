import type { LeadershipRole } from './types';

/**
 * Leadership & extracurricular activities.
 * `competencies` are the strengths each role demonstrates; edit freely.
 */
export const leadership: LeadershipRole[] = [
  {
    id: 'gdsc-utp-media',
    role: 'Head of Media Department',
    organisation: 'Google Developer Student Clubs (GDSC UTP)',
    period: 'Since Sept 2026',
    icon: 'users',
    description:
      'Direct day-to-day media operations and manage cross-functional creative teams, taking multimedia campaigns from concept to final delivery.',
    highlights: ['Run strategic media initiatives with consistent brand alignment and content performance across channels'],
    competencies: ['Leadership', 'Team management', 'Communication'],
  },
  {
    id: 'oweek-2026',
    role: 'Assistant Head of Video Department',
    organisation: 'Orientation Week (OWEEK), UTP',
    period: 'May 2026',
    icon: 'video',
    description: 'Worked with the event committee to plan, shoot and edit the official orientation videos for new students.',
    highlights: ['Operated cameras, lighting and editing software (Adobe Premiere Pro, DaVinci Resolve)'],
    competencies: ['Team collaboration', 'Communication', 'Creative production'],
  },
  {
    id: 'oh-my-code',
    role: 'Project Leader',
    organisation: 'Oh My Code (OMC) — Empowering Income Through Digital Innovation, UTP',
    period: 'May — Jul 2025',
    icon: 'lightbulb',
    description:
      'Led a team of 7 to design and develop an application that helps people generate income through digital solutions.',
    highlights: [
      'Oversaw project planning, task delegation and technical development in Visual Basic',
      'Presented the app’s features, business model and potential impact to competition judges',
      'Placed 9th out of 24 teams in the OMC Competition 2025',
    ],
    competencies: ['Leadership', 'Project management', 'Initiative'],
  },
];

/** The strengths highlighted alongside the timeline. */
export const leadershipThemes = [
  { title: 'Leadership', body: 'Leading projects and hackathon teams from idea to delivery.' },
  { title: 'Team collaboration', body: 'Working across committees and multidisciplinary teams.' },
  { title: 'Communication', body: 'Mentoring, presenting and explaining ideas clearly.' },
  { title: 'Problem-solving', body: 'Breaking ambiguous challenges into workable steps.' },
  { title: 'Project management', body: 'Planning scope, roles and timelines.' },
  { title: 'Initiative', body: 'Starting things, not just joining them.' },
];
