import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig } from 'framer-motion';
import App from './App';
import { designStyle } from './data/theme';
import './styles/global.css';
import './styles/theme-spider.css';

// Activate the chosen design (see src/data/theme.ts).
document.documentElement.dataset.style = designStyle;
if (designStyle === 'spider') {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Anton&family=Bangers&display=swap';
  document.head.appendChild(link);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </StrictMode>,
);