import { seconds, Time } from "@execonline-inc/time";
import Decoder, { fail, field, nullable, boolean, number, oneOf, string, succeed } from "jsonous";
import { fromEmpty, just, Maybe, nothing } from "maybeasy";
import { err, ok } from "resulty";
import atob = require("atob");

export const eql = <T>(t: T): Decoder<T> =>
  new Decoder<T>(v => {
    return t === v ? ok(v) : err(`Expected ${t} but got ${v}`);
  });

export const regexDecoder = (regex: RegExp): Decoder<RegExpExecArray> =>
  string.andThen(s => {
    const result = regex.exec(s);
    return result
      ? succeed(result)
      : fail(`Expected '${s}' to match the regex '${regex.toString()}'`);
  });

export const stringLiteral = <T extends string>(t: T): Decoder<T> => eql<T>(t);

export const nullableBlankString: Decoder<Maybe<string>> = nullable(
  string
).map(s => s.andThen(fromEmpty));

export const base64Decoder: Decoder<string> = new Decoder<string>(value => {
  try {
    const decodedStr = atob(value);
    return ok(decodedStr);
  } catch (_error) {
    return err(`Expected a base64 encoded string but got ${value}`);
  }
});

export function pipeD<A, B>(a: Decoder<A>): (b: Decoder<B>) => Decoder<B>;
export function pipeD<A, B>(a: Decoder<A>, b: Decoder<B>): Decoder<B>;
export function pipeD<A, B>(a: Decoder<A>, b?: Decoder<B>) {
  const doit = (b: Decoder<B>) =>
    a.andThen(v =>
      b.decodeAny(v).cata<Decoder<B>>({
        Ok: succeed,
        Err: fail
      })
    );

  return typeof b === "undefined" ? doit : doit(b);
}

export const jsonParserDecoder = (decoder: Decoder<string>): Decoder<unknown> =>
  decoder.andThen(someString => {
    try {
      const someJson = JSON.parse(someString);
      return succeed(someJson);
    } catch {
      return fail(`Expected a string of valid JSON but got '${someString}'`);
    }
  });

export const numberToStringDecoder: Decoder<string> = number.andThen(value =>
  succeed(value.toString())
);

export const booleanToStringDecoder: Decoder<string> = boolean.andThen(value =>
  succeed(value.toString())
);

export const stringToNumberDecoder: Decoder<number> = string
  .map(s => Number(s))
  .andThen(n =>
    isNaN(n) ? fail(`Expected a number but got ${n}`) : succeed(n)
  );

export interface JsonValue {
  kind: "json-value";
  value: any;
}

const jsonValue = (value: any): JsonValue => ({ kind: "json-value", value });

export const jsonValueDecoder: Decoder<JsonValue> = new Decoder<JsonValue>(
  value => ok(jsonValue(value))
);

export const secondsDecoder: Decoder<Time> = number.map<Time>(seconds);

const explicitJust = <T>(decoder: Decoder<T>): Decoder<Maybe<T>> =>
  succeed({})
    .assign("kind", field("kind", stringLiteral("just")))
    .assign("value", field("value", decoder))
    .map(j => just(j.value));

const explicitNothing = <T>(): Decoder<Maybe<T>> =>
  field("kind", stringLiteral("nothing").map<Maybe<T>>(nothing));

export const explicitMaybe = <T>(decoder: Decoder<T>): Decoder<Maybe<T>> =>
  oneOf([explicitJust(decoder), explicitNothing()]);

export const mergeObjectDecoders = <A extends object, B extends object>(
  aDecoder: Decoder<A>,
  bDecoder: Decoder<B>
): Decoder<A & B> =>
  succeed({})
    .assign("a", aDecoder)
    .assign("b", bDecoder)
    .map(({ a, b }) => ({ ...a, ...b }));
