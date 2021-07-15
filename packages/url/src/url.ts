import { always, identity, noop } from '@kofno/piper';
import { fromNullable, just, Maybe, nothing } from 'maybeasy';
import { err, ok, Result } from 'resulty';
import Task from 'taskarian';
import * as ParsedURL from 'url-parse';

export interface InvalidUrlError {
  kind: 'invalid-url-error';
  href: string;
  base?: string | ParsedURL;
  error: unknown;
}

const invalidUrlError = (
  error: unknown,
  href: string,
  base?: string | ParsedURL
): InvalidUrlError => {
  return {
    kind: 'invalid-url-error',
    href,
    base,
    error,
  };
};

export const toUrlR = (
  href: string,
  base?: string | ParsedURL
): Result<InvalidUrlError, ParsedURL> => {
  try {
    // Working around a bug in safari: https://github.com/zloirock/core-js/issues/656
    const url = base ? new ParsedURL(href, base, true) : new ParsedURL(href, true);
    return ok(url);
  } catch (e) {
    return err(invalidUrlError(e, href, base));
  }
};

export const toUrl = (href: string, base?: string | ParsedURL): Maybe<ParsedURL> => {
  return toUrlR(href, base).cata<Maybe<ParsedURL>>({
    Ok: just,
    Err: nothing,
  });
};

export const toUrlT = (href: string, base?: string | ParsedURL): Task<InvalidUrlError, ParsedURL> =>
  new Task((reject, resolve) => {
    toUrlR(href, base).cata({
      Ok: resolve,
      Err: reject,
    });

    return noop;
  });

export function getQueryParam(key: string): (url: ParsedURL) => Maybe<string>;
export function getQueryParam(key: string, url: ParsedURL): Maybe<string>;
export function getQueryParam(key: string, url?: ParsedURL) {
  const getIt = (url: ParsedURL) => fromNullable(url.query[key]);

  return url ? getIt(url) : getIt;
}

export function putQueryParam(key: string, value: string): (url: ParsedURL) => ParsedURL;
export function putQueryParam(key: string, value: string, url: ParsedURL): ParsedURL;
export function putQueryParam(key: string, value: string, url?: ParsedURL) {
  const putIt = (url: ParsedURL): ParsedURL => {
    const q = url.query;
    return toUrl(url.href)
      .map(u => u.set('query', { ...q, [key]: value }))
      .cata({
        Just: identity,
        Nothing: always(url),
      });
  };

  return url ? putIt(url) : putIt;
}

export function getPathname(url: ParsedURL): string {
  return url.pathname;
}

export function putPathname(pathname: string): (url: ParsedURL) => ParsedURL;
export function putPathname(pathname: string, url: ParsedURL): ParsedURL;
export function putPathname(pathname: string, url?: ParsedURL) {
  const doit = (url: ParsedURL): ParsedURL => {
    return toUrl(url.href)
      .map(u => u.set('pathname', pathname))
      .getOrElseValue(url);
  };

  return typeof url === 'undefined' ? doit : doit(url);
}
