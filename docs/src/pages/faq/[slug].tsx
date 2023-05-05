import { pipe } from '@kofno/piper';
import clsx from 'clsx';
import fs from 'fs';
import matter from 'gray-matter';
import { string } from 'jsonous';
import { GetStaticProps } from 'next';
import path from 'path';
import React from 'react';
import Task from 'taskarian';
import Markdown from '../../components/Markdown';
import PageTitle from '../../components/PageTitle';
import { getFilesFromPath } from '../../lib';
import { requireDecoderDuringBuild } from '../../RequireDecoderDuringBuild';
import { Page, requireFrontmatterDuringBuild, unsafeMarkdownFromContent } from '../../Types/guide';
import { taskToStaticProps, WithNavTree, withNavTreeStaticProp } from '../../Types/NavTree';

interface Props {
  page: Page;
}

const PackagePage: React.FC<Props> = ({
  page: {
    frontmatter: { title },
    markdown,
  },
}) => (
  <>
    <PageTitle title={title} />
    <div className={clsx('py-10 md:py-16')}>
      <span className="not-prose group"></span>
      <article className={clsx('relative')}>
        <header>
          <h1
            className={clsx(
              'font-display text-3xl tracking-tight',
              'text-slate-900 dark:text-white'
            )}
          >
            {title}
          </h1>
        </header>
        <Markdown markdown={markdown} />
      </article>
    </div>
  </>
);

export async function getStaticPaths() {
  const files = getFilesFromPath('src/faq');
  const paths = files.map((filename) => ({ params: { slug: filename.replace('.md', '') } }));
  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps<WithNavTree<Props>> = pipe(
  (context) =>
    Task.succeed(requireDecoderDuringBuild(string)(context.params?.slug))
      .map((slug) => ({ slug }))
      .map((o) => ({ ...o, path: path.join('src/faq', `${o.slug}.md`) }))
      .map((o) => ({ ...o, file: fs.readFileSync(o.path, 'utf-8') }))
      .map((o) => ({ ...o, ...matter(o.file) }))
      // This is safe because we're reading our own markdown during build, not
      // user-submitted markdown.
      .map((o) => ({ ...o, markdown: unsafeMarkdownFromContent(o.content) }))
      .map((o) => ({ ...o, frontmatter: requireFrontmatterDuringBuild(o.data) }))
      .map<Page>(({ slug, frontmatter, markdown }) => ({ slug, frontmatter, markdown }))
      .map((page) => ({ page })),
  withNavTreeStaticProp,
  taskToStaticProps
);

export default PackagePage;
