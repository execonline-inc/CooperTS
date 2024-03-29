# `maybe-adapter`

The `maybe-adapter` package provides functions to convert to/from `Maybe` types.

## Functions

### `toResult`

This function has a curried and non-curried form. It takes an error and a `Maybe`. When the `Maybe` is a `Just`, a successful `Result` is returned with the wrapped value, otherwise an error `Result` is returned with the given error value.

```ts
import { toResult } from '@execonline-inc/maybe-adapter';
import { nothing } from 'maybeasy';

toResult<string, number>('an error message')(nothing());
```

### `toTask`

This function has a curried and non-curried form. It takes an error and a `Maybe`. When the `Maybe` is a `Just`, a succeeding `Task` is returned with the wrapped value, otherwise a failing `Task` is returned with the given error value.

```ts
import { toTask } from '@execonline-inc/maybe-adapter';
import { nothing } from 'maybeasy';

toTask<string, number>('an error message')(nothing());
```

### `fromBool`, `when`

This function has a curried and non-curried form. It wraps a given value in a `Maybe` depending on either the given boolean value or boolean return value of the given function.

Also, if the first argument is a function, the second argument is passed to that function for evaluation. (See advanced usage example)

Aliased as `when`

```ts
import { fromBool } from '@execonline-inc/maybe-adapter';

fromBool(true)(123);
fromBool((): boolean => true)(123);
// Just<123>

// Advanced usage.
mapMaybe(when(even), [1, 2, 3, 4]);
// [2, 4]
```
