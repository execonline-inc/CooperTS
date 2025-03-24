import { Decoder, array, field, string, succeed } from 'jsonous';
import { NavLink, NavSection, NavTree } from './Types';

const navLinkDecoder: Decoder<NavLink> = succeed({})
  .assign('title', field('title', string))
  .assign('href', field('href', string));

const navSectionDecoder: Decoder<NavSection> = succeed({})
  .assign('title', field('title', string))
  .assign('href', field('href', string))
  .assign('links', field('links', array(navLinkDecoder)));

export const navTreeDecoder: Decoder<NavTree> = array(navSectionDecoder);
