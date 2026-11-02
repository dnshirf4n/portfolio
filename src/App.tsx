import { BackToTop } from './components/layout/BackToTop';
import { Footer } from './components/layout/Footer';
import { Loader } from './components/layout/Loader';
import { Navbar } from './components/layout/Navbar';
import { About } from './components/sections/About';
import { Achievements } from './components/sections/Achievements';
import { Beyond } from './components/sections/Beyond';
import { Contact } from './components/sections/Contact';
import { Education } from './components/sections/Education';
import { Experience } from './components/sections/Experience';
import { Exploring } from './components/sections/Exploring';
import { Hero } from './components/sections/Hero';
import { Leadership } from './components/sections/Leadership';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { Stats } from './components/sections/Stats';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { theme, toggle } = useTheme();
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Loader />
      <Navbar theme={theme} onToggleTheme={toggle} />
      <main id="main">
        <Hero />
        <Stats />
        <About />
        <Skills />
        <Exploring />
        <Projects />
        <Experience />
        <Achievements />
        <Leadership />
        <Education />
        <Beyond />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
