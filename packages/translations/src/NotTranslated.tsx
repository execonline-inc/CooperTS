import * as React from 'react';

interface Props {
  text: string;
}

const NotTranslated: React.FC<Props> = ({ text }) => <>{text}</>;

export default NotTranslated;
