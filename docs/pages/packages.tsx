import { pipe } from '@kofno/piper';
import clsx from 'clsx';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
import PageTitle from '../components/PageTitle';
import { getCombinedPackageData, PackageData } from '../GetPackages';
import { taskToStaticProps, WithNavTree, withNavTreeStaticProp } from '../Types/NavTree';
import PackageGHLink from '../components/PackageGithubLink/PackageGHLink';

interface Props {
  allPackageData: PackageData[];
}

const Packages: React.FC<Props> = ({ allPackageData }) => {
  return (
    <>
      <PageTitle title="Packages" />
      <ul>
        {allPackageData
          .sort((a, b) => (a.metadata.name > b.metadata.name ? 1 : -1))
          .map(({ slug, metadata: { name, description } }) => (
            <li key={slug} className={clsx('flex items-center space-x-4', 'my-4')}>
              <div className="not-prose">
                <PackageGHLink slug={slug} name={name} location={'packages-page'} />
              </div>
              <div>
                <Link href={`/packages/${slug}`}>
                  <strong>{name}</strong>
                </Link>
                <span>: {description}</span>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};

export const getStaticProps: GetStaticProps<WithNavTree<Props>> = pipe(
  () => getCombinedPackageData().map(allPackageData => ({ allPackageData })),
  withNavTreeStaticProp,
  taskToStaticProps
);

export default Packages;
