import { Header } from '../components/Header/Header';
import type { AppProps } from 'next/app';
import * as React from 'react';
import '../styles/globals.css';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <>
          <Header />
          <main className='container'>
            <Component {...pageProps} />
          </main>
        </>
    )
    
};

export default App;
