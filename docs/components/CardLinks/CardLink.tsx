import clsx from 'clsx';
import Link from 'next/link';
import * as React from 'react';

interface Props {
  href: string;
  title: string;
  subtitle: string;
}

const CardLink: React.FC<Props> = ({ href, title, subtitle }) => (
  <div
    className={clsx('group relative rounded-xl border border-slate-200', 'dark:border-slate-800')}
  >
    <div
      className={clsx(
        'absolute -inset-px rounded-xl border-2 border-transparent opacity-0',
        '[background:var(--tileGradient)]',
        'group-hover:opacity-100 dark:[background:var(--tileGradientDark)]'
      )}
    />
    <div className="relative overflow-hidden rounded-xl p-6">
      <Link
        href={href}
        className="relative overflow-hidden rounded-xl p-6"
        aria-label={title}
        aria-describedby="grid-learn-desc"
      >
        <h2
          className={clsx('inline-flex font-display text-base text-slate-900', ' dark:text-white')}
          aria-label={title}
        >
          <span className="absolute -inset-px rounded-xl" />
          {title}{' '}
          <span className="ml-3 text-amber-500" aria-hidden="true">
            <i className="fa fas fa-arrow-right"></i>
          </span>
        </h2>
      </Link>
      <p id="grid-learn-desc" className="mt-1 text-sm text-slate-700 dark:text-slate-400">
        {subtitle}
      </p>
    </div>
  </div>
);

export default CardLink;
