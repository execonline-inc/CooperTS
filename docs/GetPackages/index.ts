import { identity } from '@kofno/piper';
import { get, HttpError, toHttpTask } from 'ajaxios';
import Decoder, { field, string, succeed } from 'jsonous';
import { fromNullable } from 'maybeasy';
import path from 'path';
import { cwd } from 'process';
import Task from 'taskarian';
import { requireDecoderDuringBuild, requireResultDuringBuild } from '../RequireDecoderDuringBuild';
import { SafeMarkdown, unsafeMarkdownFromContent } from '../Types/guide';
import { packageDirDecoder } from './Decoders';
import { GlobError, globT, ReadFileError, readFileT } from './filesystem';
import { festivePossumPackagesPath, GithubFestivePossumPath, PackageDir } from './Types';

export interface PackageMetadata {
  name: string;
  description: string;
}

export interface PackageData {
  slug: string;
  metadata: PackageMetadata;
  markdown: SafeMarkdown;
}

const packageMetadataDecoder: Decoder<PackageMetadata> = succeed({})
  .assign('name', field('name', string))
  .assign('description', field('description', string));

const localPackageDirFromSlug = (slug: string): PackageDir => `${cwd()}/../packages/${slug}`;

const getLocalPackageDirs = (): Task<GlobError, PackageDir[]> =>
  globT(localPackageDirFromSlug('*')).map(a => a.map(requireDecoderDuringBuild(packageDirDecoder)));

const slugFromPackageDir = (packageDir: PackageDir): string => path.basename(packageDir);

const getLocalPackageSlugs = (): Task<GlobError, string[]> =>
  getLocalPackageDirs().map(a => a.map(slugFromPackageDir));

const localPackageMetadataFromSlug = (slug: string): Task<ReadFileError, PackageMetadata> =>
  readFileT(`${localPackageDirFromSlug(slug)}/package.json`)
    .map(packageMetadataDecoder.toJsonFn())
    .map(requireResultDuringBuild);

const localReadmeFromSlug = (slug: string): Task<ReadFileError, SafeMarkdown> =>
  // This is safe because we're reading from markdown we own locally
  readFileT(`${localPackageDirFromSlug(slug)}/README.md`).map(unsafeMarkdownFromContent);

const localPackageDataFromSlug = (slug: string): Task<ReadFileError, PackageData> =>
  Task.succeed<ReadFileError, { slug: string }>({ slug })
    .assign('metadata', localPackageMetadataFromSlug(slug))
    .assign('markdown', localReadmeFromSlug(slug));

type GetLocalPackagesError = GlobError | ReadFileError;

const getAllLocalPackageData = (): Task<GetLocalPackagesError, PackageData[]> =>
  getLocalPackageSlugs()
    .mapError<GetLocalPackagesError>(identity)
    .andThen(a => Task.all(a.map(localPackageDataFromSlug)));

interface FestivePossumPackagePaths {
  slug: string;
  readme: GithubFestivePossumPath;
  packageJson: GithubFestivePossumPath;
}

const festivePossumPackage = (slug: string, readmeName: string): FestivePossumPackagePaths => ({
  slug,
  readme: `${festivePossumPackagesPath}/${slug}/${readmeName}`,
  packageJson: `${festivePossumPackagesPath}/${slug}/package.json`,
});

const festivePossumReadmes: Map<string, string> = new Map([
  ['ajaxian', 'readme.md'],
  ['ajaxios', 'readme.md'],
  ['cute', 'README.md'],
  ['gaia', 'readme.md'],
  ['jsonous', 'readme.md'],
  ['maybeasy', 'readme.md'],
  ['nonempty-list', 'README.md'],
  ['piper', 'README.md'],
  ['resulty', 'readme.md'],
  ['stack-ts', 'README.md'],
  ['taskarian', 'readme.md'],
]);

const festivePossumPaths = (): Array<FestivePossumPackagePaths> =>
  Array.from(festivePossumReadmes.entries()).map(([slug, readme]) =>
    festivePossumPackage(slug, readme)
  );

const festivePossumPackageMetadata = (
  paths: FestivePossumPackagePaths
): Task<HttpError, PackageMetadata> =>
  toHttpTask(get(paths.packageJson).withDecoder(packageMetadataDecoder));

const festivePossumPackageReadmeContent = (
  paths: FestivePossumPackagePaths
): Task<HttpError, SafeMarkdown> =>
  // This is safe because we're reading from a hard-coded list of https urls
  // owned either by EXO or Ryan
  toHttpTask(get(paths.readme).withDecoder(string)).map(unsafeMarkdownFromContent);

const festivePossumPackageData = (paths: FestivePossumPackagePaths): Task<HttpError, PackageData> =>
  Task.succeed<HttpError, { slug: string }>({ slug: paths.slug })
    .assign('metadata', festivePossumPackageMetadata(paths))
    .assign('markdown', festivePossumPackageReadmeContent(paths));

type GetFestivePossumPackagesError = HttpError;

const getAllFestivePossumPackageData = (): Task<
  GetFestivePossumPackagesError,
  Array<PackageData>
> => Task.all(festivePossumPaths().map(festivePossumPackageData));

type GetCombinedPackageError = GetFestivePossumPackagesError | GetLocalPackagesError;

export const getCombinedPackageData = (): Task<GetCombinedPackageError, Array<PackageData>> =>
  Task.succeed<GetCombinedPackageError, {}>({})
    .assign('fpData', getAllFestivePossumPackageData())
    .assign('localData', getAllLocalPackageData())
    .map(({ fpData, localData }) => [...fpData, ...localData]);

export const getPackageDataFromSomeSlug = (
  slug: string
): Task<GetCombinedPackageError, PackageData> =>
  fromNullable(festivePossumReadmes.get(slug))
    .map<Task<GetCombinedPackageError, PackageData>>(readme =>
      festivePossumPackageData(festivePossumPackage(slug, readme))
    )
    .getOrElse(() => localPackageDataFromSlug(slug));
