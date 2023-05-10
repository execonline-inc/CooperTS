import { reduce } from './reduce';

export const concat = <A>(as1: A[]) => (as2: A[]): A[] => as1.concat(as2);

export type NestedArray<T> = ReadonlyArray<ReadonlyArray<T>>;

export const concatAll = <T>(ts: NestedArray<T>) =>
  reduce<ReadonlyArray<T>>((accum, t) => [...accum, ...t], [], ts);
