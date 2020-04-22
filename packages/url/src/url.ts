import { noop } from '@kofno/piper';
import { just, Maybe, nothing } from 'maybeasy';
import { err, ok, Result } from 'resulty';
import Task from 'taskarian';

export interface InvalidUrlError {
  kind: 'invalid-url-error';
  href: string;
  base?: string | URL;
  error: unknown;
}

const invalidUrlError = (error: unknown, href: string, base?: string | URL): InvalidUrlError => {
  return {
    kind: 'invalid-url-error',
    href,
    base,
    error,
  };
};

export const toUrlR = (href: string, base?: string | URL): Result<InvalidUrlError, URL> => {
  try {
    // Working around a bug in safari: https://github.com/zloirock/core-js/issues/656
    const url = base ? new URL(href, base) : new URL(href);
    return ok(url);
  } catch (e) {
    return err(invalidUrlError(e, href, base));
  }
};

export const toUrl = (href: string, base?: string | URL): Maybe<URL> => {
  return toUrlR(href, base).cata<Maybe<URL>>({
    Ok: just,
    Err: nothing,
  });
};

export const toUrlT = (href: string, base?: string | URL): Task<InvalidUrlError, URL> =>
  new Task((reject, resolve) => {
    toUrlR(href, base).cata({
      Ok: resolve,
      Err: reject,
    });

    return noop;
  });
