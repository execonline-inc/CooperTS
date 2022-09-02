import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import Task from 'taskarian';
import { getCombinedPackageData, GetCombinedPackageError } from '../GetPackages';
import { getFilesFromPath } from '../lib';
import { requireFrontmatterDuringBuild } from './guide';

export interface NavLink {
  title: string;
  href: string;
}

export interface NavSection {
  title: string;
  links: Array<NavLink>;
}

export type NavTree = Array<NavSection>;

const getPackagesLinks: Task<
  GetCombinedPackageError,
  Array<NavLink>
> = getCombinedPackageData().map(datas =>
  datas.map(data => ({ title: data.metadata.name, href: `/packages/${data.slug}` }))
);

const getPackagesSection: Task<GetCombinedPackageError, NavSection> = getPackagesLinks.map(
  links => ({
    title: 'Packages',
    links,
  })
);

const guideLinks: Array<NavLink> = getFilesFromPath('guide')
  .map(filename => ({
    filename,
    slug: filename.replace('.md', ''),
  }))
  .map(d => ({ ...d, ...matter(fs.readFileSync(path.join('guide', d.filename), 'utf-8')) }))
  .map(d => ({ ...d, frontmatter: requireFrontmatterDuringBuild(d.data) }))
  .map(d => ({ title: d.frontmatter.title, href: `/guide/${d.slug}` }));

const guideSection: NavSection = {
  title: 'Guide',
  links: guideLinks,
};

export const getNavTree: Task<
  GetCombinedPackageError,
  NavTree
> = getPackagesSection.map(packagesSection => [guideSection, packagesSection]);
