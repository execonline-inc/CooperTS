import { pipe } from '@kofno/piper';
import { GetStaticProps, NextPage } from 'next';
import { Task } from 'taskarian';
import { WithNavTree, taskToStaticProps, withNavTreeStaticProp } from '../Types/NavTree';

interface Props {}

const ErrorPage: NextPage<Props> = () => <h1>500 - Server-side error occurred</h1>;

export const getStaticProps: GetStaticProps<WithNavTree<Props>> = pipe(
  (_context) => Task.succeed({}),
  withNavTreeStaticProp,
  taskToStaticProps
);

export default ErrorPage;
