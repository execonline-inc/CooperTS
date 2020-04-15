# `decoders`

The `decoders` package provides useful utility decoder implementations.

```ts
import * as decoders from '@execonline-inc/decoders';

import Decoder, { fail, field, succeed } from 'jsonous';
import { fromEmpty, Maybe } from 'maybeasy';
import { Result } from 'resulty';
```

## Functions

### `eql`, `stringLiteral`

The `eql` decoder decodes for a specific value rather than some type. The `stringLiteral` decoder is an application of the `eql` decoder for just `string` values.

```ts
import { eql } from '@execonline-inc/decoders';
import Decoder from 'jsonous';
import { Result } from 'resulty';

const example: Decoder<123> = eql<123>(123);
const result: Result<string, 123> = example.decodeAny(123);
```

```ts
import { stringLiteral } from '@execonline-inc/decoders';
import Decoder from 'jsonous';
import { Result } from 'resulty';

const example: Decoder<'abc'> = stringLiteral('abc');
const result: Result<string, 'abc'> = example.decodeAny('abc');
```

### `regexDecoder`

```ts
import { regexDecoder } from '@execonline-inc/decoders';
import Decoder, { fail, succeed } from 'jsonous';

const example: Decoder<string> = regexDecoder(/(abc)/).andThen(result =>
  fromEmpty(result[1]).map(str => succeed(str).getOrElse(() => fail('Could not find "abc"')))
);
```

### `nullableBlankString`

This decoder handles a value that should be a string but could also be `null` or `undefined` and converts it to a `Maybe`.

```ts
import { nullableBlankString } from '@execonline-inc/decoders';
import Decoder from 'jsonous';
import { Result } from 'resulty';

const example: Decoder<Maybe<string>> = nullableBlankString;
const result: Result<string, Maybe<string>> = example.decodeAny('abc');
```

### `base64Decoder`

This decoder decodes input as base64 using the browser's `atob` function. A decoder error is the result from any thrown errors.

```ts
import { base64Decoder } from '@execonline-inc/decoders';
import Decoder from 'jsonous';
import { Result } from 'resulty';

const example: Decoder<string> = base64Decoder;
const result: Result<string, string> = example.decodeAny('aGVsbG8=');
```

### `jsonParserDecoder`

This decoder takes a decoder whose output is parsed as JSON. If JSON parsing fails, then a decoder error is the result.

```ts
import { base64Decoder, jsonParserDecoder } from '@execonline-inc/decoders';
import Decoder from 'jsonous';
import { Result } from 'resulty';

const example: Decoder<string> = jsonParserDecoder(base64Decoder);
const result: Result<string, string> = example.decodeAny('ImhlbGxvIg==');
```

### `pipeD`

This decoder is used to run two decoders in sequence passing the successfully decoded value from the first as the input for the second.

```ts
import { base64Decoder, pipeD, stringLiteral } from '@execonline-inc/decoders';
import Decoder from 'jsonous';
import { Result } from 'resulty';

const example: Decoder<'hello'> = pipeD(base64Decoder, stringLiteral('hello'));
const result: Result<string, string> = example.decodeAny('aGVsbG8=');
```

### `numberToStringDecoder`

```ts
import { numberToStringDecoder } from '@execonline-inc/decoders';
import Decoder from 'jsonous';
import { Result } from 'resulty';

const example: Decoder<string> = numberToStringDecoder;
const result: Result<string, string> = example.decodeAny(123);
```

### `stringToNumberDecoder`

```ts
import { stringToNumberDecoder } from '@execonline-inc/decoders';
import Decoder from 'jsonous';
import { Result } from 'resulty';

const example: Decoder<number> = stringToNumberDecoder;
const result: Result<string, number> = example.decodeAny('123');
```

### `jsonValueDecoder`

TODO

### `secondsDecoder`

```ts
import { secondsDecoder } from '@execonline-inc/decoders';
import Decoder from 'jsonous';
import { Result } from 'resulty';

const example: Decoder<Time> = secondsDecoder;
const result: Result<string, Time> = example.decodeAny(60);
```

### `explicitJust`

This is used to decode a JSON object representing a `Maybe` monad that's expected to be a `Just`:

```ts
import { explicitJust } from '@execonline-inc/decoders';
import Decoder from 'jsonous';
import { Result } from 'resulty';

const thing = { kind: 'just', value: 123 };
const example: Decoder<Maybe<number>> = explicitJust;
const result: Result<string, Maybe<number>> = example.decodeAny(thing);
```

### `explicitNothing`

This is used to decode a JSON object representing a `Maybe` monad that's expected to be a `Nothing`:

```ts
import { explicitNothing } from '@execonline-inc/decoders';
import Decoder from 'jsonous';
import { Result } from 'resulty';

const thing = { kind: 'nothing' };
const example: Decoder<Maybe<number>> = explicitNothing;
const result: Result<string, Maybe<number>> = example.decodeAny(thing);
```

### `explicitMaybe`

This is used to decode a JSON object representing a `Maybe` monad that could be either a `Just` or a `Nothing`.

### `mergeObjectDecoders`

This will produce a single decoder by combining the decoded fields of the two given decoders.

If the given decoders overlap for any fields, the second decoder will decide the final value for those fields.

```ts
import { mergeObjectDecoders, stringLiteral } from '@execonline-inc/decoders';
import Decoder, { field } from 'jsonous';
import { Result } from 'resulty';

interface A {
  foo: string;
  bar: string;
}
interface B {
  bar: 'star';
  baz: 'jazz';
}

const objA: A = { foo: 'goo', bar: 'car' };
const objB: B = { bar: 'star', baz: 'jazz' };

const decoderA: Decoder<A> = succeed({})
  .assign('foo', field('foo', string))
  .assign('bar', field('bar', string));
const decoderB: Decoder<B> = succeed({})
  .assign('bar', field('bar', stringLiteral('star')))
  .assign('baz', field('baz', stringLiteral('jazz')));

const example: Decoder<A & B> = mergeObjectDecoders(decoderA, decoderB);
const result: Result<string, A & B> = example.decodeAny({ ...objA, ...objB });
```
