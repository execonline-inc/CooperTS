# `collections`

The `collections` package provides functions to work with lists in various ways.

## Functions

### `bifurcateWhen`

This function splits an array once the provided function evaluates to `true` for an element of that array. The element that resulted in the `true` evaluation is the first element of the second returned array.

```ts
import { bifurcateWhen } from '@execonline-inc/collections';

const list = [1, 2, 3, 4, 5];
const result = bifurcateWhen((item: number): boolean => item === 3, list);
// [[1, 2], [3, 4, 5]]
```

### `concat`

This curried function simply concatenates two arrays.

```ts
import { concat } from '@execonline-inc/collections';

const listA = [1, 2, 3];
const listB = [4, 5, 6];

const result = concat(listA)(listB);
// [1, 2, 3, 4, 5, 6]
```

### `concatAll`

This function takes an array of arrays, and concatenates them all in order.

```ts
import { concatAll } from '@execonline-inc/collections';

const lists = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const result: number[] = concatAll(lists);
// [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### `dropUntil`

This function has a curried and non-curried form. It takes an evaluation function and an array.

The evaluation function is called on elements of the array until it evaluates to `true`. The element that caused the function to evaluate to `true` and subsequent elements of the array are returned in a new array.

```ts
import { dropUntil } from '@execonline-inc/collections';

const list = [1, 2, 3, 4, 5];
const result: number[] = dropUntil((item: number): boolean => item === 3)(list);
// [3, 4, 5]
```

### `uniqBy`

This curried function takes a transformation function and an array. Each element of the array is passed to the transformation function. Duplicate evaluations of this function exlude the corresponding original element from the returned array.

```ts
import { uniqBy } from '@execonline-inc/collections';

const list = [1, 2, 3, 4, 5];
const result: number[] = uniqBy((item: number): string => (item > 3 ? String(item) : ''));
// [1, 4, 5]
```

### `uniq`

This function returns only the unique elements of a given array.

```ts
import { uniq } from '@execonline-inc/collections';

const list = [1, 1, 2, 3, 3];
const result: number[] = uniq(list);
// [1, 2, 3]
```

### `find`

`find` returns the first matching element in an Array.

Matching is determined by the function passed as the first argument.
If it returns true, then a match has been identified.

If a match is found, the item is return wrapped in a `Just`.
Otherwise, a `Nothing` is returned.

This function has a curried and non-curried form.

```ts
import { find } from '@execonline-inc/collections';
import { Maybe } from 'maybeasy';

const list = [1, 2, 3];
const result: Maybe<number> = find((item: number): boolean => item === 2)(list);
// Just<2>
```

### `findIndex`

`findIndex` takes an evaluation function and an array.

The evaluation function is called on elements of the array until it evaluates to `true`, at which point that element's index is returned as a `Just`. If no element is found, a `Nothing` iss returned.

This function has a curried and non-curried form.

```ts
import { findIndex } from '@execonline-inc/collections';
import { Maybe } from 'maybeasy';

const list = [1, 2, 3];
const result: Maybe<number> = findIndex((item: number): boolean => item === 2)(list);
// Just<1>
```

### `findR`

This curried function operates like `find<T>`, but returns a `Result<NothingFound, T>` instead of a `Maybe<T>`.

```ts
import { findR, NothingFound } from '@execonline-inc/collections';

const list = [1, 2, 3];
const result: Result<NothingFound, number> = findR((item: number): boolean => item === 4)(list);
// Err<NothingFound>
```

### `findItem`

This curried function finds the first item of the given ID in an array of objects of the interface `{ id: number }`.

```ts
import { findItem } from '@execonline-inc/collections';
import { Maybe } from 'maybeasy';

const list = [{ id: 1 }, { id: 2 }, { id: 3 }];
const result: Maybe<{ id: number }> = findItem(2)(list);
// Just<{ id: 2 }>
```

### `findItemT`

This curried function wraps `findItem` functionality in a `Task`. It is particularly useful in chaining of tasks:

```ts
import { findItemT, ItemNotFound } from '@execonline-inc/collections';
import Task from 'taskarian';

const list = [{ id: 1 }, { id: 2 }, { id: 3 }];
const task = Task.succeed<ItemNotFound, { id: number }[]>(list);

const example: Task<ItemNotFound, { id: 2 }> = task.andThen(findItemT(2));
```

### `findPayload`

`findPayload` accepts an ID and a list of payloads of a `{ payload: { id: number } }` interface and returns the first payload with the matching ID as a `Maybe`.

This function has a curried and non-curried form

```ts
import { findPayload } from '@execonline-inc/collections';
import { Maybe } from 'maybeasy';

const payloads = [{ payload: { id: 1 } }, { payload: { id: 2 } }, { payload: { id: 3 } }];
const result: Maybe<{ payload: { id: number } }> = findPayload(2)(payloads);
// Just<{ payload: { id: 2 } }>
```

### `findPayloadT`

Same as `findItemT` but with the functionality of `findPayload`.

```ts
import { findPayloadT, PayloadNotFound } from '@execonline-inc/collections';
import Task from 'taskarian';

const payloads = [{ payload: { id: 1 } }, { payload: { id: 2 } }, { payload: { id: 3 } }];
const task = Task.succeed<PayloadNotFound, { payload: { id: number } }[]>(payloads);

const example: Task<PayloadNotFound, { payload: { id: 2 } }> = task.andThen(findPayloadT(2));
```

### `findPayloadByUuid`

Same as `findPayload` but takes a `string` as the UUID to find and a list of payloads of a `{ payload: { uuid: string } }` interface.

```ts
import { findPayloadByUuid } from '@execonline-inc/collections';
import { Maybe } from 'maybeasy';

const payloads = [
  { payload: { uuid: 'cb08aa12-30f3-48b4-a6ec-bb95ca1e021d' } },
  { payload: { uuid: 'e1da03ff-46ff-49c9-bb69-a09ea68fbd76' } },
  { payload: { uuid: 'ea4c9aa3-b39b-4c3c-a931-b1bbc921970c' } },
];
const result: Maybe<{ payload: { id: number } }> = findPayloadByUuid(
  'cb08aa12-30f3-48b4-a6ec-bb95ca1e021d'
)(payloads);
// Just<{ payload: { uuid: 'cb08aa12-30f3-48b4-a6ec-bb95ca1e021d' } }>
```

### `groupBy`

This curried function takes a function to derive the group key for each element and an array of items.

```ts
import { groupBy } from '@execonline-inc/collections';

const list = ['abc-123', 'abc-456', 'def-789'];
const result = groupBy((item: string): string => item.split('-').shift())(list);
// { 'abc': ['abc-123', 'abc-456'], 'def': ['def-789'] }
```

### `toPairs`

This function takes an object and returns an array of key-value pairs.

```ts
import { toPairs } from '@execonline-inc/collections';

const obj = {
  abc: 123,
  def: 456,
};
const result = toPairs(obj);
// [['abc', 123], ['def', 456]]
```

### `map`

This curried function takes a transformation function and a list of items to return a new list of items.

```ts
import { map } from '@execonline-inc/collections';

const list = [1, 2, 3];
const result: number[] = map((item: number): number => item + 10)(list);
// [11, 12, 13]
```

### `flatMap`

`flatMap` takes a list of items and a transformation function that returns an array for each item. The final return value is a flattened array of each of those resulting arrays.

This function has curried and non-curried form.

```ts
import { flatMap } from '@execonline-inc/collections';

const list = [1, 2, 3];
const result = flatMap((item: number): number[] => [10, 100, 1000].map(n => n * item))(list);
// [10, 100, 1000, 20, 200, 2000, 30, 300, 3000]
```

### `mapMaybe`

`mapMaybe` takes a list of items and a function that maps each item of the array to a `Maybe`. The final return value is an array of only the mapped values that were a `Just`.

This function has curried and non-curried form.

```ts
import { mapMaybe } from '@execonline-inc/collections';
import { Maybe } from 'maybeasy';

const list = [1, 2, 3, 4, 5, 6];
const result = mapMaybe(
  (item: number): Maybe<number> => item % 2 ? nothing() : just(item);
)(list);
// [2, 4, 6]
```

### `byId`

This curried function checks whether the given ID matches the ID in the given payload.

```ts
import { byId } from '@execonline-inc/collections';

const payload = { id: 123 };
const result: boolean = byId(123)(payload);
```

### `byPayloadId`

This curried function checks whether the given ID matches the ID in the given resource.

```ts
import { byPayloadId } from '@execonline-inc/collections';

const resource = { payload: { id: 123 } };
const result: boolean = byPayloadId(123)(resource);
```

### `byPayloadUuid`

This curried function checks whether the given UUID matches the UUID in the given resource.

```ts
import { byPayloadUuid } from '@execonline-inc/collections';

const resource = { payload: { id: '9f925583-7a8f-4459-979d-5ad2d5ede2f8' } };
const result: boolean = byPayloadUuid('9f925583-7a8f-4459-979d-5ad2d5ede2f8')(resource);
```

### `sort`

`sort` provides stable sorting of an array using a given comparison function.

The comparison function should return:

- `< 0` to sort `a` before `b`
- `0` to consider `a` equal to `b`
- `> 0` to sort `a` after `b`

This function has a curried and non-curried form.

```ts
import { sort } from '@execonline-inc/collections';

const list = [
  { age: 30, name: 'Ava' },
  { age: 25, name: 'Bob' },
  { age: 20, name: 'Cas' },
  { age: 25, name: 'Dan' },
];
const result = sort((a, b) => a.age - b.age)(list);
// [{ age: 20, name: 'Cas' }, { age: 25, nam: 'Bob' }, { age: 25, name: 'Dan' }, { age: 30, name: 'Ava' }]
```

### `take`

`take` creates a new array of the specified amount of items from the given array from its beginning.

This function has a curried and non-curried form.

```ts
import { take } from '@execonline-inc/collections';

const list = [1, 2, 3, 4, 5];
const result = take(3)(list);
// [1, 2, 3]
```

### `first`

This function returns the first item from an array. When present, the item is wrapped in a `Just`, otherwise the return value is a `Nothing`.

```ts
import { first } from '@execonline-inc/collections';

const list = [1, 2, 3];
const result = first(list);
// Just<1>
```

### `last`

This function returns the last item from an array. When present, the item is wrapped in a `Just`, otherwise the return value is a `Nothing`.

```ts
import { last } from '@execonline-inc/collections';

const list = [1, 2, 3];
const result = last(list);
// Just<3>
```

### `takeLastUntil`

`takeLastUntil` returns a new array of the items from the end of the given array until the given function evalutes `true`.

This function has a curried and non-curried form.

```ts
import { takeLastUntil } from '@execonline-inc/collections';

const list = [1, 2, 3, 4, 5];
const result = takeLastUntil((item: number): boolean => item === 3)(list);
// [4, 5]
```

### `takeLastWhile`

`takeLastWhile` returns a new array of the items from the end of the given array while the given function evaluates `true`.

This function has a curried and non-curried form.

```ts
import { takeLastWhile } from '@execonline-inc/collections';

const list = [1, 2, 3, 4, 5];
const result = takeLastWhile((item: number): boolean => item > 3)(list);
// [4, 5]
```
