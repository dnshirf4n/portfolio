import type { ExploringItem, SkillCategory } from './types';

/**
 * Technical skills, grouped by category.
 * To add a technology: append a string to the relevant `skills` array.
 * To add a category: add a new object (pick an `icon` from IconName in types.ts).
 * No proficiency ratings by design — the projects section is the evidence.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: 'ml',
    title: 'Data Science & Machine Learning',
    icon: 'brain',
    description: 'The end-to-end modelling workflow, from raw data to evaluated model.',
    size: 'wide',
    skills: [
      'Exploratory Data Analysis',
      'Data Cleaning',
      'Data Preprocessing',
      'Feature Engineering',
      'Statistical Analysis',
      'Classification',
      'Regression',
      'Clustering',
      'K-Means',
      'Model Evaluation',
      'Scikit-learn',
      'XGBoost',
      'LightGBM',
    ],
  },
  {
    id: 'programming',
    title: 'Programming',
    icon: 'code',
    description: 'Python and SQL for data work, plus Java and C++ from my CS foundations.',
    skills: ['Python', 'SQL', 'Java', 'C++'],
  },
  {
    id: 'manipulation',
    title: 'Data Manipulation',
    icon: 'table',
    description: 'Wrangling, reshaping and computing over datasets.',
    skills: ['Pandas', 'NumPy'],
  },
  {
    id: 'viz',
    title: 'Analytics & Visualization',
    icon: 'chart',
    description: 'Communicating patterns and insight clearly.',
    skills: ['Microsoft Excel', 'Power BI', 'Tableau', 'Matplotlib', 'Seaborn'],
  },
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    icon: 'sparkles',
    description: 'Language and generative models applied to real problems.',
    skills: ['Machine Learning', 'Natural Language Processing', 'Generative AI', 'Large Language Models'],
  },
  {
    id: 'tools',
    title: 'Development Tools',
    icon: 'wrench',
    description: 'Shipping models and prototypes as usable software.',
    size: 'wide',
    skills: ['Git', 'GitHub', 'FastAPI', 'Streamlit', 'Firebase', 'Docker'],
  },
];

/**
 * "Currently Exploring" — topics you are actively learning.
 * These are presented as learning goals, not expertise.
 */
export const currentlyExploring: ExploringItem[] = [
  { topic: 'Advanced Machine Learning', note: 'Going beyond the defaults: ensembles, tuning and validation strategy.' },
  { topic: 'Deep Learning', note: 'Neural network fundamentals and when they are worth the cost.' },
  { topic: 'Statistical Modelling', note: 'Inference, assumptions and quantifying uncertainty.' },
  { topic: 'Time Series Analysis', note: 'Trend, seasonality and forecasting temporal data.' },
  { topic: 'Feature Engineering', note: 'Turning domain knowledge into signals a model can use.' },
  { topic: 'Model Interpretability', note: 'Explaining why a model makes the predictions it does.' },
  { topic: 'MLOps', note: 'Versioning, deploying and monitoring models after training.' },
];
