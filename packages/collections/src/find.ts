import { toResult } from '@execonline-inc/maybe-adapter';
import { noop } from '@kofno/piper';
import { just, Maybe, nothing } from 'maybeasy';
import { Result } from 'resulty';
import { Task } from 'taskarian';
import { byId, byPayloadId, byPayloadUuid } from './predicates';
import { first } from './take';

export interface ItemNotFound {
  kind: 'item-not-found';
  id: number;
}

export interface PayloadNotFound {
  kind: 'payload-not-found';
  id: number;
}

export interface NothingFound {
  kind: 'nothing-found';
}

export function find<T>(fn: (t: T) => boolean, ts: ReadonlyArray<T>): Maybe<T>;
export function find<T>(fn: (t: T) => boolean): (ts: ReadonlyArray<T>) => Maybe<T>;
export function find<T>(fn: (t: T) => boolean, ts?: ReadonlyArray<T>) {
  const runFind = (ts: ReadonlyArray<T>): Maybe<T> => {
    for (const t of ts) {
      if (fn(t)) {
        return just(t);
      }
    }
    return nothing<T>();
  };
  return typeof ts === 'undefined' ? runFind : runFind(ts);
}

export function findIndex<T>(fn: (t: T) => boolean, ts: ReadonlyArray<T>): Maybe<number>;
export function findIndex<T>(fn: (t: T) => boolean): (ts: ReadonlyArray<T>) => Maybe<number>;
export function findIndex<T>(fn: (t: T) => boolean, ts?: ReadonlyArray<T>) {
  const runFindIndex = (ts: ReadonlyArray<T>) => {
    const idx = ts.findIndex(fn, ts);
    return idx === -1 ? nothing() : just(idx);
  };
  return typeof ts === 'undefined' ? runFindIndex : runFindIndex(ts);
}

export const findR = <T>(fn: (t: T) => boolean) => (
  ts: ReadonlyArray<T>
): Result<NothingFound, T> => toResult<NothingFound, T>({ kind: 'nothing-found' }, find(fn, ts));

export function findItem<T extends { id: number }>(id: number): (items: T[]) => Maybe<T>;
export function findItem<T extends { id: number }>(id: number, items: T[]): Maybe<T>;
export function findItem<T extends { id: number }>(id: number, items?: T[]) {
  const finder = (items: T[]) => first(items.filter(byId(id)));
  return items ? finder(items) : finder;
}

export function findItemT<T extends { id: number }>(
  id: number
): (items: T[]) => Task<ItemNotFound, T>;
export function findItemT<T extends { id: number }>(id: number, items: T[]): Task<ItemNotFound, T>;
export function findItemT<T extends { id: number }>(id: number, items?: T[]) {
  const task = (items: T[]) =>
    new Task<ItemNotFound, T>((reject, resolve) => {
      findItem(id, items).cata({
        Just: v => resolve(v),
        Nothing: () => reject({ kind: 'item-not-found', id }),
      });
      return noop;
    });
  return items ? task(items) : task;
}

export function findPayload(
  id: number
): <T extends { payload: { id: number } }>(items: ReadonlyArray<T>) => Maybe<T>;
export function findPayload<T extends { payload: { id: number } }>(
  id: number
): (items: ReadonlyArray<T>) => Maybe<T>;
export function findPayload<T extends { payload: { id: number } }>(
  id: number,
  items: ReadonlyArray<T>
): Maybe<T>;
export function findPayload<T extends { payload: { id: number } }>(
  id: number,
  items?: ReadonlyArray<T>
) {
  const finder = (ts: ReadonlyArray<T>) => first(ts.filter(byPayloadId(id)));
  return typeof items === 'undefined' ? finder : finder(items);
}

export function findPayloadT<T extends { payload: { id: number } }>(
  id: number
): (items: ReadonlyArray<T>) => Task<PayloadNotFound, T>;
export function findPayloadT<T extends { payload: { id: number } }>(
  id: number,
  items: ReadonlyArray<T>
): Task<PayloadNotFound, T>;
export function findPayloadT<T extends { payload: { id: number } }>(
  id: number,
  items?: ReadonlyArray<T>
) {
  const task = (items: ReadonlyArray<T>) =>
    new Task((reject, resolve) => {
      findPayload(id, items).cata({
        Just: v => resolve(v),
        Nothing: () => reject({ kind: 'payload-not-found', id }),
      });
      return noop;
    });
  return items ? task(items) : task;
}

export function findPayloadByUuid<T extends { payload: { uuid: string } }>(
  uuid: string,
  items: T[]
): Maybe<T>;
export function findPayloadByUuid<T extends { payload: { uuid: string } }>(
  uuid: string
): (item: T[]) => Maybe<T>;
export function findPayloadByUuid<T extends { payload: { uuid: string } }>(
  uuid: string,
  items?: T[]
) {
  const finder = (things: T[]) => first(things.filter(byPayloadUuid(uuid)));
  return typeof items === 'undefined' ? finder : finder(items);
}
