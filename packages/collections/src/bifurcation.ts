export function bifurcateWhen<T>(
  delim: (t: T) => boolean
): (ts: ReadonlyArray<T>) => [ReadonlyArray<T>, ReadonlyArray<T>];
export function bifurcateWhen<T>(
  delim: (t: T) => boolean,
  ts: ReadonlyArray<T>
): [ReadonlyArray<T>, ReadonlyArray<T>];
export function bifurcateWhen<T>(delim: (t: T) => boolean, ts?: ReadonlyArray<T>) {
  interface Tuple {
    found: boolean;
    head: ReadonlyArray<T>;
    tail: ReadonlyArray<T>;
  }
  const doit = (ts: ReadonlyArray<T>) => {
    const reducer = (memo: Tuple, v: T): Tuple => {
      if (memo.found) {
        return { ...memo, tail: [...memo.tail, v] };
      } else if (delim(v)) {
        return { ...memo, found: true };
      } else {
        return { ...memo, head: [...memo.head, v] };
      }
    };
    const { head, tail } = ts.reduce(reducer, {
      found: false,
      head: [],
      tail: [],
    });
    return [head, tail];
  };
  return typeof ts === 'undefined' ? doit : doit(ts);
}

export function bifurcateBy<T>(
  fn: (t: T) => boolean
): (ts: ReadonlyArray<T>) => [ReadonlyArray<T>, ReadonlyArray<T>];
export function bifurcateBy<T>(
  fn: (t: T) => boolean,
  ts: ReadonlyArray<T>
): [ReadonlyArray<T>, ReadonlyArray<T>];
export function bifurcateBy<T>(fn: (t: T) => boolean, ts?: ReadonlyArray<T>) {
  interface Tuple {
    head: ReadonlyArray<T>;
    tail: ReadonlyArray<T>;
  }
  const doit = (ts: ReadonlyArray<T>) => {
    const reducer = (memo: Tuple, t: T): Tuple =>
      fn(t) ? { ...memo, head: [...memo.head, t] } : { ...memo, tail: [...memo.tail, t] };
    const { head, tail } = ts.reduce(reducer, { head: [], tail: [] });
    return [head, tail];
  };
  return typeof ts === 'undefined' ? doit : doit(ts);
}
