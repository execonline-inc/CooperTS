import { toResult, toTask, when } from '@execonline-inc/maybe-adapter';
import { UnaryFunction, pipe } from '@kofno/piper';
import { Maybe, just, nothing } from 'maybeasy';
import { Result } from 'resulty';
import { Task } from 'taskarian';

export const percentage = (nbr: number): string => {
  return `${Math.round(nbr)}%`;
};

export interface NumberParseFailure {
  kind: 'number-parse-failure';
  message: string;
}

const numberParseFailure = (): NumberParseFailure => {
  return {
    kind: 'number-parse-failure',
    message: `Couldn't parse string into a number`,
  };
};

export const parseIntM = (value: string): Maybe<number> => {
  const n = parseInt(value, 10);
  return isNaN(n) ? nothing() : just(n);
};

export const parseIntR = pipe(parseIntM, toResult(numberParseFailure())) as UnaryFunction<
  string,
  Result<NumberParseFailure, number>
>;

export const parseIntT = pipe(parseIntM, toTask(numberParseFailure())) as UnaryFunction<
  string,
  Task<NumberParseFailure, number>
>;

export function clamp(min: number, max: number): (value: number) => number;
export function clamp(min: number, max: number, value: number): number;
export function clamp(min: number, max: number, value?: number) {
  const doit = (value: number) => Math.min(Math.max(value, min), max);
  return typeof value === 'undefined' ? doit : doit(value);
}

export const gt = (min: number) => (value: number) => value > min;
export const lt = (max: number) => (value: number) => value < max;
export const gte = (min: number) => (value: number) => value >= min;
export const lte = (max: number) => (value: number) => value <= max;
export const eq = (value: number) => (other: number) => value === other;
export const neq = (value: number) => (other: number) => value !== other;
export const between = (min: number, max: number) => (value: number) => value > min && value < max;
export const betweenEq = (min: number, max: number) => (value: number) =>
  value >= min && value <= max;
export const even = (value: number) => value % 2 === 0;
export const odd = (value: number) => value % 2 !== 0;
export const positive = (value: number) => value > 0;
export const negative = (value: number) => value < 0;
export const zero = eq(0);
export const multiplyBy = (input: number) => (value: number) => value * input
export const divideBy = (input: number) => (value: number) => value / input
export const add = (input: number) => (value: number) => value + input
export const subtractby = (input: number) => (value: number) => value - input

export const whenPositive = when(positive);
export const whenNegative = when(negative);
export const whenZero = when(zero);
export const whenOdd = when(odd);
export const whenEven = when(even);
export const whenGt = (min: number) => when(gt(min));
export const whenLt = (max: number) => when(lt(max));
export const whenGte = (min: number) => when(gte(min));
export const whenLte = (max: number) => when(lte(max));
export const whenBetween = (min: number, max: number) => when(between(min, max))
export const whenBetweenEq = (min: number, max: number) => when(betweenEq(min, max))
