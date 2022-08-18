import Decoder, { field, string, succeed } from 'jsonous';
import { requireDecoderDuringBuild } from '../RequireDecoderDuringBuild';

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

export const requireFrontmatterDuringBuild = requireDecoderDuringBuild(frontmatterDecoder);
