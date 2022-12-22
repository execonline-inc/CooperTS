import { identity } from '@kofno/piper';
import fs from 'fs';
import matter from 'gray-matter';
import { GetStaticPropsContext, GetStaticPropsResult, PreviewData } from 'next';
import path from 'path';
import { ParsedUrlQuery } from 'querystring';
import Task from 'taskarian';
import { getCombinedPackageData, GetCombinedPackageError } from '../../GetPackages';
import { getFilesFromPath } from '../../lib';
import { requireFrontmatterDuringBuild } from '../guide';
import { NavLink, NavSection, NavTree } from './Types';

const getPackagesLinks: Task<
  GetCombinedPackageError,
  Array<NavLink>
> = getCombinedPackageData().map((datas) =>
  datas.map((data) => ({ title: data.metadata.name, href: `/packages/${data.slug}` })),
);

const getPackagesSection: Task<GetCombinedPackageError, NavSection> = getPackagesLinks.map(
  (links) => ({
    title: 'Packages',
    href: '/packages',
    links,
  }),
);

const guideLinks: Array<NavLink> = getFilesFromPath('guide')
  .map((filename) => ({
    filename,
    slug: filename.replace('.md', ''),
  }))
  .map((d) => ({ ...d, ...matter(fs.readFileSync(path.join('guide', d.filename), 'utf-8')) }))
  .map((d) => ({ ...d, frontmatter: requireFrontmatterDuringBuild(d.data) }))
  .map((d) => ({ title: d.frontmatter.title, href: `/guide/${d.slug}` }));

const guideSection: NavSection = {
  title: 'Guide',
  href: '/guide',
  links: guideLinks,
};

const faqLinks: Array<NavLink> = getFilesFromPath('faq')
  .map((filename) => ({
    filename,
    slug: filename.replace('.md', ''),
  }))
  .map((d) => ({ ...d, ...matter(fs.readFileSync(path.join('faq', d.filename), 'utf-8')) }))
  .map((d) => ({ ...d, frontmatter: requireFrontmatterDuringBuild(d.data) }))
  .map((d) => ({ title: d.frontmatter.title, href: `/faq/${d.slug}` }));

const faqSection: NavSection = {
  title: 'Frequently Asked Questions',
  href: '/faq',
  links: faqLinks,
};

const exampleLinks: Array<NavLink> = [
  { title: 'Task Manager App', href: '/examples#task-manager-app' },
  { title: 'Cellular Automata Emulator', href: '/examples#cellular-automata-emulator' },
  { title: 'This Doc Site 😁', href: '/examples#this-doc-site' },
];

const exampleSection = {
  title: 'Examples',
  href: '/examples',
  links: exampleLinks,
};

const aboutSection = {
  title: 'About',
  href: '/about',
  links: [],
};

export const getNavTree: Task<GetCombinedPackageError, NavTree> = getPackagesSection.map(
  (packagesSection) => [aboutSection, guideSection, exampleSection, faqSection, packagesSection],
);

export type GetStaticPropsT<Props> = (
  context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>,
) => Task<unknown, Props>;

export type WithNavTree<T extends {}> = T & { navTree: NavTree };

export const withNavTreeStaticProp = <Props extends {}, E>(
  fn: Task<E, Props>,
): Task<E | GetCombinedPackageError, WithNavTree<Props>> =>
  fn.mapError<E | GetCombinedPackageError>(identity).assign('navTree', getNavTree);

export const taskToStaticProps = <Props extends {}>(
  t: Task<unknown, Props>,
): Promise<GetStaticPropsResult<Props>> => t.map((props) => ({ props })).resolve();
