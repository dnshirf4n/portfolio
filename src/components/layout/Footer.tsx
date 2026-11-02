import { profile } from '../../data/profile';
import { SocialLinks } from '../ui/SocialLinks';
import { navItems } from './nav';
import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brandCol}>
          <p className={styles.statement}>
            Turning data into <span className="serif">intelligence.</span>
            <br />
            Building AI that <span className="serif">matters.</span>
          </p>
          <SocialLinks />
        </div>
        <nav aria-label="Footer" className={styles.navCol}>
          <ul role="list" className={styles.links}>
            {navItems.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`}>{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className={`container ${styles.bottom}`}>
        <p>
          © {year} {profile.name}. {profile.location}.
        </p>
        <p className={styles.mono}>Designed & built with React, TypeScript and a lot of curiosity.</p>
      </div>
    </footer>
  );
}
