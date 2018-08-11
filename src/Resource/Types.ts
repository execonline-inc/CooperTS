import * as R from 'ramda';
import { Method } from 'ajaxian';
import { Maybe, fromNullable } from 'maybeasy';

export interface Link {
  rel: string;
  href: string;
  method: Method;
}

export interface Linkable {
  links: Link[];
}

export interface Resource<T> extends Linkable {
  payload: T;
}

export interface ResourceWithMetadata<T, M> extends Resource<T> {
  metadata: M;
}

export const selfUrl = <T>(r: Resource<T>) => R.find(l => l.rel === 'self', r.links);

export const selfUrlM = <T>(r: Resource<T>): Maybe<Link> => fromNullable(selfUrl(r));

export const iconUrl = <T>(r: Resource<T>) => R.find(l => l.rel === 'icon', r.links);

export const isNotSelf = (url: string) => <T>(r: Resource<T>): boolean =>
  !r.links.some(l => l.rel === 'self' && l.href === url);

export const hasUrl = <T>(url: string, rel: string) => (r: Resource<T>): boolean => {
  const matches = (l: Link) => l.href === url && l.rel === rel;
  return R.any(matches, r.links);
};
