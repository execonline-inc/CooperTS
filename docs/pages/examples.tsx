import { pipe } from '@kofno/piper';
import { GetStaticProps, NextPage } from 'next';
import Task from 'taskarian';
import { taskToStaticProps, WithNavTree, withNavTreeStaticProp } from '../Types/NavTree';

interface Props {}

const Examples: NextPage<Props> = () => (
  <>
    <div className="example">
      <h2>Task Manager App</h2>
      <iframe
        src="https://codesandbox.io/embed/dawn-cookies-yhsxo9?fontsize=14&hidenavigation=1&theme=dark"
        style={{
          width: '100%',
          height: '700px',
          border: '0',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
        title="Task Manager App"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>
    </div>
  </>
);

export const getStaticProps: GetStaticProps<WithNavTree<Props>> = pipe(
  (_context) => Task.succeed({}),
  withNavTreeStaticProp,
  taskToStaticProps
);

export default Examples;
