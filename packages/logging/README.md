# `logging`

The `logging` package provides a few logging functions.

It also exports `Honeybadger` to provide a single point of configuration and use for that service's API.

## Functions

### `logger`

This curried function provides a console logging function with a given prefix.

```ts
import { logger } from '@execonline-inc/logging';

const logger = logger('[EXAMPLE]');
logger('abc', 'def');
// [EXAMPLE] abc def
```

### `warner`

This curried function provides a console warning function with a given prefix.

```ts
import { warner } from '@execonline-inc/logging';

const warner = warner('[EXAMPLE]');
warner('abc', 'def');
// [EXAMPLE] abc def
```

### `log`

_Specific to ExecOnline_

A `logger` with an `[EXO]` prefix.

```ts
import { log } from '@execonline-inc/logging';

log('hello');
// [EXO] hello
```

### `warn`

_Specific to ExecOnline_

A `warner` with an `[EXO]` prefix.

```ts
import { warn } from '@execonline-inc/logging';

warn('hello');
// [EXO] hello
```

### `warnAndNotify`

_Specific to ExecOnline_

This function accepts an error name, an error message, and a context object. It sends the message to the console using `warn`, and also uses the provided information to post a notification to the third-party [Honeybadger](https://www.honeybadger.io/) exception monitoring service.

```ts
import { warnAndNotify } from '@execonline-inc/logging';

const context = { user_id: 123 };
warnAndNotify('ErrorName', 'Some error message', context);
// [EXO] Some error message
```
