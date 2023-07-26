import { asMaybe, asTask } from '@execonline-inc/error-handling';
import { Maybe, fromNullable } from 'maybeasy';
import { Result, err, ok } from 'resulty';
import Task from 'taskarian';

export interface InvalidWebUrlError {
  kind: 'invalid-web-url-error';
  error: unknown;
}

const invalidWebUrlError = (error: unknown): InvalidWebUrlError => ({
  kind: 'invalid-web-url-error',
  error,
});

export const toUrlR = (href: string, base?: string | URL): Result<InvalidWebUrlError, URL> => {
  try {
    const url = typeof base === 'undefined' ? new URL(href) : new URL(href, base);
    return ok(url);
  } catch (e) {
    return err(invalidWebUrlError(e));
  }
};

export const toUrlT = (href: string, base?: string | URL): Task<InvalidWebUrlError, URL> =>
  asTask(toUrlR(href, base));

export const toUrl = (href: string, base?: string | URL): Maybe<URL> => asMaybe(toUrlR(href, base));

export function getQueryParam(key: string): (url: URL) => Maybe<string>;
export function getQueryParam(key: string, url: URL): Maybe<string>;
export function getQueryParam(key: string, url?: URL) {
  const getIt = (url: URL): Maybe<string> => fromNullable(url.searchParams.get(key));

  return typeof url === 'undefined' ? getIt : getIt(url);
}

export function getQueryParamArray(key: string): (url: URL) => string[];
export function getQueryParamArray(key: string, url: URL): string[];
export function getQueryParamArray(key: string, url?: URL) {
  const getThem = (url: URL): string[] => url.searchParams.getAll(`${key}[]`);

  return typeof url === 'undefined' ? getThem : getThem(url);
}

export function putQueryParam(key: string, value: string): (url: URL) => URL;
export function putQueryParam(key: string, value: string, url: URL): URL;
export function putQueryParam(key: string, value: string, url?: URL) {
  const putIt = (url: URL): URL => {
    const u = new URL(url);
    u.searchParams.append(key, value);
    return u;
  };

  return typeof url === 'undefined' ? putIt : putIt(url);
}

export function putQueryParamArray(key: string, values: string[]): (url: URL) => URL;
export function putQueryParamArray(key: string, values: string[], url: URL): URL;
export function putQueryParamArray(key: string, values: string[], url?: URL) {
  const putAll = (url: URL): URL => {
    const u = new URL(url);
    for (const v of values) {
      u.searchParams.append(`${key}[]`, v);
    }
    return u;
  };

  return typeof url === 'undefined' ? putAll : putAll(url);
}

export function getPathname(url: URL): string {
  return url.pathname;
}

export function putPathname(pathname: string): (url: URL) => URL;
export function putPathname(pathname: string, url: URL): URL;
export function putPathname(pathname: string, url?: URL) {
  const doit = (url: URL): URL => {
    const u = new URL(url);
    u.pathname = pathname;
    return u;
  };

  return typeof url === 'undefined' ? doit : doit(url);
}

export const windowLocation = (): Task<InvalidWebUrlError, URL> => toUrlT(window.location.href);
