export const concat = <A>(as1: A[]) => (as2: A[]): A[] => as1.concat(as2);

export const concatAll = <T>(ary: ReadonlyArray<T[]>): ReadonlyArray<T> => {
  return ary.reduce((memo, a) => [...memo, ...a]);
};
