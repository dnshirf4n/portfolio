import type { Achievement } from './types';

/**
 * Achievements, awards & certifications. Newest first.
 * Certificate images go in /public/images/certificates/ (WebP or JPG, ~1600px wide).
 */
export const achievements: Achievement[] = [
  {
    id: 'hackspire-lumina-2026',
    event: 'HACKSPIRE LUMINA 2026',
    award: 'Champion',
    placing: 1,
    year: '2026',
    organiser: 'Universiti Tenaga Nasional (UNITEN)',
    description:
      'Champion of Hackspire Lumina 2026 at Universiti Tenaga Nasional (UNITEN), 27–29 October 2026, with Team F-35 from Universiti Teknologi PETRONAS. We competed in the preliminary round, were selected as one of the Top 5 finalists, and won first place in the final pitch to the judges. Our solution, VoltGuard AI, detects electricity theft for TNB. It compares the energy each transformer supplies with what the customer meters bill, uses voltage to locate where a cable is tapped, and ranks the houses to inspect first, each with a plain-language reason. The prototype also includes an offline app for field inspectors, a dispatch assistant and two-approval case reports.',
    relatedProject: 'voltguard-ai',
    certificate: { src: '/images/hackspire-lumina-2026.jpeg', alt: 'HACKSPIRE LUMINA 2026' },
    links: [],
  },
  {
    id: 'aws-genai-hackathon-2026',
    event: 'AWS x GenAI Hackathon 2026',
    award: '2nd Runner-Up (Third Prize)',
    placing: 3,
    year: '2026',
    organiser: 'Universiti Teknologi PETRONAS (UTP)',
    description: 'Secured third prize in the AWS x GenAI Hackathon, showcasing innovative use of generative AI solutions.',
    relatedProject: null,
    certificate: { src: '/images/aws-genai.jpeg', alt: 'AWS x GenAI Hackathon 2026' },
    links: [],
  },
  {
    id: 'mjic-2026',
    event: 'Malaysia-Japan International Conference (MJIC) on Nanoscience, Nanotechnology & Nanoengineering 2026',
    award: 'Silver Award',
    placing: null,
    medal: 'silver',
    year: '2026',
    organiser: null,
    description: null,
    relatedProject: null,
    certificate: { src: '/images/mjic.jpeg', alt: 'Malaysia-Japan International Conference 2026' },
    links: [],
  },
  {
    id: 'nexpert-ai-ml',
    event: 'AI and Machine Learning',
    award: 'Certification',
    placing: null,
    year: '2026',
    organiser: 'Nexpert Academy',
    description:
      'Covered exploratory data analysis, data wrangling, supervised and unsupervised machine learning, and deploying models as Streamlit web apps.',
    relatedProject: 'nexpert-ml-projects',
    certificate: { src: '/images/ml.jpeg', alt: 'Nexpert Academy AI and Machine Learning Certification' },
    links: [],
  },
];
