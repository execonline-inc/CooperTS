import {
  fromDate,
  Hours,
  InvalidDate,
  milliseconds,
  Minutes,
  Seconds,
  Time,
  toHours,
  toMilliseconds,
  toMinutes,
  toSeconds,
} from '@execonline-inc/time';
import { err, ok, Result } from 'resulty';

export interface Future {
  direction: 'future';
  magnitude: Time;
}

export interface Now {
  direction: 'now';
}

export interface Past {
  direction: 'past';
  magnitude: Time;
}

export type TimeDirection = TimeVector['direction'];

export type TimeVector = Future | Now | Past;

export function distanceFrom(fromTime: Time): (toTime: Time) => TimeVector;
export function distanceFrom(fromTime: Time, toTime: Time): TimeVector;
export function distanceFrom(fromTime: Time, toTime?: Time) {
  const doit = (toTime: Time): TimeVector => {
    const start = toMilliseconds(fromTime);
    const end = toMilliseconds(toTime);
    const gap = start.milliseconds - end.milliseconds;
    if (gap === 0) {
      return { direction: 'now' };
    } else if (gap > 0) {
      return { direction: 'future', magnitude: milliseconds(gap) };
    } else {
      return { direction: 'past', magnitude: milliseconds(Math.abs(gap)) };
    }
  };

  return typeof toTime === 'undefined' ? doit : doit(toTime);
}

export function distanceFromDate(from: Date): (to: Date) => Result<InvalidDate, TimeVector>;
export function distanceFromDate(from: Date, to: Date): Result<InvalidDate, TimeVector>;
export function distanceFromDate(from: Date, to?: Date) {
  const toDistanceError = (part: string) => (invalidDate: InvalidDate): InvalidDate => ({
    ...invalidDate,
    message: `${part} is an invalid date`,
  });
  const doit = (subtrahend: Date): Result<InvalidDate, TimeVector> =>
    ok<InvalidDate, {}>({})
      .assign('from', fromDate(from).mapError(toDistanceError('from')))
      .assign('to', fromDate(subtrahend).mapError(toDistanceError('to')))
      .map<TimeVector>(({ from, to }) => distanceFrom(from, to));

  return typeof to === 'undefined' ? doit : doit(to);
}

export const toLargestMeaningfulUnit = (distance: TimeVector): TimeVector => {
  switch (distance.direction) {
    case 'now':
      return distance;
    case 'future':
    case 'past':
      return largestMeaningfulUnit(distance.magnitude)
        .map<TimeVector>(magnitude => ({ ...distance, magnitude }))
        .getOrElseValue({ direction: 'now' });
  }
};

export interface EffectivelyNow {
  kind: 'effectively-now';
  time: Time;
}

export const largestMeaningfulUnit = (
  time: Time
): Result<EffectivelyNow, Hours | Minutes | Seconds> => {
  const h = toHours(time);
  if (h.hours > 0) return ok(h);

  const m = toMinutes(time);
  if (m.minutes > 0) return ok(m);

  const s = toSeconds(time);
  return s.seconds === 0 ? err({ kind: 'effectively-now', time }) : ok(s);
};
