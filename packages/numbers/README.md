# `numbers`

Safely parse numbers from strings

## Functions

### `parseIntM`

Attempts to parse an integer from a string, using `Maybe<number>` to wrap the success or failure of
the parse.

```ts
import { parseIntM } from '@execonline-inc/numbers';

parseIntM('123').getOrElseValue(0) // returns `123`
parseIntM('123.42').getOrElseValue(0) // returns `123`
parseIntM('Hello World!').getOrElseValue(0) // returns `0`
```

### `parseIntR`

Attempts to parse an integer from a string, using `Result<NumberParseFailure, number>` to wrap the
success or failure of the parse.

```ts
import { parseIntR } from '@execonline-inc/numbers';

parseIntR('123').getOrElseValue(0) // returns `123`
parseIntR('123.42').getOrElseValue(0) // returns `123`

parseIntR('Hello World').elseDo(console.warn).getOrElseValue(0)
// Prints object: { kind: 'number-parse-failure', message: `Couldn't parse string into a number` }
// Returns 0
```

### `parseIntT`

Attempts to parse an integer from a string, using `Task<NumberParseFailure, number>` to wrap the
success or failure of the parse.

```ts
import { parseIntT } from '@execonline-inc/numbers';

parseIntT('123').fork(() => {}, console.log); // Prints the integer 123
parseIntT('123.42').fork(() => {}, console.log); // Prints the integer 123

parseIntT('Hello World').fork(console.warn, () => {});
// Prints object: { kind: 'number-parse-failure', message: `Couldn't parse string into a number` }
```

### `percentage`

Display a number as a percentage.

```ts
import { percentage } from '@execonline-inc/numbers';

percentage(42.22) // returns the string "42%"
```

# Numeric Predicates

Compare numbers in a declarative way.

## Functions

### `positive`

Check if a value is greater than zero.

```ts
import { positive } from '@execonline-inc/numbers';

positive(10) // true
positive(0) // false

```

### `whenPositive`

A function that returns Maybe is available

```ts
import { whenPositive } from '@execonline-inc/numbers';
import { nothing, just } from 'maybeasy';

const widgetMessage = (value: Maybe<number>) =>
  value
    .andThen(whenPositive)
    .map((count) => `${count} widgets still remain!`)
    .getOrElseValue("No remaining widgets!");

widgetMessage(just(7)) // "7 widgets still remain!"
widgetMessage(just(0)) // "No remaining widgets!"
widgetMessage(nothing()) // No remaining widgets!
```

### `gt`

Check if a value is greater than.

```ts
import { gt } from '@execonline-inc/numbers';
import { just, isJust } from 'maybeasy';

const checkForGreaterThan = (value: number): boolean => just(value).map(gt(10)).isJust();

checkForGreaterThan(7) // evaluates to false
checkForGreaterThan(11) // evaluates to true
```

### `whenGt`

A function that returns Maybe is available

```ts
import { gt, multiplyBy } from '@execonline-inc/numbers';

const checkForGreaterThanAndMultiply = (value: Maybe<number>) =>
  value
    .andThen(whenGt(7))
    .map(multiplyBy(6))
    .getOrElseValue(0);

checkForGreaterThanAndMultiply(4) // evaluates to 0
checkForGreaterThanAndMultiply(11) // evaluates to 66
```

## Other Functions

The following functions work similarly. Many are available with versions that return Maybe.

### `lt`
Less than
### `gte`
Greater than or equal to
### `lte`
Less than or equal to
### `eq`
Equal to
### `neq`
Not equal to
### `between`
Takes a min and max as arguments, returns a boolean.
### `betweenEq`
Takes a min and max as arguments, returns a boolean.
### `even`
Value is even
### `odd`
Value is odd
### `positive`
Value is positive
### `negative`
Value is negative
### `zero`
Value is zero
### `multiplyBy`
Multiplies the value by inputted value
### `divideBy`
Divides the value by inputted value
### `addOn`
Adds the value to inputted value
### `subtractBy`
Subtracts the value from inputted value

