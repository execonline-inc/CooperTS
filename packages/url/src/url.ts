import { always, identity, noop, pipe } from '@kofno/piper';
import { just, Maybe, nothing } from 'maybeasy';
import { QueryParamVal } from 'nested-query-params';
import { err, ok, Result } from 'resulty';
import Task from 'taskarian';
import * as ParsedURL from 'url-parse';
import { fromQueryString, get, put, toQueryString } from './querystring';

export type URLParser = ParsedURL<string>;

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
    const url = base ? new ParsedURL(href, base, false) : new ParsedURL(href, false);
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

export function getQueryParam(key: string): (url: URLParser) => Maybe<QueryParamVal>;
export function getQueryParam(key: string, url: URLParser): Maybe<QueryParamVal>;
export function getQueryParam(key: string, url?: URLParser) {
  const getIt = (url: URLParser) =>
    just(url.query)
      .map(fromQueryString)
      .andThen(get(key));

  return url ? getIt(url) : getIt;
}

export function putQueryParam(key: string, value: QueryParamVal): (url: URLParser) => URLParser;
export function putQueryParam(key: string, value: QueryParamVal, url: URLParser): URLParser;
export function putQueryParam(key: string, value: string): (url: URLParser) => URLParser;
export function putQueryParam(key: string, value: string, url: URLParser): URLParser;
export function putQueryParam(key: string, value: QueryParamVal, url?: URLParser) {
  const updateQuery = pipe(fromQueryString, put(key, value), toQueryString);
  const putIt = (url: URLParser): URLParser => {
    return toUrl(url.href)
      .map(u => u.set('query', updateQuery(url.query)))
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
