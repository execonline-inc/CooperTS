import { always } from '@kofno/piper';
import { Maybe } from 'maybeasy';
import { reduce } from './reduce';

export const map = <A, B>(fn: (a: A) => B) => (as: ReadonlyArray<A>): B[] => as.map(fn);

export function flatMap<T, U>(fn: (value: T) => U[], ary: ReadonlyArray<T>): ReadonlyArray<U>;
export function flatMap<T, U>(fn: (value: T) => U[]): (ary: ReadonlyArray<T>) => ReadonlyArray<U>;
export function flatMap<T, U>(fn: (value: T) => U[], ary?: ReadonlyArray<T>) {
  const reducer = reduce<T, ReadonlyArray<U>>((accum, t) => {
    const vs = fn(t);
    return [...accum, ...vs];
  }, []);

  return typeof ary === 'undefined' ? reducer : reducer(ary);
}

export function mapMaybe<T, B>(fn: (a: T) => Maybe<B>): (ts: ReadonlyArray<T>) => ReadonlyArray<B>;
export function mapMaybe<T, B>(fn: (a: T) => Maybe<B>, ts: ReadonlyArray<T>): ReadonlyArray<B>;
export function mapMaybe<T, B>(fn: (a: T) => Maybe<B>, ts?: ReadonlyArray<T>) {
  const reducer = reduce<T, ReadonlyArray<B>>(
    (accum, t) => fn(t).cata({ Just: v => [...accum, v], Nothing: always(accum) }),
    []
  );

  return typeof ts === 'undefined' ? reducer : reducer(ts);
}
