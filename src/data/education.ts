import type { Education } from './types';

/** Newest first. Details from your resume; null = not provided yet. */
export const education: Education[] = [
  {
    id: 'utp-bcs',
    institution: 'Universiti Teknologi PETRONAS',
    shortName: 'UTP',
    programme: 'Computer Science',
    degree: 'Bachelor of Computer Science (Hons)',
    location: 'Malaysia',
    studyPeriod: '2025 — Present', // e.g. '2025 — Present'
    expectedGraduation: '2028',
    cgpa: '3.78',
    coursework: [], // e.g. ['Database Systems', 'Data Structures & Algorithms', 'Probability & Statistics']
    achievements: ["Dean's List"], // e.g. ["Dean's List — Semester 2"]
  },
  {
    id: 'utp-foundation',
    institution: 'Universiti Teknologi PETRONAS',
    shortName: 'UTP · CFS',
    programme: 'Foundation in Computer Science',
    degree: 'Foundation in Computer Science',
    location: 'Malaysia',
    studyPeriod: 'Completed',
    expectedGraduation: null,
    cgpa: '3.72 - Dean\'s List',
    coursework: [],
    achievements: [],
  },
];
