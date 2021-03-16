import { find } from '@execonline-inc/collections';
import { warn } from '@execonline-inc/logging';
import { toResult } from '@execonline-inc/maybe-adapter';
import { identity } from '@kofno/piper';
import { fromNullable } from 'maybeasy';
import { observer } from 'mobx-react';
import * as React from 'react';
import { err, ok, Result } from 'resulty';
import L from './L';
import { ChildNode, RootNode, TagNode, translationDecoder } from './Parser';
import TranslationsContext from './TranslationsContext';
import {
  AlreadyTranslatedText,
  Interpolator,
  Loaded,
  LoadedFromFallback,
  Parameterized,
  ParameterizedFn,
  ParameterizedProps,
  Props,
  TElement,
  TInterpolator,
  TranslationsF,
  TranslationsState,
  Translator,
  TScalar,
  TValues,
} from './types';

export const loaded = (translator: Translator, language: string): Loaded => ({
  kind: 'loaded',
  translator,
  language,
});

export const loadedFromFallback = (
  translator: Translator,
  language: string,
  error: string
): LoadedFromFallback => ({
  kind: 'loaded-from-fallback',
  translator,
  language,
  error,
});

export const scalar = (value: string | number): TScalar => ({
  kind: 'scalar',
  value,
});
export const interpolator = (fn: Interpolator): TInterpolator => ({
  kind: 'interpolator',
  fn,
});
export const element = (element: React.ReactElement): TElement => ({
  kind: 'element',
  element,
});
export const alreadyTranslated = (text: string): AlreadyTranslatedText => ({
  kind: 'already-translated-text',
  text,
});

const is = <T extends string>(texts: ReadonlyArray<T>) => (tkey: string): tkey is T =>
  find(v => tkey === v, texts)
    .map(_ => true)
    .getOrElseValue(false);

export const parameterized = <
  ParameterizedKeyT extends string,
  ParameterizedPropsT extends ParameterizedProps<ParameterizedKeyT>
>(
  _: ParameterizedPropsT,
  v: Parameterized<ParameterizedKeyT, ParameterizedPropsT>
): Parameterized<ParameterizedKeyT, ParameterizedPropsT> => v;

export const translations = <
  PlainTextKeyT extends string,
  NotTranslatableT extends string,
  ParameterizedKeyT extends string,
  ParameterizedPropsT extends ParameterizedProps<ParameterizedKeyT>
>(
  plainTextKeys: ReadonlyArray<PlainTextKeyT>,
  notTranslatable: ReadonlyArray<NotTranslatableT>,
  parameterizedValues: ParameterizedFn<ParameterizedKeyT, ParameterizedPropsT>
): TranslationsF<
  ParameterizedKeyT | PlainTextKeyT | NotTranslatableT,
  Props<PlainTextKeyT | NotTranslatableT, ParameterizedKeyT, ParameterizedPropsT>,
  Omit<ParameterizedPropsT, 'kind'>
> => {
  type KeyT = PlainTextKeyT | NotTranslatableT | ParameterizedKeyT;
  type PlainTextPropsT = { kind: PlainTextKeyT | NotTranslatableT };
  type PropsT = PlainTextPropsT | ParameterizedPropsT;
  type ParameterizedValuesT = Omit<ParameterizedPropsT, 'kind'>;

  const isNotTranslatable = is<NotTranslatableT>(notTranslatable);
  const isPlainTextKey = is<PlainTextKeyT>(plainTextKeys);
  const isParameterized = (props: PropsT): props is ParameterizedPropsT =>
    !isPlainTextKey(props.kind);

  const asNotTranslatable = (key: KeyT): Result<KeyT, NotTranslatableT> =>
    isNotTranslatable(key) ? ok(key) : err(key);

  const asParameterized = (props: PropsT): Result<PlainTextPropsT, ParameterizedPropsT> =>
    isParameterized(props) ? ok(props) : err(props);

  const translation = (text: KeyT, values: Partial<ParameterizedValuesT> = {}) => (
    ts: TranslationsState
  ): string => {
    switch (ts.kind) {
      case 'loaded-from-fallback':
      case 'loaded':
        return asNotTranslatable(text)
          .map<string>(identity)
          .getOrElse(() => ts.translator(text, values));
      case 'uninitialized':
        warn('translation is uninitialized');
        return '';
    }
  };

  const interpolate = (
    kind: ParameterizedKeyT,
    node: TagNode,
    values: TValues,
    idx: number
  ): React.ReactElement => {
    const wrapper = (key: string | number, children?: React.ReactNode) => (
      <React.Fragment key={key}>{children}</React.Fragment>
    );

    return toResult('node did not have an interpolation value', fromNullable(values[node.name]))
      .andThen(tv => {
        switch (tv.kind) {
          case 'element':
            return ok(wrapper(idx, tv.element));
          case 'scalar':
            return ok(wrapper(idx, tv.value));
          case 'interpolator':
            return toResult('expected node to have children', node.children)
              .map(({ toArray }) => toArray())
              .map(children =>
                children.map((child, i) => {
                  switch (child.kind) {
                    case 'tag':
                      return interpolate(kind, child, values, i);
                    case 'text':
                      return wrapper(i, child.text);
                  }
                })
              )
              .map(translated => wrapper(idx, tv.fn(translated)));
        }
      })
      .elseDo(errMsg =>
        warn(
          `Translation interpolation error with translation key "${kind}" for node named "${node.name}": ${errMsg}`
        )
      )
      .getOrElse(() => wrapper(idx));
  };

  const parse = (translation: string): Result<string, RootNode> =>
    translationDecoder.decodeAny(translation);

  const nodeToElement = (
    kind: ParameterizedKeyT,
    values: TValues,
    node: ChildNode,
    key: number
  ): React.ReactElement => {
    switch (node.kind) {
      case 'text':
        return <React.Fragment key={key}>{node.text}</React.Fragment>;
      case 'tag':
        return interpolate(kind, node, values, key);
    }
  };

  const nodes = (
    kind: ParameterizedKeyT,
    translation: string,
    values: TValues
  ): React.ReactElement[] =>
    parse(translation)
      .andThen(node => toResult(`Translation "${kind}" had no parsed children`, node.children))
      .map(({ toArray }) => toArray().map((n, i) => nodeToElement(kind, values, n, i)))
      .elseDo(warn)
      .getOrElseValue([]);

  const translator = (tProps: PropsT) => (ts: TranslationsState): React.ReactNode => {
    const { kind, ...values } = tProps;
    const t = translation(kind, values)(ts);
    return asParameterized(tProps)
      .map<React.ReactNode>(props => nodes(props.kind, t, parameterizedValues(props)))
      .getOrElse(() => <React.Fragment key={kind}>{t}</React.Fragment>);
  };

  const T: React.FC<PropsT> = observer(tProps => (
    <TranslationsContext.Consumer>{translator(tProps)}</TranslationsContext.Consumer>
  ));

  return {
    L,
    translation,
    translator,
    T,
  };
};
