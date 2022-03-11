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
