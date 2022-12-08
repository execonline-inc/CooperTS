import * as React from 'react';
import Head from 'next/head';

interface Props {
  title: string;
}

const PageTitle: React.FC<Props> = ({ title }) => (
  <Head>
    <title>{title} | CooperTS</title>
  </Head>
);

export default PageTitle;
