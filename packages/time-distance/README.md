# `time-distance`

The `time-distance` package provides interfaces and functions for dealing with distances between dates.

```ts
import * as time from '@execonline-inc/time-distance';
```

## Types

### `Future`

```ts
interface Future {
  kind: 'future';
  gap: Time;
}
```

### `Now`

```ts
interface Now {
  kind: 'now';
}
```

### `TimeDistance`

```ts
interface Past {
  kind: 'past';
  gap: Time;
}
```

### `Past`

```ts
type TimeVector = Future | Now | Past;
```

### `EffectivelyNow`

```ts
interface EffectivelyNow {
  kind: 'effectively-now';
  time: Time;
}
```

## Functions

### `distanceFrom`

This function computes the gap between two Times. If the first Time is
larger then the second, than the result is considered to be in the
future. A smaller first number is considered to be in the past. And
equal times are considered now.

```ts
import { distanceFrom } from '@execonline-inc/time-distance';
import { Time, seconds } from '@execonline-inc/time';

const time1: Time = seconds(10);
const time2: Time = seconds(20);
distanceFrom(time1, time2); // --> Past { ... }
```

### `distanceFromDate`

This function computes the Time distance between two dates. Be aware
that Date objects in Javascript can be invalid.

```ts
import { distanceFromDate } from '@execonline-inc/time-distance';

const future = distanceFromDate(new Date(1), new Date());
const badDates = distanceFromDate(new Date('foo'), new Date());
```

### `toLargestMeaningfulUnit`

This function converts a TimeDistance so that the gap is expressed in
terms of the largest meaningful time unit. Using this function may
cause a loss of precision on the time gap.

```ts
const distance: TimeVector = distanceBetween(minutes(15), minutes(25));
toLargestMeaningfulUnit(distance);
```

### `largestMeaningfulUnit`

This function takes a Time and returns a new Time that represents
that largest meaningful unit of time. For example, `seconds(60)` would
be converted to `minutes(1)`, since that is the largest unit of time
that isn't effectively zero.

Note that "meaningful" here means meaningful to human beings. Anything
less than a second is treated as EffectivelyNow

```ts
const result: Ok<Time> = largestMeaningfulUnit(seconds(60));
const nowish: Err<EffectivelyNow> = largestMeaningfulUnit(milliseconds(100));
```
