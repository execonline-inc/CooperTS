import { Maybe } from 'maybeasy';
import { fromArrayMaybe } from 'nonempty-list';

export const languageTag = (lang: string): Maybe<string> =>
  fromArrayMaybe(lang.split('-')).map(({ first }) => first);
