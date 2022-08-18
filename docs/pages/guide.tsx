import matter from 'gray-matter';
import Link from 'next/link';
import { getFilesFromPath, getMarkDownWithMeta } from '../lib';
import { Page } from '../Types/guide';

interface Props {
  pages: Page[];
}

const Guide: React.FC<Props> = ({ pages }) => {
  return (
    <div className="not-prose relative lg:block lg:flex-none">
      <div
        className={`sticky top-[4.5rem] -ml-0.5 h-[calc(100vh-4.5rem)] 
          overflow-y-auto py-16 pl-0.5`}
      >
        <nav className={`w-64 pr-8 text-base lg:text-sm xl:w-72 xl:pr-16`}>
          <ul className="space-y-9">
            <li>
              <h2
                className={`font-display font-medium 
                text-slate-900 dark:text-white`}
              >
                Guide
              </h2>
              <ul
                className={`not-prose lg:border-slate-20 
                mt-6 space-y-2 border-l-2 
                border-slate-100 dark:border-slate-800 
                lg:mt-4 lg:space-y-4`}
              >
                {pages.map(({ slug, frontmatter: { title } }) => (
                  <li key={slug} className="relative">
                    <Link href={`/guide/${slug}`}>
                      <a
                        href="#"
                        className={`block w-full pl-3.5 
                        text-slate-500
                        before:pointer-events-none before:absolute before:-left-1
                        before:top-1/2 before:hidden before:h-1.5 before:w-1.5
                        before:-translate-y-1/2 before:rounded-full
                        before:bg-slate-300 hover:text-slate-600
                        hover:before:block dark:text-slate-400
                        dark:before:bg-slate-700 dark:hover:text-slate-300`}
                      >
                        {title}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const files = getFilesFromPath('guide');

  const pages = files.map((filename) => {
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
