interface M<T> {
  index: number;
  value: T;
}

export type SortComparator<T> = (a: T, b: T) => number;

/**
 * Provides stable sorting of an array for a given `cmp` comparison function.
 */
export function sort<T>(
  cmp: SortComparator<T>,
  ts: ReadonlyArray<T>
): ReadonlyArray<T>;
export function sort<T>(
  cmp: SortComparator<T>
): (ts: ReadonlyArray<T>) => ReadonlyArray<T>;
export function sort<T>(cmp: SortComparator<T>, ts?: ReadonlyArray<T>) {
  const sorter = (ts: ReadonlyArray<T>): ReadonlyArray<T> =>
    ts
      .map<M<T>>((t, i) => ({ index: i, value: t }))
      .sort(
        (a: M<T>, b: M<T>): number => cmp(a.value, b.value) || a.index - b.index
      )
      .map(({ value }) => value);
  return typeof ts === "undefined" ? sorter : sorter(ts);
}
