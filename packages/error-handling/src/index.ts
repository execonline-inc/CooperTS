import { just, Maybe, nothing } from 'maybeasy';
import { err, ok, Result } from 'resulty';
import { Task } from 'taskarian';

export const asTask = <E, T>(result: Result<E, T>): Task<E, T> =>
  result.cata<Task<E, T>>({ Ok: Task.succeed, Err: Task.fail });

export const asMaybe = <E, T>(result: Result<E, T>): Maybe<T> =>
  result.cata<Maybe<T>>({ Ok: just, Err: nothing });

export const runResult = <T>(throwable: () => T): Result<unknown, T> => {
  try {
    const value = throwable();
    return ok(value);
  } catch (e) {
    return err(e);
  }
};

export const runMaybe = <T>(throwable: () => T): Maybe<T> => asMaybe(runResult(throwable));

export const runTask = <T>(throwable: () => T): Task<unknown, T> => asTask(runResult(throwable));
