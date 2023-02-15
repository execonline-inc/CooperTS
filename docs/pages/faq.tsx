import clsx from 'clsx';
import matter from 'gray-matter';
import Link from 'next/link';
import Task from 'taskarian';
import { getFilesFromPath, getMarkDownWithMeta } from '../lib';
import { Page, requireFrontmatterDuringBuild, unsafeMarkdownFromContent } from '../Types/guide';
import { taskToStaticProps, WithNavTree, withNavTreeStaticProp } from '../Types/NavTree';
import { pipe } from '@kofno/piper';
import { GetStaticProps } from 'next';
import PageTitle from '../components/PageTitle';

interface Props {
  pages: Page[];
}

const FAQ: React.FC<Props> = ({ pages }) => {
  return (
    <>
      <PageTitle title="FAQs" />
      <div className={clsx('not-prose relative lg:block lg:flex-none')}>
        <div
          className={clsx(
            'sticky top-[4.5rem] -ml-0.5 h-[calc(100vh-4.5rem)]',
            'overflow-y-auto py-16 pl-0.5'
          )}
        >
          <nav
            className={clsx('w-64 pr-8 text-base lg:text-sm xl:w-72 xl:pr-16')}
            aria-labelledby="secondary-nav-header"
          >
            <ul className={clsx('space-y-9')}>
              <li>
                <h1
                  className={clsx('font-display font-medium text-slate-900 dark:text-white')}
                  id="secondary-nav-header"
                >
                  Frequently Asked Questions
                </h1>
                <ul
                  className={clsx(
                    'not-prose lg:border-slate-20',
                    'mt-6 space-y-2 border-l-2',
                    'border-slate-100 dark:border-slate-800',
                    'lg:mt-4 lg:space-y-4'
                  )}
                >
                  {pages.map(({ slug, frontmatter: { title } }) => (
                    <li key={slug} className={clsx('relative')}>
                      <Link
                        href={`/faq/${slug}`}
                        className={clsx(
                          'block w-full pl-3.5',
                          'text-slate-500',
                          'before:pointer-events-none before:absolute before:-left-1',
                          'before:top-1/2 before:hidden before:h-1.5 before:w-1.5',
                          'before:-translate-y-1/2 before:rounded-full',
                          'before:bg-slate-300 hover:text-slate-600',
                          'hover:before:block dark:text-slate-400',
                          'dark:before:bg-slate-700 dark:hover:text-slate-300'
                        )}
                      >
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<WithNavTree<Props>> = pipe(
  () => {
    const pages = getFilesFromPath('faq')
      .map(Task.succeed)
      .map((task) =>
        task.map((filename) => {
          const slug = filename.replace('.md', '');
          const markDownWithMeta = getMarkDownWithMeta('faq', filename);

          const { data, content } = matter(markDownWithMeta);
          // This is safe because we're reading our own markdown, not user-submitted markdown.
          const markdown = unsafeMarkdownFromContent(content);

          return {
            slug,
            frontmatter: requireFrontmatterDuringBuild(data),
            markdown,
          };
        })
      );

    return Task.all(pages).map((pages) => ({ pages }));
  },
  withNavTreeStaticProp,
  taskToStaticProps
);

export default FAQ;
