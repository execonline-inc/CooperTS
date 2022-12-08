import { pipe } from '@kofno/piper';
import { GetStaticProps, NextPage } from 'next';
import Task from 'taskarian';
import PageTitle from '../components/PageTitle';
import { taskToStaticProps, WithNavTree, withNavTreeStaticProp } from '../Types/NavTree';

interface Props {}

const Examples: NextPage<Props> = () => (
  <>
    <PageTitle title="Examples" />
    <div className="prose dark:prose-invert">
      <h1>Examples</h1>
      <h2>Task Manager App</h2>
      <img src="/images/task_manager_app.png" />
      <p>A Kanban-style task manager.</p>
      <ul>
        <li>
          <a href="https://codesandbox.io/embed/dawn-cookies-yhsxo9">
            Running demo with editable code
          </a>
        </li>
        <li>
          <a href="https://github.com/edmondthui/cooperts-example">Code on GitHub</a>
        </li>
      </ul>

      <h2>Cellular Automata Emulator</h2>
      <img src="/images/cellular_automata.png" />
      <p>An emulator written with NextJS & CooperTS.</p>
      <ul>
        <li>
          <a href="https://discover-automata.vercel.app/">Running site</a>
        </li>
        <li>
          <a href="https://github.com/spejamchr/discover-automata">Code on GitHub</a>
        </li>
      </ul>

      <h2>This Doc Site 😁</h2>
      <p>Written with NextJS & CooperTS.</p>
      <ul>
        <li>
          <a href="https://github.com/execonline-inc/CooperTS/tree/main/docs">Code on GitHub</a>
        </li>
      </ul>
    </div>
  </>
);

export const getStaticProps: GetStaticProps<WithNavTree<Props>> = pipe(
  (_context) => Task.succeed({}),
  withNavTreeStaticProp,
  taskToStaticProps,
);

export default Examples;
