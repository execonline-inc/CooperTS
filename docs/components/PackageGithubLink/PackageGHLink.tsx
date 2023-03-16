import clsx from 'clsx';
import Link from 'next/link';
import GithubIcon from '../GithubIcon';

interface Props {
  slug: string;
  name: string;
  location: PackagePages;
}

export type PackagePages = 'packages-page' | 'slug-page';

const PackageGHLink: React.FC<Props> = ({ slug, name, location }) => {
  const packagePath = name.includes('@execonline')
    ? `execonline-inc/CooperTS/tree/main/packages/${slug}`
    : `kofno/festive-possum/tree/main/packages/${slug}`;
  switch (location) {
    case 'packages-page':
      return (
        <Link href={`https://github.com/${packagePath}`} className="group" target={'_blank'}>
          <GithubIcon />
        </Link>
      );
    case 'slug-page':
      return (
        <Link href={`https://github.com/${packagePath}`} className="group" target={'_blank'}>
          <div className={clsx('flex items-center space-x-4', 'my-4')}>
            <GithubIcon />
            <p
              className={clsx(
                'text-slate-500 hover:text-slate-700',
                'dark:text-slate-300 dark:hover:text-white'
              )}
            >
              <strong>{name}</strong>
            </p>
          </div>
        </Link>
      );
  }
};

export default PackageGHLink;
