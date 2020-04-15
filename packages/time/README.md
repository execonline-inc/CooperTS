# `time`

The `time` package provides interfaces and functions for dealing with time durations.

```ts
import * as time from '@execonline-inc/time';
```

## Types

### `Milliseconds`

```ts
interface Milliseconds {
  kind: 'milliseconds';
  milliseconds: number;
}
```

### `Seconds`

```ts
interface Seconds {
  kind: 'seconds';
  seconds: number;
}
```

### `Minutes`

```ts
interface Minutes {
  kind: 'minutes';
  minutes: number;
}
```

### `Hours`

```ts
interface Hours {
  kind: 'hours';
  hours: number;
}
```

### `Days`

```ts
interface Days {
  kind: 'days';
  days: number;
}
```

### `Time`

```ts
import { Days, Hours, Milliseconds, Minutes, Seconds } from '@execonline-inc/time';

type Time = Days | Hours | Minutes | Seconds | Milliseconds;
```

## Functions

### `milliseconds`, `seconds`, `minutes`, `hours`, `days`

These functions accept a `number` and construct an object of the corresponding type with that quantity.

```ts
import * as time from '@execonline-inc/time';

const milliseconds: time.Milliseconds = time.milliseconds(86400000);
const seconds: time.Seconds = time.seconds(86400);
const minutes: time.Minutes = time.minutes(1440);
const hours: time.Hours = time.hours(24);
const days: time.Days = time.days(1);
```

### `toMilliseconds`, `toSeconds`, `toMinutes`, `toHours`, `toDays`

These functions accept a `Time` and convert the quantity of that type to the type that their name states.

```ts
import * as time from '@execonline-inc/time';

const milliseconds: time.Milliseconds = time.toMilliseconds(time.minutes(3));
const seconds: time.Seconds = time.toSeconds(time.hours(3));
const minutes: time.Minutes = time.toMinutes(time.days(2));
const hours: time.Hours = time.toHours(time.milliseconds(1000));
const days: time.Days = time.toDays(time.seconds(200));
```

### `toJS`

This function takes a `Time` and returns the equivalent millisecond count as a `number`.

```ts
import { minutes, toJS } from '@execonline-inc/time';

const millisecondCount: number = toJS(minutes(1));
```
