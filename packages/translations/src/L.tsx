import { observer } from 'mobx-react';
import * as React from 'react';
import { localizer } from './localizations';
import TranslationsContext from './TranslationsContext';
import { LocalizationFormat, Localizeable } from './types';

export interface Props {
  localizeable: Localizeable;
  format: LocalizationFormat;
}

const L: React.SFC<Props> = ({ localizeable, format }) => (
  <TranslationsContext.Consumer>{localizer(localizeable, format)}</TranslationsContext.Consumer>
);

export default observer(L);
