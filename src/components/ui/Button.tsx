import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'sm';

interface Common {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconRight?: ReactNode;
  children: ReactNode;
  className?: string;
}

type AsLink = Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type AsButton = Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export function Button(props: AsLink | AsButton) {
  const { variant = 'primary', size = 'md', icon, iconRight, children, className = '', ...rest } = props;
  const cls = `${styles.btn} ${styles[variant]} ${styles[size]} ${className}`;
  const inner = (
    <>
      {icon && <span className={styles.icon}>{icon}</span>}
      <span>{children}</span>
      {iconRight && <span className={`${styles.icon} ${styles.iconRight}`}>{iconRight}</span>}
    </>
  );
  if ('href' in rest && rest.href !== undefined) {
    return (
      <a className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {inner}
      </a>
    );
  }
  return (
    <button className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {inner}
    </button>
  );
}
