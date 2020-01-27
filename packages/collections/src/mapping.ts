import { always } from "@kofno/piper";
import { Maybe } from "maybeasy";

export const map = <A, B>(fn: (a: A) => B) => (as: ReadonlyArray<A>): B[] =>
  as.map(fn);

export function flatMap<T, U>(
  fn: (value: T) => U[],
  ary: ReadonlyArray<T>
): ReadonlyArray<U>;
export function flatMap<T, U>(
  fn: (value: T) => U[]
): (ary: ReadonlyArray<T>) => ReadonlyArray<U>;
export function flatMap<T, U>(fn: (value: T) => U[], ary?: ReadonlyArray<T>) {
  const flatMapImpl = (ary: ReadonlyArray<T>) => {
    const result: U[] = [];
    ary.forEach(t => fn(t).forEach(u => result.push(u)));
    return result as ReadonlyArray<U>;
  };

  return typeof ary === "undefined" ? flatMapImpl : flatMapImpl(ary);
}

export function mapMaybe<T, B>(
  fn: (a: T) => Maybe<B>
): (ts: ReadonlyArray<T>) => ReadonlyArray<B>;
export function mapMaybe<T, B>(
  fn: (a: T) => Maybe<B>,
  ts: ReadonlyArray<T>
): ReadonlyArray<B>;
export function mapMaybe<T, B>(fn: (a: T) => Maybe<B>, ts?: ReadonlyArray<T>) {
  const reducer = (collection: ReadonlyArray<T>) =>
    collection.reduce(
      (accum, t) =>
        fn(t).cata({
          Just: value => accum.concat([value]),
          Nothing: always(accum)
        }),
      [] as ReadonlyArray<B>
    );

  return typeof ts === "undefined" ? reducer : reducer(ts);
}
