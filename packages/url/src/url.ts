import { always, identity, noop } from '@kofno/piper';
import { fromNullable, just, Maybe, nothing } from 'maybeasy';
import { err, ok, Result } from 'resulty';
import Task from 'taskarian';
import * as ParsedURL from 'url-parse';

export type URLParser = ParsedURL<Record<string, string | undefined>>;

export interface InvalidUrlError {
  kind: 'invalid-url-error';
  href: string;
  base?: string | URLParser;
  error: unknown;
}

const invalidUrlError = (
  error: unknown,
  href: string,
  base?: string | URLParser
): InvalidUrlError => {
  return {
    kind: 'invalid-url-error',
    href,
    base,
    error,
  };
};

export const toUrlR = <T>(
  href: string,
  base?: string | URLParser
): Result<InvalidUrlError, URLParser> => {
  try {
    // Working around a bug in safari: https://github.com/zloirock/core-js/issues/656
    const url = base ? new ParsedURL(href, base, true) : new ParsedURL(href, true);
    return ok(url);
  } catch (e) {
    return err(invalidUrlError(e, href, base));
  }
};

export const toUrl = (href: string, base?: string | URLParser): Maybe<URLParser> => {
  return toUrlR(href, base).cata<Maybe<URLParser>>({
    Ok: just,
    Err: nothing,
  });
};

export const toUrlT = (href: string, base?: string | URLParser): Task<InvalidUrlError, URLParser> =>
  new Task((reject, resolve) => {
    toUrlR(href, base).cata({
      Ok: resolve,
      Err: reject,
    });

    return noop;
  });

export function getQueryParam(key: string): (url: URLParser) => Maybe<string>;
export function getQueryParam(key: string, url: URLParser): Maybe<string>;
export function getQueryParam(key: string, url?: URLParser) {
  const getIt = (url: URLParser) => fromNullable(url.query[key]);

  return url ? getIt(url) : getIt;
}

export function putQueryParam(key: string, value: string): (url: URLParser) => URLParser;
export function putQueryParam(key: string, value: string, url: URLParser): URLParser;
export function putQueryParam(key: string, value: string, url?: URLParser) {
  const putIt = (url: URLParser): URLParser => {
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

export function getPathname(url: URLParser): string {
  return url.pathname;
}

export function putPathname(pathname: string): (url: URLParser) => URLParser;
export function putPathname(pathname: string, url: URLParser): URLParser;
export function putPathname(pathname: string, url?: URLParser) {
  const doit = (url: URLParser): URLParser => {
    return toUrl(url.href)
      .map(u => u.set('pathname', pathname))
      .getOrElseValue(url);
  };

  return typeof url === 'undefined' ? doit : doit(url);
}

export const windowLocation = (): Task<InvalidUrlError, URLParser> => toUrlT(window.location.href);
