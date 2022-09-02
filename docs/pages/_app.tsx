import clsx from 'clsx';
import type { AppProps } from 'next/app';
import * as React from 'react';
import BreakPointDebug from '../components/BreakPointDebug/BreakPointDebug';
import { Footer } from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { requireDecoderDuringBuild } from '../RequireDecoderDuringBuild';
import '../styles/globals.css';
import { navTreeDecoder } from '../Types/NavTree/Decoder';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  // TODO: render the navTree
  const navTree = requireDecoderDuringBuild(navTreeDecoder)(pageProps.navTree);
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
