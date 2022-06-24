import { warn } from '@execonline-inc/logging';
import * as React from 'react';
import TranslationsContext from './TranslationsContext';
import { Loader, TranslationsState } from './types';

interface Props {
  loader: Loader;
  loading: React.ReactElement;
  children: React.ReactNode;
}

interface State {
  translations: TranslationsState;
}

const impl = (
  ts: TranslationsState,
  children: React.ReactNode,
  loading: React.ReactElement
): React.ReactNode => {
  switch (ts.kind) {
    case 'loaded':
    case 'loaded-from-fallback':
      return children || <></>;
    case 'uninitialized':
      return loading;
  }
};

class TranslationsLoader extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      translations: { kind: 'uninitialized' },
    };
  }

  componentDidMount() {
    this.props.loader.fork(
      loadedFromFallback => {
        warn(`Translations: ${loadedFromFallback.error}. Falling back to default language.`);
        this.setState({ translations: loadedFromFallback });
      },
      loaded => this.setState({ translations: loaded })
    );
  }

  render() {
    return (
      <TranslationsContext.Provider value={this.state.translations}>
        {impl(this.state.translations, this.props.children, this.props.loading)}
      </TranslationsContext.Provider>
    );
  }
}

export default TranslationsLoader;
