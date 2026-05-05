import { describe, expect, it } from 'bun:test';
import i18next from 'i18next';
import {
  alreadyTranslated,
  alreadyTranslatedText,
  defaultSettings,
  initTask,
  languageTag,
  loaded,
  loadedFromFallback,
  translations,
} from '../src';
import type { Loaded, LoadedFromFallback, Translator, Uninitialized } from '../src';

const fakeTranslator: Translator = (key, _options) => `t:${key}`;

describe('defaultSettings', () => {
  it('declares the translations namespace', () => {
    expect(defaultSettings.ns).toEqual(['translations']);
    expect(defaultSettings.defaultNS).toBe('translations');
  });

  it('falls back to english', () => {
    expect(defaultSettings.fallbackLng).toBe('en');
  });

  it('disables key/namespace separators so dots in keys are preserved', () => {
    expect(defaultSettings.keySeparator).toBe(false);
    expect(defaultSettings.nsSeparator).toBe(false);
  });

  it('disables react-style escaping in interpolation', () => {
    expect(defaultSettings.interpolation?.escapeValue).toBe(false);
  });
});

describe('initTask (i18next adapter)', () => {
  it('resolves with a Loaded state, language, and translator on successful init', async () => {
    const result = await new Promise<Loaded | LoadedFromFallback>((resolve, reject) => {
      initTask(i18next, {
        ...defaultSettings,
        lng: 'en',
        debug: false,
        resources: {
          en: { translations: { hello: 'Hello', greet: 'Hi {{name}}' } },
        },
      }).fork(reject, resolve);
    });

    expect(result.kind).toBe('loaded');
    expect(result.language).toBe('en');
    expect(result.translator('hello', {})).toBe('Hello');
    expect(result.translator('greet', { name: 'Ada' })).toBe('Hi Ada');
  });
});

describe('translation', () => {
  const plainKeys = ['hello', 'world'] as const;
  const notTranslatable = ['user@example.com'] as const;
  const { translation } = translations<
    typeof plainKeys[number],
    typeof notTranslatable[number],
    never,
    { kind: never }
  >(plainKeys, notTranslatable, () => ({} as never));

  it('returns the empty string for an uninitialized state', () => {
    const state: Uninitialized = { kind: 'uninitialized' };
    expect(translation('hello', {})(state)).toBe('');
  });

  it('looks up a key via the translator when loaded', () => {
    const state = loaded(fakeTranslator, 'en');
    expect(translation('hello', {})(state)).toBe('t:hello');
  });

  it('returns not-translatable keys unchanged without calling the translator', () => {
    let called = false;
    const trackingTranslator: Translator = (key, _options) => {
      called = true;
      return `t:${key}`;
    };
    const state = loaded(trackingTranslator, 'en');
    expect(translation('user@example.com', {})(state)).toBe('user@example.com');
    expect(called).toBe(false);
  });

  it('uses the translator even in the loaded-from-fallback state', () => {
    const state = loadedFromFallback(fakeTranslator, 'en', 'boom');
    expect(translation('world', {})(state)).toBe('t:world');
  });
});

describe('alreadyTranslatedText decoder', () => {
  it('decodes a string into an AlreadyTranslatedText', () => {
    const result = alreadyTranslatedText.decodeAny('already done');
    expect(result.getOrElseValue(alreadyTranslated('fallback'))).toEqual({
      kind: 'already-translated-text',
      text: 'already done',
    });
  });

  it('fails to decode a non-string value', () => {
    const result = alreadyTranslatedText.decodeAny(42);
    expect(result.cata({ Ok: () => false, Err: () => true })).toBe(true);
  });
});

describe('languageTag', () => {
  it('returns the primary tag from a hyphenated language', () => {
    expect(languageTag('en-US').getOrElseValue('')).toBe('en');
    expect(languageTag('zh-Hant-TW').getOrElseValue('')).toBe('zh');
  });

  it('returns the input when no hyphen is present', () => {
    expect(languageTag('fr').getOrElseValue('')).toBe('fr');
  });
});
