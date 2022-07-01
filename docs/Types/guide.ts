import Decoder, { field, string, succeed } from 'jsonous';

export interface Page {
  slug: string;
  frontmatter: Frontmatter;
  content: string;
}

export interface Frontmatter {
  title: string;
  description: string;
}

const frontmatterDecoder: Decoder<Frontmatter> = succeed({})
  .assign('title', field('title', string))
  .assign('description', field('description', string));

const raise = (err: string): never => {
  throw `[EXO] ${err}`;
};

export const requireFrontmatterDuringBuild = (data: unknown): Frontmatter =>
  frontmatterDecoder
    .decodeAny(data)
    .elseDo(raise)
    .getOrElse(() => raise('Unreachable'));
