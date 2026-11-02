import { experience } from '../../data/experience';

const all = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'achievements', label: 'Awards' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

/** Menu links. The Experience link is hidden while experience.ts is empty. */
export const navItems = all.filter((item) => item.id !== 'experience' || experience.length > 0);
