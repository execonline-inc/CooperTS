import Decoder, { number, succeed, string, fail } from 'jsonous';
import { ok, err } from 'resulty';

export const eql = <T>(t: T): Decoder<T> =>
  new Decoder<T>(v => {
    return t === v ? ok(v) : err(`Expected ${t} but got ${v}`);
  });

export const stringLiteral = <T extends string>(t: T): Decoder<T> =>
  new Decoder<T>(v => {
    return t === v ? ok(v) : err(`Expected ${t} but got ${v}`);
  });

export const numberToStringDecoder: Decoder<string> = number.andThen(value => {
  return succeed(value.toString());
});

export const stringToNumberDecoder: Decoder<number> = string.map(s => Number(s)).andThen(n => {
  return isNaN(n) ? fail(`Expected a number but got ${n}`) : succeed(n);
});
