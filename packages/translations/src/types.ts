import { i18n, TFunction } from 'i18next';
import * as React from 'react';
import Task from 'taskarian';
import { Props as LProps } from './L';

export interface Config {
  loadPath: string;
  loadCallback: (i18n: i18n) => void;
}

export interface I18nResults {
  t: TFunction;
  lng: string;
}

export interface LoadedI18n extends I18nResults {}

export interface FallBackI18n extends I18nResults {
  failure: string;
}

export interface Uninitialized {
  kind: 'uninitialized';
}

export interface Loaded {
  kind: 'loaded';
  results: LoadedI18n;
}

export interface LoadedFromFallback {
  kind: 'loaded-from-fallback';
  results: FallBackI18n;
  error: string;
}

export type TranslationsState = Uninitialized | Loaded | LoadedFromFallback;

export type ParameterizedValue = string | number | React.ReactElement | Interpolator;

interface ParameterizedValues {
  [prop: string]: ParameterizedValue;
}

export interface ParameterizedProps<ParameterizedKeyT extends string> extends ParameterizedValues {
  kind: ParameterizedKeyT;
}

export type Props<
  PlainTextKeyT extends string,
  ParameterizedKeyT extends string,
  ParameterizedPropsT extends ParameterizedProps<ParameterizedKeyT>
> = { kind: PlainTextKeyT } | ParameterizedPropsT;

export interface NotTranslatedText {
  kind: 'not-translated-text';
  text: string;
}
export interface AlreadyTranslatedText {
  kind: 'already-translated-text';
  text: string;
}

export type Interpolator = (content: React.ReactNode) => React.ReactElement;

export interface TScalar {
  kind: 'scalar';
  value: string | number;
}
export interface TInterpolator {
  kind: 'interpolator';
  fn: Interpolator;
}
export interface TElement {
  kind: 'element';
  element: React.ReactElement;
}

export type TValue = TScalar | TInterpolator | TElement;
export type TValues = { [k: string]: TValue };

export type Parameterized<
  ParameterizedKeyT extends string,
  ParameterizedPropsT extends ParameterizedProps<ParameterizedKeyT>
> = {
  [k in Exclude<keyof ParameterizedPropsT, 'kind'>]: TValue;
};

export type ParameterizedFn<
  ParameterizedKeyT extends string,
  ParameterizedPropsT extends ParameterizedProps<ParameterizedKeyT>
> = (t: ParameterizedPropsT) => Parameterized<ParameterizedKeyT, ParameterizedPropsT>;

export type Loader = Task<FallBackI18n, LoadedI18n>;

export interface TranslationsF<KeyT, PropsT, ParameterizedValuesT> {
  loader: Loader;
  L: React.SFC<LProps>;
  translation: (
    text: KeyT,
    interpolation?: Partial<ParameterizedValuesT>
  ) => (ts: TranslationsState) => string;
  translator: (tProps: PropsT) => (ts: TranslationsState) => React.ReactNode;
  T: React.SFC<PropsT>;
}

type DateFormat =
  | 'short-month'
  | 'date-and-time'
  | 'day-of-month'
  | 'long-month-day-year'
  | 'short-month-day-year'
  | 'month-and-year'
  | 'narrow-weekday'
  | 'long-weekday'
  | 'long-weekday-month-year'
  | 'time-of-day'
  | 'long-date-and-time';

export type Localizeable = Date;

export type LocalizationFormat = DateFormat;
