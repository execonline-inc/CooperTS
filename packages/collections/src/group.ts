export type Group<T> = { [key: string]: T[] };

export const groupBy = <T>(keyFn: (item: T) => string) => (
  ts: ReadonlyArray<T>
): Group<T> =>
  ts.reduce((groups, t) => {
    const key = keyFn(t);
    const val = groups[key];
    groups[key] = val || [];
    groups[key].push(t);
    return groups;
  }, {} as Group<T>);

export const toPairs = <T>(obj: {
  [k: string]: T;
}): ReadonlyArray<[string, T]> =>
  Object.keys(obj).reduce<Array<[string, T]>>(
    (accum, key) => [...accum, [key, obj[key]]],
    []
  );
