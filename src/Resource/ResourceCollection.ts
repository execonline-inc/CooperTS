import { Resource } from './Types';
import { Maybe } from 'maybeasy';

export type ResourceCollection<T> = None | Empty | Results<T>;

export interface None {
  kind: 'none';
}

export interface Empty {
  kind: 'empty';
}

export interface Results<T> {
  kind: 'results';
  results: Resource<T[]>;
}

export const none = <T>(): ResourceCollection<T> => ({ kind: 'none' });
export const empty = <T>(): ResourceCollection<T> => ({ kind: 'empty' });
export const results = <T>(r: Resource<T[]>): ResourceCollection<T> => ({
  kind: 'results',
  results: r,
});

export const resources = <T>(res: Maybe<Resource<T[]>>): ResourceCollection<T> =>
  res.map(r => (r.payload.length > 0 ? results<T>(r) : empty<T>())).getOrElseValue(none<T>());
