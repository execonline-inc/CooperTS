export function truncate(length: number, str: string): string;
export function truncate(length: number): (str: string) => string;
export function truncate(length: number, str?: string) {
  const elipses = '…';
  const endIndex = Math.max(0, length - elipses.length);
  const doit = (str: string) =>
    str.length > length ? `${str.substring(0, endIndex)}${elipses}` : str;
  return typeof str === 'undefined' ? doit : doit(str);
}
