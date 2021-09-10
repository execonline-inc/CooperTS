import { identity } from '@kofno/piper';

export const uniqBy = <T, C>(fn: (t: T) => C) => (ts: ReadonlyArray<T>): T[] => {
  const set: Set<C> = new Set();
  const result: T[] = [];

  ts.forEach(t => {
    const compareItem = fn(t);
    if (!set.has(compareItem)) {
      set.add(compareItem);
      result.push(t);
    }
  });

  return result;
};

export const uniq: <T>(ts: ReadonlyArray<T>) => T[] = uniqBy(identity);

export function filter<T>(fn: (t: T) => boolean): (ts: ReadonlyArray<T>) => ReadonlyArray<T>;
export function filter<T>(fn: (t: T) => boolean, ts: ReadonlyArray<T>): ReadonlyArray<T>;
export function filter<T>(fn: (t: T) => boolean, ts?: ReadonlyArray<T>) {
  const doit = (ts: ReadonlyArray<T>): ReadonlyArray<T> => ts.filter(fn);

  return typeof ts === 'undefined' ? doit : doit(ts);
}
