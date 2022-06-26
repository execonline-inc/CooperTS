import Link from 'next/link';
import styles from './Header.module.scss';

export const Header = () => (
  <header className={styles.header}>
    <nav>
      <ul className={styles.navItems}>
        <li>
          <Link href="/">CooperTS</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/start">Getting Started</Link>
        </li>
        <li>
          <Link href="/guide">Guide</Link>
        </li>
        <li>
          <Link href="/examples">Examples</Link>
        </li>
      </ul>
    </nav>
  </header>
);
