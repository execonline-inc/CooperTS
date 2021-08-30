# `maybe-adapter`

The `maybe-adapter` package provides functions to convert to/from `Maybe` types.

## Functions

### `toResult`

This function takes an error and a `Maybe`. When the `Maybe` is a `Just`, a successful `Result` is returned with the wrapped value, otherwise an error `Result` is returned with the given error value. It has a curried and non-curried form.

```ts
import { toResult } from '@execonline-inc/maybe-adapter';
import { nothing } from 'maybeasy';

toResult<string, number>('an error message')(nothing());
```

### `toTask`

This function takes an error and a `Maybe`. When the `Maybe` is a `Just`, a succeeding `Task` is returned with the wrapped value, otherwise a failing `Task` is returned with the given error value. It has a curried and non-curried form.

```ts
import { toTask } from '@execonline-inc/maybe-adapter';
import { nothing } from 'maybeasy';

toTask<string, number>('an error message')(nothing());
```

### `fromBool`, `when`

This function wraps a given value in a `Maybe` depending on either the given boolean value or boolean return value of the given function. It has a curried and non-curried form.

```ts
import { fromBool } from '@execonline-inc/maybe-adapter';

fromBool(true)(123);
fromBool((): boolean => true)(123);
// Just<123>
```

### `toValues`

This function takes an array of `Maybe<T>` and returns an array of `T` from the `Just` entries.

```ts
import { fromBool, toValues } from '@execonline-inc/maybe-adapter';
import { just, nothing } from 'maybeasy';

const list: ReadonlyArray<Maybe<number>> = [1, 2, 3, 4, 5].map(n => fromBool(n % 2 === 1, n));
const result: ReadonlyArray<number> = toValues(list);
// [1, 3, 5]
```
