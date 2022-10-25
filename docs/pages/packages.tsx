import { pipe } from '@kofno/piper';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
import PageTitle from '../components/PageTitle';
import { getCombinedPackageData, PackageData } from '../GetPackages';
import { taskToStaticProps, WithNavTree, withNavTreeStaticProp } from '../Types/NavTree';

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
            <li key={slug}>
              <Link href={`/packages/${slug}`}>
                <a>
                  <strong>{name}</strong>
                </a>
              </Link>
              : {description}
            </li>
          ))}
      </ul>
    </>
  );
};

export const getStaticProps: GetStaticProps<WithNavTree<Props>> = pipe(
  () => getCombinedPackageData().map((allPackageData) => ({ allPackageData })),
  withNavTreeStaticProp,
  taskToStaticProps
);

export default Packages;
