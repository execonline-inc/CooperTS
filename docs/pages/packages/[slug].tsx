import Link from 'next/link';
import Markdown from '../../components/Markdown';
import { getCombinedPackageData, getPackageDataFromSomeSlug, PackageData } from '../../GetPackages';

interface Props {
  packageData: PackageData;
}

const PackagePage: React.FC<Props> = ({ packageData: { metadata, markdown } }) => (
  <>
    <span>
      <Link href="/packages">
        <a aria-label="Go Back">&larr; Go Back</a>
      </Link>
    </span>
    <p>
      <strong>{metadata.name}</strong>: {metadata.description}
    </p>
    <Markdown markdown={markdown} />
  </>
);

export async function getStaticPaths() {
  return getCombinedPackageData()
    .map(a => a.map(({ slug }) => ({ params: { slug } })))
    .map(paths => ({ paths, fallback: false }))
    .resolve();
}

export async function getStaticProps({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<{ props: Props }> {
  return getPackageDataFromSomeSlug(slug)
    .map(packageData => ({ props: { packageData } }))
    .resolve();
}

export default PackagePage;
