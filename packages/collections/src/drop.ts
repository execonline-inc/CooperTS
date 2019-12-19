export function dropUntil<T>(fn: (t: T) => boolean, ts: T[]): T[];
export function dropUntil<T>(fn: (t: T) => boolean): (ts: T[]) => T[];
export function dropUntil<T>(fn: (t: T) => boolean, ts?: T[]) {
  const doit = (ts: T[]): T[] => {
    let i: number;
    for (i = 0; i < ts.length; i++) {
      if (fn(ts[i])) {
        break;
      }
    }
    return ts.slice(i);
  };

  return typeof ts === "undefined" ? doit : doit(ts);
}
