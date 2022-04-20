import { identity } from '@kofno/piper';
import { KeyFn, SetWithDiscernment } from './sets';

/*
 *  Returns a new array with all the duplicates removed. Array order
 *  is preserved.
 */
export const uniq = <T>(ts: ReadonlyArray<T>): ReadonlyArray<T> => {
  const s = ts.reduce(
    (accum, v) => accum.add(v),
    new SetWithDiscernment<T, T>(identity, (x, _) => x)
  );
  return s.toArray();
};

/*
 * Returns a new array with all the duplicates removed. The result of
 * the `id` is used for the equality check.
 */
export function uniqBy<K, T>(id: KeyFn<K, T>): (array: ReadonlyArray<T>) => ReadonlyArray<T>;
export function uniqBy<K, T>(id: KeyFn<K, T>, array: ReadonlyArray<T>): ReadonlyArray<T>;
export function uniqBy<K, T>(id: KeyFn<K, T>, array?: ReadonlyArray<T>) {
  const doit = (array: ReadonlyArray<T>): ReadonlyArray<T> => {
    const s = array.reduce(
      (accum, v) => accum.add(v),
      new SetWithDiscernment<K, T>(id, (x, _) => x)
    );
    return s.toArray();
  };

  return typeof array === 'undefined' ? doit : doit(array);
}
