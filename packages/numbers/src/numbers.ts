import { toResult, toTask } from '@execonline-inc/maybe-adapter';
import { pipe, UnaryFunction } from '@kofno/piper';
import { just, Maybe, nothing } from 'maybeasy';
import { Result } from 'resulty';
import Task from 'taskarian';

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
