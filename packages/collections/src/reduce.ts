type Reducer<T, A = T> = (accum: A, t: T, i?: number) => A;

export function reduce<T, A = T>(reducer: Reducer<T, A>, initial: A): (ts: ReadonlyArray<T>) => A;
export function reduce<T, A = T>(reducer: Reducer<T, A>, initial: A, ts: ReadonlyArray<T>): A;
export function reduce<T, A = T>(reducer: Reducer<T, A>, initial: A, ts?: ReadonlyArray<T>) {
  const doit = (ts: ReadonlyArray<T>): A => ts.reduce(reducer, initial);
  return typeof ts === 'undefined' ? doit : doit(ts);
}
