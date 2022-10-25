import { pipe } from '@kofno/piper';
import { GetStaticProps, NextPage } from 'next';
import Task from 'taskarian';
import PageTitle from '../components/PageTitle';
import { taskToStaticProps, WithNavTree, withNavTreeStaticProp } from '../Types/NavTree';

interface Props {}

const ErrorPage: NextPage<Props> = () => (
  <>
    <PageTitle title="Page Not Found" />
    <h1>404 - Page Not Found</h1>
  </>
);

export const getStaticProps: GetStaticProps<WithNavTree<Props>> = pipe(
  (_context) => Task.succeed({}),
  withNavTreeStaticProp,
  taskToStaticProps
);

export default ErrorPage;
