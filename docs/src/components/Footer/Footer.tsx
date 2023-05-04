import clsx from 'clsx';

export const Footer = () => {
  return (
    <footer
      className={clsx(`not-prose sticky top-0 z-50 
        flex flex-wrap items-center justify-between
        bg-white
        py-5 px-4 shadow-md
        shadow-slate-900/5 
        dark:bg-slate-900/95 dark:shadow-none
        sm:px-6 lg:px-8`)}
      aria-label="footer"
    >
      <p>
        © {new Date().getFullYear() + ' '}
        <a href="https://www.execonline.com/" target="_blank" rel="noopener noreferrer">
          ExecOnline
        </a>
      </p>
    </footer>
  );
};
