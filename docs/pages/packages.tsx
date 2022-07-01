import Link from 'next/link';
import React from 'react';
import { getCombinedPackageData, PackageData } from '../GetPackages';

interface Props {
  allPackageData: PackageData[];
}

const Packages: React.FC<Props> = ({ allPackageData }) => {
  return (
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
  );
};

export async function getStaticProps() {
  return getCombinedPackageData()
    .map(allPackageData => ({
      props: {
        allPackageData,
      },
    }))
    .resolve();
}

export default Packages;
