# `url`

The `url` package provides functions to validate URLs.

## Types

### `InvalidUrlError`

```ts
interface InvalidUrlError {
  kind: 'invalid-url-error';
  href: string;
  base?: string | URL;
  error: unknown;
}
```

## Functions

### `invalidUrlError`

This function constructs an `InvalidUrlError` object from the given parameters.

```ts
import { invalidUrlError, InvalidUrlError } from '@execonline-inc/url';

const error: unknown = {};
const href: string = 'href';
const base: string = 'base';
const result: InvalidUrlError = invalidUrlError(error, href, base);
```

### `toUrlR`

This function attempts construction of a `URL` object and returns a `Result`. Handles a related [bug in Safari](https://github.com/zloirock/core-js/issues/656).

```ts
import { InvalidUrlError, toUrlR } from '@execonline-inc/url';
import { Result } from 'resulty';

const result: Result<InvalidUrlError, URL> = toUrlR('href', 'base');
```

### `toUrl`

This function attempts construction of a `URL` object (via `toUrlR`) and returns a `Maybe`.

```ts
import { InvalidUrlError, toUrl } from '@execonline-inc/url';
import { Maybe } from 'maybeasy';

const result: Maybe<InvalidUrlError> = toUrl('href', 'base');
```

### `toUrlT`

This function attempts construction of a `URL` object (via `toUrlR`) as a `Task`.

```ts
import { InvalidUrlError, toUrlT } from '@execonline-inc/url';
import { Task } from 'taskarian';

const result: Task<InvalidUrlError, URL> = toUrlT('href', 'base');
```
