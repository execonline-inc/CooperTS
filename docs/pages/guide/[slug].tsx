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
    frontmatter: { title },
    content,
  },
}) => (
  <>
    <a href={'/guide'} aria-label="Go Back">
      &larr; Go Back
    </a>
    <h3>{title}</h3>
    <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
  </>
);

export async function getStaticPaths() {
  const files = getFilesFromPath('guide');
  const paths = files.map(filename => ({ params: { slug: filename.replace('.md', '') } }));
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
