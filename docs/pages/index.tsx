import { NextPage } from 'next';
import clsx from 'clsx';
import Head from 'next/head';
import Link from 'next/link';

/*
'absolute -inset-px rounded-xl border-2 border-transparent opacity-0',
                'gradient-border',
                '[--link-grid-hover-bg:theme(colors.slate.50)]',
                'dark:[--link-grid-hover-bg:theme(colors.slate.800)]',
                'group-hover:opacity-100'
*/
const Home: NextPage = () => {
  return (
    <div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16">
      <Head>
        <title>CooperTS</title>
        <meta name="description" content="Documentation for CooperTS by ExecOnline" />
      </Head>

      <main>
        <h1 className="text-xl text-sky-500 md:text-2xl lg:text-3xl">Welcome to CooperTS</h1>

        <div className="not-prose my-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div
            className={clsx(
              'group relative rounded-xl border border-slate-200 dark:border-slate-800'
            )}
          >
            <div
              className={clsx(
                'absolute -inset-px rounded-xl border-2 border-transparent opacity-0',
                '[background:var(--tileGradient)]',
                'group-hover:opacity-100 dark:[background:var(--tileGradientDark)]'
              )}
            />
            <div className="relative overflow-hidden rounded-xl p-6">
              <Link href="doc/1" className="relative overflow-hidden rounded-xl p-6">
                <a href="#" aria-label="Documentation" aria-describedby="grid-docs-desc">
                  <h2
                    className="inline-flex font-display text-base text-slate-900 dark:text-white"
                    aria-label="Documentation"
                  >
                    <span className="absolute -inset-px rounded-xl" />
                    Documentation{' '}
                    <span className="ml-3 text-amber-500" aria-hidden="true">
                      <i className="fa fas fa-arrow-right"></i>
                    </span>
                  </h2>
                </a>
              </Link>

              <p id="grid-docs-desc" className="mt-1 text-sm text-slate-700 dark:text-slate-400">
                In-depth information on CooperTS features and API
              </p>
            </div>
          </div>

          <div
            className={clsx(
              'group relative rounded-xl border border-slate-200',
              'dark:border-slate-800'
            )}
          >
            <div
              className={clsx(
                'absolute -inset-px rounded-xl border-2 border-transparent opacity-0',
                '[background:var(--tileGradient)]',
                'group-hover:opacity-100 dark:[background:var(--tileGradientDark)]'
              )}
            />
            <div className="relative overflow-hidden rounded-xl p-6">
              <Link href="#" className="relative overflow-hidden rounded-xl p-6">
                <a href="#" aria-label="Learn" aria-describedby="grid-learn-desc">
                  <h2
                    className={clsx(
                      'inline-flex font-display text-base text-slate-900',
                      ' dark:text-white'
                    )}
                    aria-label="Learn"
                  >
                    <span className="absolute -inset-px rounded-xl" />
                    Learn{' '}
                    <span className="ml-3 text-amber-500" aria-hidden="true">
                      <i className="fa fas fa-arrow-right"></i>
                    </span>
                  </h2>
                </a>
              </Link>

              <p id="grid-learn-desc" className="mt-1 text-sm text-slate-700 dark:text-slate-400">
                Learn about CooperTS in an interactive course
              </p>
            </div>
          </div>

          <div
            className={clsx(
              'group relative rounded-xl border border-slate-200',
              'dark:border-slate-800'
            )}
          >
            <div
              className={clsx(
                'absolute -inset-px rounded-xl border-2 border-transparent opacity-0',
                '[background:var(--tileGradient)]',
                'group-hover:opacity-100 dark:[background:var(--tileGradientDark)]'
              )}
            />
            <div className="relative overflow-hidden rounded-xl p-6">
              <Link href="#" className="relative overflow-hidden rounded-xl p-6">
                <a href="#" aria-label="Examples" aria-describedby="grid-examples-desc">
                  <h2
                    className="inline-flex font-display text-base text-slate-900 dark:text-white"
                    aria-label="Examples"
                  >
                    <span className="absolute -inset-px rounded-xl" />
                    Examples{' '}
                    <span className="ml-3 text-amber-500" aria-hidden="true">
                      <i className="fa fas fa-arrow-right"></i>
                    </span>
                  </h2>
                </a>
              </Link>

              <p
                id="grid-examples-desc"
                className="mt-1 text-sm text-slate-700 dark:text-slate-400"
              >
                Discover boilerplate example CooperTS projects
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
