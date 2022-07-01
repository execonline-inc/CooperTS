import * as React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

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
        <Link href="/">
          <a
            className={clsx(
              'text-base font-bold text-green-600 hover:text-indigo-900',
              'dark:text-green-300 dark:hover:text-indigo-300 sm:text-lg'
            )}
          >
            CooperTS
          </a>
        </Link>
        <nav className={`md:text-md flex space-x-5 text-sm sm:space-x-10 sm:text-sm`}>
          <Link href="/about">
            <a
              className={clsx(
                'font-medium text-gray-600 hover:text-gray-900',
                'dark:text-gray-300 dark:hover:text-white'
              )}
            >
              About
            </a>
          </Link>
          <Link href="/start">
            <a
              className={clsx(
                'font-medium text-gray-600 hover:text-gray-900',
                'dark:text-gray-300 dark:hover:text-white'
              )}
            >
              Getting Started
            </a>
          </Link>
          <Link href="/guide">
            <a
              className={clsx(
                'font-medium text-gray-600 hover:text-gray-900',
                'dark:text-gray-300 dark:hover:text-white'
              )}
            >
              Guide
            </a>
          </Link>
          <Link href="/packages">
            <a
              className={clsx(
                'font-medium text-gray-600 hover:text-gray-900',
                'dark:text-gray-300 dark:hover:text-white'
              )}
            >
              Packages
            </a>
          </Link>
          <Link href="/examples">
            <a
              className={clsx(
                'font-medium text-gray-600 hover:text-gray-900',
                'dark:text-gray-300 dark:hover:text-white'
              )}
            >
              Examples
            </a>
          </Link>
          <Link href="https://github.com/execonline-inc/CooperTS" target={'_blank'}>
            <a className="group">
              <span className="sr-only">CooperTS on GitHub</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                className={clsx(
                  'h-6 w-6 fill-slate-500 group-hover:fill-slate-700',
                  'dark:fill-slate-300 dark:group-hover:fill-white'
                )}
              >
                <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" />
              </svg>
            </a>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;