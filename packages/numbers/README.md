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
