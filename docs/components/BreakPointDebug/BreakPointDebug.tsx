import * as React from 'react';
import clsx from 'clsx';

const BreakPointDebug: React.FC = () =>
  process.env.NODE_ENV === 'production' ? (
    <></>
  ) : (
    <div
      className={clsx(
        'fixed bottom-0 right-0 z-[10000] flex h-auto w-auto items-center justify-center',
        'p-1  text-sm font-bold text-white dark:text-slate-900',

        'rounded-full',
        'bg-slate-800 sm:bg-red-900 md:bg-blue-800 lg:bg-green-800 xl:bg-amber-600',
      )}
    >
      <div className={clsx('inline-flex sm:hidden')}>xs (default)</div>
      <div className={clsx('hidden sm:inline-flex md:hidden')}>SM</div>
      <div className={clsx('hidden md:inline-flex lg:hidden')}>MD</div>
      <div className={clsx('hidden lg:inline-flex xl:hidden')}>LG</div>
      <div className={clsx('hidden xl:inline-flex')}>XL</div>
    </div>
  );

export default BreakPointDebug;
