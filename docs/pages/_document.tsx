import { Html, Head, Main, NextScript } from 'next/document';
import clsx from 'clsx';
import BreakPointDebug from '../components/BreakPointDebug/BreakPointDebug';

const Document: React.FC = () => (
  <Html className="dark js-focus-visible antialiased [font-feature-settings:'ss01']" lang="en">
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&display=swap"
        rel="stylesheet"
      />
    </Head>
    <body
      className={clsx(
        'prose prose-slate',
        'bg-white prose-lead:text-slate-500 prose-a:font-bold prose-a:no-underline',
        'prose-a:text-sky-500',
        'max-w-full',
        'prose-a:shadow-[inset_0_17px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,4px)+2px))_0_0_var(--tw-prose-underline,theme(colors.sky.300))]',
        'hover:prose-a:[--tw-prose-underline-size:6px]',
        'dark:prose-invert dark:bg-slate-900 dark:text-slate-400',
        'dark:[--tw-prose-background:theme(colors.slate.900)]',
        'dark:prose-lead:text-slate-400 dark:prose-a:text-sky-400',
        'dark:prose-a:shadow-[var(--darkProseAShadow)]',
        'dark:hover:prose-a:[--tw-prose-underline-size:3px]',
        'dark:prose-hr:border-slate-800'
      )}
    >
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
