import { pipe } from '@kofno/piper';
import clsx from 'clsx';
import { string } from 'jsonous';
import { GetStaticProps } from 'next';
import Markdown from '../../components/Markdown';
import PageTitle from '../../components/PageTitle';
import { getCombinedPackageData, getPackageDataFromSomeSlug, PackageData } from '../../GetPackages';
import { requireDecoderDuringBuild } from '../../RequireDecoderDuringBuild';
import { taskToStaticProps, WithNavTree, withNavTreeStaticProp } from '../../Types/NavTree';

interface Props {
  packageData: PackageData;
}

const PackagePage: React.FC<Props> = ({ packageData: { metadata, markdown } }) => (
  <>
    <PageTitle title={metadata.name} />
    <div className={clsx('py-10 md:py-16')}>
      <p>
        <strong>{metadata.name}</strong>: {metadata.description}
      </p>
      <Markdown markdown={markdown} />
    </div>
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
  taskToStaticProps,
);

export default PackagePage;
