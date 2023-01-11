import { pipe } from '@kofno/piper';
import clsx from 'clsx';
import { string } from 'jsonous';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Markdown from '../../components/Markdown';
import PageTitle from '../../components/PageTitle';
import { getCombinedPackageData, getPackageDataFromSomeSlug, PackageData } from '../../GetPackages';
import { requireDecoderDuringBuild } from '../../RequireDecoderDuringBuild';
import { taskToStaticProps, WithNavTree, withNavTreeStaticProp } from '../../Types/NavTree';
import PackageGHLink from '../../components/PackageGithubLink/PackageGHLink';

interface Props {
  packageData: PackageData;
}

const PackagePage: React.FC<Props> = ({ packageData: { slug, metadata, markdown } }) => (
  <>
    <PageTitle title={metadata.name} />
    <span>
      <Link href="/packages" aria-label="Go Back">
        &larr; Go Back
      </Link>
    </span>
    <div className={clsx('flex items-center space-x-4')}>
      <div className="not-prose">
        <PackageGHLink name={metadata.name} slug={slug} location={'slug-page'} />
      </div>
      : {metadata.description}
    </div>

    <Markdown markdown={markdown} />
  </>
);

export async function getStaticPaths() {
  return getCombinedPackageData()
    .map(a => a.map(({ slug }) => ({ params: { slug } })))
    .map(paths => ({ paths, fallback: false }))
    .resolve();
}

export const getStaticProps: GetStaticProps<WithNavTree<Props>> = pipe(
  context => {
    const slug = requireDecoderDuringBuild(string)(context.params?.slug);
    return getPackageDataFromSomeSlug(slug).map(packageData => ({ packageData }));
  },
  withNavTreeStaticProp,
  taskToStaticProps
);

export default PackagePage;
