import { pipe } from '@kofno/piper';
import { fromNullable } from 'maybeasy';

export function truncate(length: number, str: string): string;
export function truncate(length: number): (str: string) => string;
export function truncate(length: number, str?: string) {
  const elipses = '…';
  const endIndex = Math.max(0, length - elipses.length);
  const doit = (str: string) =>
    str.length > length ? `${str.substring(0, endIndex)}${elipses}` : str;
  return typeof str === 'undefined' ? doit : doit(str);
}

function multibyteCodePoint(code: number): boolean {
  return code > 0xffff;
}

const codePointIndex = pipe(multibyteCodePoint, (multi: boolean) => (multi ? 2 : 1));

export function capitalize(value: string, language?: string | string[]): string {
  return fromNullable(value.codePointAt(0))
    .map(codePoint => {
      const upper = String.fromCodePoint(codePoint).toLocaleUpperCase(language);
      const rest = value.substring(codePointIndex(codePoint));
      return upper + rest;
    })
    .getOrElseValue(value);
}
