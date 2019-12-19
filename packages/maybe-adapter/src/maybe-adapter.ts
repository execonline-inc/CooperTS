import { just, Maybe, nothing } from "maybeasy";
import { err, ok, Result } from "resulty";
import Task from "taskarian";

export function toResult<X, T>(e: X, thing: Maybe<T>): Result<X, T>;
export function toResult<X, T>(e: X): (thing: Maybe<T>) => Result<X, T>;
export function toResult<X, T>(e: X, thing?: Maybe<T>) {
  return thing
    ? (thing.map(ok).getOrElse(() => err(e)) as Result<X, T>)
    : (thing: Maybe<T>): Result<X, T> =>
        thing.map(ok).getOrElse(() => err(e)) as Result<X, T>;
}

export function toTask<Failure, T>(
  e: Failure
): (thing: Maybe<T>) => Task<Failure, T>;
export function toTask<Failure, T>(
  e: Failure,
  thing: Maybe<T>
): Task<Failure, T>;
export function toTask<Failure, T>(e: Failure, thing?: Maybe<T>) {
  const doit = (thing: Maybe<T>) =>
    thing.map(Task.succeed).getOrElse(() => Task.fail(e) as Task<Failure, T>);

  return typeof thing === "undefined" ? doit : doit(thing);
}

export function fromBool<T>(b: boolean | (() => boolean), thing: T): Maybe<T>;
export function fromBool<T>(
  b: boolean | (() => boolean)
): (thing: T) => Maybe<T>;
export function fromBool<T>(b: boolean | (() => boolean), thing?: T) {
  const doit = (thing: T): Maybe<T> => {
    b = typeof b === "boolean" ? b : b();
    return b ? just(thing) : nothing();
  };
  return typeof thing === "undefined" ? doit : doit(thing);
}
