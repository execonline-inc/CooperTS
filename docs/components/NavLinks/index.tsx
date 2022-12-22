import clsx from 'clsx';
import { observer } from 'mobx-react';
import Link from 'next/link';
import { NavTree } from '../../Types/NavTree/Types';

interface Props {
  navTree: NavTree;
}

const NavLinks: React.FC<Props> = ({ navTree }) => (
  <div className={clsx('not-prose relative ml-4 max-w-xs')}>
    <div
      className={clsx(
        'sticky top-[4.5rem] -ml-0.5 h-[calc(100vh-4.5rem)]',
        'overflow-y-auto py-16 pl-0.5',
      )}
    >
      <nav className={clsx('w-64 pr-8 text-base lg:text-sm xl:w-72 xl:pr-16')}>
        <ul className={clsx('space-y-9')}>
          {navTree.map((section) => (
            <li
              key={section.title}
              className={clsx('font-display font-medium text-slate-900 dark:text-white')}
            >
              <Link href={section.href}>
                <a>{section.title}</a>
              </Link>
              <ul
                className={clsx(
                  'not-prose lg:border-slate-20',
                  'mt-6 space-y-2 border-l-2',
                  'border-slate-100 dark:border-slate-800',
                  'lg:mt-4 lg:space-y-4',
                )}
              >
                {section.links.map((link) => (
                  <li key={link.title} className={clsx('relative')}>
                    <Link href={link.href}>
                      <a
                        className={clsx(
                          'block w-full pl-3.5',
                          'text-slate-500',
                          'before:pointer-events-none before:absolute before:-left-1',
                          'before:top-1/2 before:hidden before:h-1.5 before:w-1.5',
                          'before:-translate-y-1/2 before:rounded-full',
                          'before:bg-slate-300 hover:text-slate-600',
                          'hover:before:block dark:text-slate-400',
                          'dark:before:bg-slate-700 dark:hover:text-slate-300',
                        )}
                      >
                        {link.title}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </div>
);

export default observer(NavLinks);
