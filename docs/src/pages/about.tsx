import { pipe } from '@kofno/piper';
import { GetStaticProps, NextPage } from 'next';
import Task from 'taskarian';
import Markdown from '../components/Markdown';
import PageTitle from '../components/PageTitle';
import { ReadFileError, readFileT } from '../GetPackages/filesystem';
import { SafeMarkdown, unsafeMarkdownFromContent } from '../Types/guide';
import { taskToStaticProps, WithNavTree, withNavTreeStaticProp } from '../Types/NavTree';

interface Props {
  markdown: SafeMarkdown;
}

const About: NextPage<Props> = ({ markdown }) => (
  <>
    <PageTitle title="About" />
    <Markdown markdown={markdown} />
  </>
);

const getMarkdown = (): Task<ReadFileError, SafeMarkdown> =>
  // This is safe because we're reading from markdown we own locally
  readFileT('./src/about.md').map(unsafeMarkdownFromContent);

export const getStaticProps: GetStaticProps<WithNavTree<Props>> = pipe(
  (_context) => Task.succeed({}).assign('markdown', getMarkdown),
  withNavTreeStaticProp,
  taskToStaticProps
);

export default About;
