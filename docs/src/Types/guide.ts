import { Decoder, field, string, succeed } from 'jsonous';
import { requireDecoderDuringBuild } from '../RequireDecoderDuringBuild';

export interface SafeMarkdown {
  content: string;
}

// Users of this method need to verify that the markdown content is from a
// trusted source; otherwise we could be vulnerable to a XSS attack.
export const unsafeMarkdownFromContent = (content: string): SafeMarkdown => ({ content });

export interface Page {
  slug: string;
  frontmatter: Frontmatter;
  markdown: SafeMarkdown;
}

export interface Frontmatter {
  title: string;
  description: string;
}

const frontmatterDecoder: Decoder<Frontmatter> = succeed({})
  .assign('title', field('title', string))
  .assign('description', field('description', string));

export const requireFrontmatterDuringBuild = requireDecoderDuringBuild(frontmatterDecoder);
