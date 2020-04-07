import * as React from 'react';
import { TranslationsState } from './types';

const TranslationsContext = React.createContext<TranslationsState>({ kind: 'uninitialized' });

export default TranslationsContext;
