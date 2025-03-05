import { err, ok, Result } from 'resulty';

export interface Milliseconds {
  kind: 'milliseconds';
  milliseconds: number;
}

export interface Seconds {
  kind: 'seconds';
  seconds: number;
}

export interface Minutes {
  kind: 'minutes';
  minutes: number;
}

export interface Hours {
  kind: 'hours';
  hours: number;
}

export interface Days {
  kind: 'days';
  days: number;
}

export type Time = Days | Hours | Minutes | Seconds | Milliseconds;

export const milliseconds = (value: number): Milliseconds => ({
  kind: 'milliseconds',
  milliseconds: value,
});

export const seconds = (value: number): Seconds => ({
  kind: 'seconds',
  seconds: value,
});

export const minutes = (value: number): Minutes => ({
  kind: 'minutes',
  minutes: value,
});

export const hours = (value: number): Hours => ({
  kind: 'hours',
  hours: value,
});

export const days = (value: number): Days => ({
  kind: 'days',
  days: value,
});

export const toMilliseconds = (time: Time): Milliseconds => {
  switch (time.kind) {
    case 'milliseconds':
      return time;
    case 'seconds':
      return milliseconds(Math.floor(time.seconds * 1000));
    case 'minutes':
      return milliseconds(Math.floor(time.minutes * 60 * 1000));
    case 'hours':
      return milliseconds(Math.floor(time.hours * 60 * 60 * 1000));
    case 'days':
      return milliseconds(Math.floor(time.days * 24 * 60 * 60 * 1000));
  }
};

export const toSeconds = (time: Time): Seconds => {
  switch (time.kind) {
    case 'milliseconds':
      return seconds(Math.floor(time.milliseconds / 1000));
    case 'seconds':
      return time;
    case 'minutes':
      return seconds(Math.floor(time.minutes * 60));
    case 'hours':
      return seconds(Math.floor(time.hours * 60 * 60));
    case 'days':
      return seconds(Math.floor(time.days * 24 * 60 * 60));
  }
};

export const toMinutes = (time: Time): Minutes => {
  switch (time.kind) {
    case 'milliseconds':
      return minutes(Math.floor(time.milliseconds / 60 / 1000));
    case 'seconds':
      return minutes(Math.floor(time.seconds / 60));
    case 'minutes':
      return time;
    case 'hours':
      return minutes(Math.floor(time.hours * 60));
    case 'days':
      return minutes(Math.floor(time.days * 24 * 60));
  }
};

export const toHours = (time: Time): Hours => {
  switch (time.kind) {
    case 'milliseconds':
      return hours(Math.floor(time.milliseconds / 60 / 60 / 1000));
    case 'seconds':
      return hours(Math.floor(time.seconds / 60 / 60));
    case 'minutes':
      return hours(Math.floor(time.minutes / 60));
    case 'hours':
      return time;
    case 'days':
      return hours(Math.floor(time.days * 24));
  }
};

export const toDays = (time: Time): Days => {
  switch (time.kind) {
    case 'milliseconds':
      return days(Math.floor(time.milliseconds / 24 / 60 / 60 / 1000));
    case 'seconds':
      return days(Math.floor(time.seconds / 24 / 60 / 60));
    case 'minutes':
      return days(Math.floor(time.minutes / 24 / 60));
    case 'hours':
      return days(Math.floor(time.hours / 24));
    case 'days':
      return time;
  }
};

export const toJS = (time: Time): number => toMilliseconds(time).milliseconds;

export interface InvalidDate {
  kind: 'invalid-date';
  message: string;
  date: Date;
}

export const fromDate = (date: Date): Result<InvalidDate, Time> => {
  const time = date.getTime();
  return isNaN(time)
    ? err({ kind: 'invalid-date', message: 'milliseconds is NaN', date })
    : ok(milliseconds(time));
};
