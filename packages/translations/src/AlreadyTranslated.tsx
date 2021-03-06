import { observer } from 'mobx-react';
import * as React from 'react';
import { AlreadyTranslatedText } from './types';

interface Props {
  content: AlreadyTranslatedText;
}

const AlreadyTranslated: React.FC<Props> = ({ content }) => <>{content.text}</>;

export default observer(AlreadyTranslated);
