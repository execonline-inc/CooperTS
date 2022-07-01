import matter from 'gray-matter';
import Link from 'next/link';
import { getFilesFromPath, getMarkDownWithMeta } from '../lib';
import styles from '../styles/Guide.module.scss';
import { Page } from '../Types/guide';

interface Props {
  pages: Page[];
}

const Guide: React.FC<Props> = ({ pages }) => {
  return (
    <ul className={styles.bulletList}>
      {pages.map(({ slug, frontmatter: { title } }) => (
        <li key={slug}>
          <Link href={`/guide/${slug}`}>{title}</Link>
        </li>
      ))}
    </ul>
  );
};

export async function getStaticProps() {
  const files = getFilesFromPath('guide');

  const pages = files.map(filename => {
    const slug = filename.replace('.md', '');
    const markDownWithMeta = getMarkDownWithMeta('guide', filename);

    const { data: frontmatter } = matter(markDownWithMeta);
    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      pages,
    },
  };
}

export default Guide;
