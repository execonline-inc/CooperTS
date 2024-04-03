import * as React from 'react';

interface Props {
  text: string;
}

// Trying to force this to publish a new version
const NotTranslated: React.FC<Props> = ({ text }) => <>{text}</>;

export default NotTranslated;
