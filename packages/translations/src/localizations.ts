import { warn } from '@execonline-inc/logging';
import { LocalizationFormat, Localizeable, TranslationsState } from './types';

const intlFormatter = (
  lng: string,
  options: Intl.DateTimeFormatOptions
): ((date: Date) => string) => new Intl.DateTimeFormat(lng, options).format;

const shortMonth = (lng: string, date: Date): string =>
  intlFormatter(lng, {
    month: 'short',
  })(date);

const dayOfMonth = (lng: string, date: Date): string =>
  intlFormatter(lng, {
    day: 'numeric',
  })(date);

const dateAndTime = (lng: string, date: Date): string =>
  intlFormatter(lng, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
  })(date);

const longMonthDayYear = (lng: string, date: Date): string =>
  intlFormatter(lng, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })(date);

const shortMonthDayYear = (lng: string, date: Date): string =>
  intlFormatter(lng, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })(date);

const monthAndYear = (lng: string, date: Date): string =>
  intlFormatter(lng, {
    month: 'long',
    year: 'numeric',
  })(date);

const narrowWeekday = (lng: string, date: Date): string =>
  intlFormatter(lng, {
    weekday: 'narrow',
  })(date);

const longWeekday = (lng: string, date: Date): string =>
  intlFormatter(lng, {
    weekday: 'long',
  })(date);

const longWeekdayMonthYear = (lng: string, date: Date): string =>
  intlFormatter(lng, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })(date);

const timeOfDay = (lng: string, date: Date): string =>
  intlFormatter(lng, {
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
  })(date);

const longDateAndTime = (lng: string, date: Date): string =>
  intlFormatter(lng, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
  })(date);

export const localization = (
  value: Localizeable,
  format: LocalizationFormat,
  lng: string
): string => {
  switch (format) {
    case 'short-month':
      return shortMonth(lng, value);
    case 'day-of-month':
      return dayOfMonth(lng, value);
    case 'date-and-time':
      return dateAndTime(lng, value);
    case 'long-month-day-year':
      return longMonthDayYear(lng, value);
    case 'short-month-day-year':
      return shortMonthDayYear(lng, value);
    case 'month-and-year':
      return monthAndYear(lng, value);
    case 'narrow-weekday':
      return narrowWeekday(lng, value);
    case 'long-weekday':
      return longWeekday(lng, value);
    case 'long-weekday-month-year':
      return longWeekdayMonthYear(lng, value);
    case 'time-of-day':
      return timeOfDay(lng, value);
    case 'long-date-and-time':
      return longDateAndTime(lng, value);
  }
};

export const localizer = (localizeable: Localizeable, format: LocalizationFormat) => (
  ts: TranslationsState
): string => {
  switch (ts.kind) {
    case 'loaded-from-fallback':
    case 'loaded':
      return localization(localizeable, format, ts.results.lng);
    case 'uninitialized':
      warn('localization is uninitialized');
      return String(localizeable);
  }
};
