import { pipe } from '@kofno/piper';
import { GetStaticProps, NextPage } from 'next';
import Task from 'taskarian';
import PageTitle from '../components/PageTitle';
import { taskToStaticProps, WithNavTree, withNavTreeStaticProp } from '../Types/NavTree';

interface Props {}

const About: NextPage<Props> = () => (
  <>
    <PageTitle title="About" />
    <div>About</div>
  </>
);

export const getStaticProps: GetStaticProps<WithNavTree<Props>> = pipe(
  (_context) => Task.succeed({}),
  withNavTreeStaticProp,
  taskToStaticProps
);

export default About;
