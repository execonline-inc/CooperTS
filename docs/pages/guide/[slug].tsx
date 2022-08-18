import clsx from 'clsx';
import fs from 'fs';
import matter from 'gray-matter';
import { marked } from 'marked';
import path from 'path';
import { getFilesFromPath } from '../../lib';
import { Page, requireFrontmatterDuringBuild } from '../../Types/guide';

interface Props {
  page: Page;
}

const PackagePage: React.FC<Props> = ({
  page: {
    frontmatter: { title, description },
    content,
  },
}) => (
  <div className={clsx('py-10 md:py-16')}>
    <span className="not-prose group">
      <a
        href={'/guide'}
        aria-label="Go Back"
        className={clsx(
          'dark:text-sky-400 ',
          'dark:hover:text-slate-300',
          'text-sky-500 hover:text-sky-600',
          'text-base font-bold',
          'hover:text-sky-600 dark:hover:text-sky-500',
          'relative transform transition'
        )}
      >
        <span
          aria-hidden="true"
          className={clsx(
            'translate-x-0 transform transition-all duration-200 group-hover:-translate-x-2'
          )}
        >
          <i className="fa fas fa-arrow-left group-hover:text-amber-500"></i>
        </span>{' '}
        Go Back
      </a>
    </span>
    <article className={clsx('relative')}>
      <header>
        <h1
          className={clsx('font-display text-3xl tracking-tight', 'text-slate-900 dark:text-white')}
        >
          {title}
        </h1>
      </header>
      <div
        className={clsx(
          'prose prose-slate w-full lg:max-w-none',
          'prose-headings:scroll-mt-28',
          'prose-headings:font-display prose-headings:font-normal',
          'prose-lead:text-slate-500',
          'prose-a:font-semibold prose-a:no-underline',
          'prose-a:shadow-[var(--proseAShadow)]',
          'hover:prose-a:[--tw-prose-underline-size:6px]',
          'prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:shadow-lg',
          'prose-pre:p-3 md:prose-pre:p-5',
          'prose-pre:text-xs md:prose-pre:text-sm lg:prose-pre:text-base',
          'dark:prose-invert dark:text-slate-400',

          'dark:[--tw-prose-background:theme(colors.slate.900)] dark:prose-lead:text-slate-400',
          'dark:prose-a:text-sky-400',

          'dark:prose-a:shadow-[var(--darkProseAShadow)]',
          'dark:hover:prose-a:[--tw-prose-underline-size:6px]',
          'dark:prose-pre:bg-slate-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1',

          'dark:prose-pre:ring-slate-300/10 dark:prose-hr:border-slate-800',
          'lg:prose-headings:scroll-mt-[8.5rem]'
        )}
        dangerouslySetInnerHTML={{ __html: marked(content) }}
      ></div>
    </article>
  </div>
);

export async function getStaticPaths() {
  const files = getFilesFromPath('guide');
  const paths = files.map((filename) => ({ params: { slug: filename.replace('.md', '') } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params: { slug } }: { params: { slug: string } }) {
  const markDownWithMeta = fs.readFileSync(path.join('guide', `${slug}.md`), 'utf-8');
  const { data, content } = matter(markDownWithMeta);

  return {
    props: { page: { frontmatter: requireFrontmatterDuringBuild(data), slug, content } },
  };
}

export default PackagePage;
