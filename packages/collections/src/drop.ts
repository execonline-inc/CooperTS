export function drop<T>(howMany: number, things: ReadonlyArray<T>): ReadonlyArray<T>;
export function drop<T>(howMany: number): (things: ReadonlyArray<T>) => ReadonlyArray<T>;
export function drop<T>(howMany: number, things?: ReadonlyArray<T>) {
  const doit = (things: ReadonlyArray<T>): ReadonlyArray<T> => {
    return things.slice(howMany);
  };
  return typeof things === 'undefined' ? doit : doit(things);
}

export function dropUntil<T>(fn: (t: T) => boolean, ts: ReadonlyArray<T>): ReadonlyArray<T>;
export function dropUntil<T>(fn: (t: T) => boolean): (ts: ReadonlyArray<T>) => ReadonlyArray<T>;
export function dropUntil<T>(fn: (t: T) => boolean, ts?: ReadonlyArray<T>) {
  const doit = (ts: ReadonlyArray<T>): ReadonlyArray<T> => {
    let i: number;
    for (i = 0; i < ts.length; i++) {
      if (fn(ts[i])) {
        break;
      }
    }
    return ts.slice(i);
  };

  return typeof ts === 'undefined' ? doit : doit(ts);
}
