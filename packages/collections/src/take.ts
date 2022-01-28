import { fromEmpty, fromNullable, Maybe } from 'maybeasy';

export function take<T>(howMany: number, things: ReadonlyArray<T>): ReadonlyArray<T>;
export function take<T>(howMany: number): (things: ReadonlyArray<T>) => ReadonlyArray<T>;
export function take<T>(howMany: number, things?: ReadonlyArray<T>) {
  const doit = (things: ReadonlyArray<T>): ReadonlyArray<T> => {
    return things.slice(0, howMany);
  };
  return typeof things === 'undefined' ? doit : doit(things);
}

export const first = <T>(things: ReadonlyArray<T>): Maybe<T> => fromNullable(take(1, things)[0]);

export const last = <T>(things: ReadonlyArray<T>): Maybe<T> =>
  fromEmpty(things).map(ts => ts[ts.length - 1]);

export function takeLastUntil<T>(fn: (t: T) => boolean, ts: ReadonlyArray<T>): ReadonlyArray<T>;
export function takeLastUntil<T>(fn: (t: T) => boolean): (ts: ReadonlyArray<T>) => ReadonlyArray<T>;
export function takeLastUntil<T>(fn: (t: T) => boolean, ts?: ReadonlyArray<T>) {
  const doit = (ts: ReadonlyArray<T>): ReadonlyArray<T> => {
    let i: number;
    for (i = ts.length; i > 0; i--) {
      if (fn(ts[i - 1])) {
        break;
      }
    }
    return ts.slice(i);
  };

  return typeof ts === 'undefined' ? doit : doit(ts);
}

export function takeLastWhile<T>(fn: (t: T) => boolean, ts: ReadonlyArray<T>): ReadonlyArray<T>;
export function takeLastWhile<T>(fn: (t: T) => boolean): (ts: ReadonlyArray<T>) => ReadonlyArray<T>;
export function takeLastWhile<T>(fn: (t: T) => boolean, ts?: ReadonlyArray<T>) {
  const doit = (ts: ReadonlyArray<T>): ReadonlyArray<T> => {
    let i: number;
    for (i = ts.length; i > 0; i--) {
      if (!fn(ts[i - 1])) {
        break;
      }
    }
    return ts.slice(i);
  };

  return typeof ts === 'undefined' ? doit : doit(ts);
}
