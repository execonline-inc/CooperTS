import * as React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import ItemLink from './ItemLink';
import GithubIcon from '../GithubIcon';

const Header: React.FC = () => {
  let [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 0);
    }
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <header
      className={clsx(
        'not-prose sticky top-0 z-50',
        'flex items-center justify-between',
        'space-x-6 bg-white',
        'py-3 shadow-md shadow-slate-900/5 transition',
        'duration-500 dark:shadow-none sm:space-x-10 sm:py-4',
        'md:py-5',
        {
          'dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75] dark:bg-slate-900/95 dark:backdrop-blur': isScrolled,
          'dark:bg-transparent': !isScrolled,
        }
      )}
    >
      <div
        className={clsx(
          'content-container-width mx-auto py-3',
          'flex items-center justify-between space-x-6'
        )}
      >
        <Link
          href="/"
          className={clsx(
            'text-base font-bold text-green-600 hover:text-indigo-900',
            'dark:text-green-300 dark:hover:text-indigo-300 sm:text-lg'
          )}
        >
          CooperTS
        </Link>
        <nav
          className={`md:text-md flex items-center space-x-5 text-sm sm:space-x-10 sm:text-sm`}
          aria-label="Primary"
        >
          <ItemLink href={'/about'}>About</ItemLink>
          <ItemLink href={'/guide'}>Guide</ItemLink>
          <ItemLink href={'/examples'}>Examples</ItemLink>
          <ItemLink href={'/faq'}>FAQs</ItemLink>
          <ItemLink href={'/packages'}>Packages</ItemLink>
          <Link
            href="https://github.com/execonline-inc/CooperTS"
            target={'_blank'}
            className="group"
          >
            <span className="sr-only">CooperTS on GitHub</span>
            <GithubIcon />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
