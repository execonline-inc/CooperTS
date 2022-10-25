import { GetStaticProps, NextPage } from 'next';
import clsx from 'clsx';
import Head from 'next/head';
import Link from 'next/link';
import Task from 'taskarian';
import { taskToStaticProps, WithNavTree, withNavTreeStaticProp } from '../Types/NavTree';
import { pipe } from '@kofno/piper';
import CardLinks from '../components/CardLinks';

interface Props {}

/*
'absolute -inset-px rounded-xl border-2 border-transparent opacity-0',
                'gradient-border',
                '[--link-grid-hover-bg:theme(colors.slate.50)]',
                'dark:[--link-grid-hover-bg:theme(colors.slate.800)]',
                'group-hover:opacity-100'
*/
const Home: NextPage<Props> = () => {
  return (
    <div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16">
      <Head>
        <title>CooperTS</title>
        <meta name="description" content="Documentation for CooperTS by ExecOnline" />
      </Head>

      <main>
        <h1 className="text-xl text-sky-500 md:text-2xl lg:text-3xl">Welcome to CooperTS</h1>

        <CardLinks />
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<WithNavTree<Props>> = pipe(
  (_context) => Task.succeed({}),
  withNavTreeStaticProp,
  taskToStaticProps
);

export default Home;
