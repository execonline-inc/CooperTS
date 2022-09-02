import { pipe } from '@kofno/piper';
import { string } from 'jsonous';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Markdown from '../../components/Markdown';
import { getCombinedPackageData, getPackageDataFromSomeSlug, PackageData } from '../../GetPackages';
import { requireDecoderDuringBuild } from '../../RequireDecoderDuringBuild';
import { taskToStaticProps, WithNavTree, withNavTreeStaticProp } from '../../Types/NavTree';

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
    .map((a) => a.map(({ slug }) => ({ params: { slug } })))
    .map((paths) => ({ paths, fallback: false }))
    .resolve();
}

export const getStaticProps: GetStaticProps<WithNavTree<Props>> = pipe(
  (context) => {
    const slug = requireDecoderDuringBuild(string)(context.params?.slug);
    return getPackageDataFromSomeSlug(slug).map((packageData) => ({ packageData }));
  },
  withNavTreeStaticProp,
  taskToStaticProps
);

export default PackagePage;
