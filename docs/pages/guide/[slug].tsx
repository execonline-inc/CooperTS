import clsx from 'clsx';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import React from 'react';
import Markdown from '../../components/Markdown';
import { getFilesFromPath } from '../../lib';
import { Page, requireFrontmatterDuringBuild, unsafeMarkdownFromContent } from '../../Types/guide';

interface Props {
  page: Page;
}

const PackagePage: React.FC<Props> = ({
  page: {
    frontmatter: { title },
    markdown,
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
      <Markdown markdown={markdown} />
    </article>
  </div>
);

export async function getStaticPaths() {
  const files = getFilesFromPath('guide');
  const paths = files.map(filename => ({ params: { slug: filename.replace('.md', '') } }));
  return { paths, fallback: false };
}

export async function getStaticProps({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<{ props: Props }> {
  const markDownWithMeta = fs.readFileSync(path.join('guide', `${slug}.md`), 'utf-8');
  const { data, content } = matter(markDownWithMeta);
  // This is safe because we're reading our own markdown, not user-submitted markdown.
  const markdown = unsafeMarkdownFromContent(content);

  return {
    props: { page: { frontmatter: requireFrontmatterDuringBuild(data), slug, markdown } },
  };
}

export default PackagePage;
