import Header from '../components/Header/Header';
import clsx from 'clsx';
import { Footer } from '../components/Footer/Footer';
import type { AppProps } from 'next/app';
import * as React from 'react';
import '../styles/globals.css';
import BreakPointDebug from '../components/BreakPointDebug/BreakPointDebug';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div className="flex h-screen w-screen flex-col justify-between scroll-smooth">
      <Header />
      <main
        className={clsx(
          'fixed-origin',
          'content-container-width',
          'relative mx-auto flex flex-col justify-center'
        )}
      >
        <Component {...pageProps} />
      </main>
      <BreakPointDebug />
      <Footer />
    </div>
  );
};

export default App;
