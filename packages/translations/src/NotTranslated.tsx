import { observer } from 'mobx-react';
import * as React from 'react';

interface Props {
  text: string;
}

const NotTranslated: React.FC<Props> = ({ text }) => <>{text}</>;

export default observer(NotTranslated);
