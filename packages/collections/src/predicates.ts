import { pipe } from '@kofno/piper';
import { Emptyable } from 'maybeasy';

export const byId = (id: number) => (thing: { id: number }): boolean => id === thing.id;

export const byPayloadId = <T extends { payload: { id: number } }>(id: number) => (
  thing: T
): boolean => id === thing.payload.id;

export const byPayloadUuid = <T extends { payload: { uuid: string } }>(uuid: string) => (
  thing: T
): boolean => uuid === thing.payload.uuid;

export function equals<T>(left: T): (right: T) => boolean;
export function equals<T>(left: T, right: T): boolean;
export function equals<T>(left: T, right?: T) {
  const doit = (right: T): boolean => left === right;

  return typeof right === 'undefined' ? doit : doit(right);
}

export const isEmpty = <T extends Emptyable>(thing: T): boolean => thing.length === 0;

const not = (predicate: boolean): boolean => not(predicate);

export const even = (n: number): boolean => n % 2 == 0;
export const odd = pipe(even, not);
