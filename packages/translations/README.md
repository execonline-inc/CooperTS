# `translations`

The `translations` package provides a library for support of typed translation keys and typed React-based translation interpolation.

## Usage

This library uses the [i18next](https://www.i18next.com/) library underneath a custom adapter. The i18next library handles translating, pluralizing, and basic interpolation (using `{{abc}}` placeholders).

The custom adapter implementation handles type-checking and component interpolation (using `<abc/>` and `<abc>...</abc>` placeholders).

All translation content must be added to the translation files whose location is specified with the `loadPath` configuration which is passed to i18next.

See the `translations` function for integrating the library into an application. Create a translations module in the application and export the relevant things.

## Types

## Components

### `AlreadyTranslated`

This component represents content that has already been translated (such as pre-translated content from a backend). Its use in a component tree helps to distinguish content that has been addressed for translation with content that has not.

```tsx
import { AlreadyTranslated, AlreadyTranslatedText } from '@execonline-inc/translations';

const text: AlreadyTranslatedText = { kind: 'already-translated-text', text: 'content' };
const component = <AlreadyTranslated content={text} />;
```

### `L`

This component will localize a date/time according to a given format.

```ts
import { LocalizationFormat, Localizeable, translations } from '@execonline-inc/translations';
const { L } = translations<...>(...) // see `translations` documentation

const localizeable: Localizeable = new Date();
const format: LocalizationFormat = 'long-date-and-time';

const component = <L localizeable={localizeable} format={format} />;
```

### `T`

This component performs all available translation features given a typed translation definition via its props.

```tsx
import { translations } from '@execonline-inc/translations';
const { T } = translations<...>(...) // see `translations` documentation

const component = <T kind="something to translate" />;
```

### `NotTranslated`

Some content is not suitable for translation. Some examples of this are:

- proper names (though there may be cases where they can be represented in the target language)
- email addresses
- URLs

Rendering this type of content directly in component trees may be confused with content that hasn't been addressed for translation yet, so wrapping it in this component makes it clear that it has been considered for translation.

```tsx
import { NotTranslated } from '@execonline-inc/translations';

const text: string = 'not translatable';
const component = <NotTranslated text={text} />;
```

### `TranslationsContext`

This component is an implementation of a [React Context](https://reactjs.org/docs/context.html) whose data is a `TranslationsState`.

```tsx
import { TranslationsContext, TranslationsState } from '@execonline-inc/translations';

const state: TranslationsState = { kind: 'uninitialized' };
const consumer = (ts: TranslationsState): React.ReactNode => <>{ts.kind}</>;

const Example: React.FC = () => (
  <TranslationsContext.Provider value={state}>
    <TranslationsContext.Consumer>{consumer}</TranslationsContext.Consumer>
  </TranslationsContext.Provider>
);
```

### `TranslationsLoader`

This component loads the the translations when it is mounted and wraps its children in a `TranslationsContext.Provider`. It renders the component passed as the `loading` prop until the translations are loaded to prevent the normal child components from rendering without content (because it's awaiting translation) and eventually appearing suddenly.

```tsx
import { translations, TranslationsLoader } from '@execonline-inc/translations';
const { loader } = translations<...>(...) // see `translations` documentation

const component = <TranslationsLoader loader={loader} loading={<></>} />;
```

## Functions

### `alreadyTranslatedText`

This decoder decodes to an `AlreadyTranslatedText` object from a string.

```ts
import { alreadyTranslatedText, AlreadyTranslatedText } from '@execonline-inc/translations';

const decoder: Decoder<AlreadyTranslatedText> = alreadyTranslatedText;
const result: Result<string, AlreadyTranslatedText> = decoder.decodeAny('content');
```

### `defaultSettings`

These are default settings for `i18next` based on ExecOnline's use of the library.

### `initTask`

This function will return a `Task` to initialize `i18next`. It provides the opportunity for `i18next` to be configured as necessary by the user of this library.

```tsx
import { initTask, TranslationsLoader } from '@execonline-inc/translations';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

const i18nextSettings = {
  /* ... */
};

const i18nextWithModules = i18next.use(HttpApi).use(LanguageDetector);

const loader = initTask(i18nextWithModules, i18nextSettings);

<TranslationsLoader loader={loader} loading={<></>} />;
```

### `localization`

This function will localize a date/time for a given language and according to a given format.

```ts
import { localization, LocalizationFormat, Localizeable } from '@execonline-inc/translations';

const localizeable: Localizeable = new Date();
const format: LocalizationFormat = 'long-date-and-time';
const language = 'en-US';

const result = localization(localizeable, format, language);
```

### `localizer`

This curried function will localize a date/time according to a given format under certain translation mapping load states.

When the state is `loaded` or `loaded-from-fallback`, localization occurs via a call to `localization`.

When the state is `uninitialized`, the localizeable argument is converted to a string.

```ts
import {
  localizer,
  LocalizationFormat,
  Localizeable,
  TranslationsState,
} from '@execonline-inc/translations';

const localizeable: Localizeable = new Date();
const format: LocalizationFormat = 'long-date-and-time';
const state: TranslationsState = { kind: 'uninitialized' };

const result: string = localizer(localizeable, format)(state);
```

### `translation`

This curried function performs the lookup in the translation mapping file and simple interpolation when appropriate based on the text to be translated and the state of the mapping.

When the state is `loaded` or `loaded-from-fallback`, the mapped translation text is returned. If the text is found to be "not translatable", then it is returned without translation.

When the state is `uninitialized`, an empty string is returned.

```ts
import { translations, TranslationsState } from '@execonline-inc/translations';
const { translation } = translations<...>(...) // see `translations` documentation

const state: TranslationsState = { kind: 'uninitialized' };
const result: string = translation('something to translate', {})(state);
```

### `translator`

This curried function performs all available translation features given a typed translation definition and the mapping load state.

```ts
import { translations, TranslationsState } from '@execonline-inc/translations';
const { translator } = translations<...>(...) // see `translations` documentation

const state: TranslationsState = { kind: 'uninitialized' };
const result: React.ReactNode = translator({ kind: 'something to translate' })(state);
```

### `translations`

This function returns an object of functions and components that are typed according to the translation types provided to the `translations` function.

```ts
import {
  Config,
  translations,
  interpolator,
  Interpolator,
  parameterized,
  Parameterized,
  ParameterizedFn,
  scalar,
} from '@execonline-inc/translations';
import i18next, * as i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const loader = initTask(i18next.use(LanguageDetector), {
  ...defaultSettings,
  backend: {
    loadPath: 'public/locales/{{lng}}/{{ns}}.json',
  },
});

const translatablePlainTextKeys = ['something to translate', 'something else'] as const;
const notTranslatable = ['email@example.com', 'https://example.com/'] as const;

type TranslatablePlainTextKey = typeof translatablePlainTextKeys[number];
type NotTranslatable = typeof notTranslatable[number];
type ParameterizedProps =
  | { kind: '{{count}} minutes'; count: number }
  | { kind: '<bolded>So</bolded> cool!'; bolded: Interpolator };

type PlainTextKey = TranslatablePlainTextKey | NotTranslatable;
type ParameterizedKey = ParameterizedProps['kind'];

const parameterizedValues: ParameterizedFn<ParameterizedKey, ParameterizedProps> = (
  props: ParameterizedProps
): Parameterized<ParameterizedKey, ParameterizedProps> => {
  switch (props.kind) {
    case '{{count}} minutes':
      return parameterized(props, { count: scalar(props.count) });
    case '<bolded>So</bolded> cool!':
      return parameterized(props, { bolded: interpolator(props.bolded) });
  }
};

const { L, translation, translator, T } = translations<
  PlainTextKey,
  NotTranslatable,
  ParameterizedKey,
  ParameterizedProps
>(translatablePlainTextKeys, notTranslatable, parameterizedValues);
```
