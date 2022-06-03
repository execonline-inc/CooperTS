import type { AppProps } from 'next/app';
import * as React from 'react';
import '../styles/globals.css';

const App: React.FC<AppProps> = ({ Component, pageProps }) => <Component {...pageProps} />;

export default App;
