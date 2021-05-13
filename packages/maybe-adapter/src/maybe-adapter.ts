import { just, Maybe, nothing } from 'maybeasy';
import { err, ok, Result } from 'resulty';
import Task from 'taskarian';

export function toResult<X, T>(e: X, thing: Maybe<T>): Result<X, T>;
export function toResult<X, T>(e: X): (thing: Maybe<T>) => Result<X, T>;
export function toResult<X, T>(e: X, thing?: Maybe<T>) {
  return thing
    ? (thing.map(ok).getOrElse(() => err(e)) as Result<X, T>)
    : (thing: Maybe<T>): Result<X, T> => thing.map(ok).getOrElse(() => err(e)) as Result<X, T>;
}

export function toTask<Failure, T>(e: Failure): (thing: Maybe<T>) => Task<Failure, T>;
export function toTask<Failure, T>(e: Failure, thing: Maybe<T>): Task<Failure, T>;
export function toTask<Failure, T>(e: Failure, thing?: Maybe<T>) {
  const doit = (thing: Maybe<T>) =>
    thing.map(Task.succeed).getOrElse(() => Task.fail(e) as Task<Failure, T>);

  return typeof thing === 'undefined' ? doit : doit(thing);
}

export type PredicateFn<T> = (t: T) => boolean;
export type Predicate = boolean;
export type PredicateParam<T> = Predicate | PredicateFn<T>;

export function when<T>(predicate: PredicateParam<T>): (result: T) => Maybe<T>;
export function when<T>(predicate: PredicateParam<T>, result: T): Maybe<T>;
export function when<T>(predicate: PredicateParam<T>, result?: T) {
  const doit = (result: T): Maybe<T> => {
    const test = typeof predicate === 'boolean' ? predicate : predicate(result);
    return test ? just(result) : nothing();
  };
  return typeof result === 'undefined' ? doit : doit(result);
}

export const fromBool = when;
