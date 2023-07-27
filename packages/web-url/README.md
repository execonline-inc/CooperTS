# web-url

`web-url` provides services for validating and constructing URLs.

It is a wrapper around the [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL)
and [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) API.

## Types

### `InvalidWebUrlError`

```ts
interface InvalidWebUrlError {
  kind: 'invalid-web-url-error';
  error: unknown;
}
```

## Functions

### `invalidWebUrlError`

This function constructs an `InvalidWebUrlError` object from the given parameters.

```ts
import { InvalidWebUrlError } from '@execonline-inc/web-url';

const error: unknown = {};
const href: string = 'href';
const base: string = 'base';
const result: InvalidWebUrlError = invalidWebUrlError(error, href, base);
```

### `toUrlR`

This function attempts construction of a `URL` object and returns a `Result`. Handles a related [bug in Safari](https://github.com/zloirock/core-js/issues/656).

```ts
import { InvalidWebUrlError, toUrlR } from '@execonline-inc/web-url';
import { Result } from 'resulty';

toUrlR('foo', 'http://example.com').map((url: URL) => url.href) // Ok("http://example.com/foo")

const result: Result<InvalidWebUrlError, URL> = toUrlR('href', 'base');
```

### `toUrl`

This function attempts construction of a `URL` object (via `toUrlR`) and returns a `Maybe`.

```ts
import { InvalidWebUrlError, toUrl } from '@execonline-inc/web-url';
import { Maybe } from 'maybeasy';

toUrl('foo', 'http://example.com').map((url: URL) => url.href) // Just("http://example.com/foo")
```

### `toUrlT`

This function attempts construction of a `URL` object (via `toUrlR`) as a `Task`.

```ts
import { InvalidWebUrlError, toUrlT } from '@execonline-inc/web-url';
import Task from 'taskarian';

toUrlT('foo', 'http://example.com').fork(
  (error: InvalidWebUrlError) => console.error(error),
  (url: URL) => console.log(url.href) // $> "http://example.com/foo"
);
```

### `getQueryParam`

This function returns the first value of the query parameter with the given name.

```ts
import { getQueryParam, toUrl } from '@execonline-inc/web-url';
toUrl("https://example.com?foo=bar&foo=baz").map(getQueryParam("foo")) // Just("bar")
```

### `getQueryParamArray`

This function returns all values in a query parameter with the given name.

```ts
import { getQueryParamArray, toUrl } from '@execonline-inc/web-url';
toUrl("https://example.com?foo=bar&foo=baz").map(getQueryParamArray("foo")) // Just(["bar", "baz"])
```

### `getQueryParamRailsArray`

This function returns all values in a query parameter with the given name, Rails-style.

```ts
import { getQueryParamRailsArray, toUrl } from '@execonline-inc/web-url';
toUrl("https://example.com?foo[]=bar&foo[]=baz").map(getQueryParamRailsArray("foo")) // Just(["bar", "baz"])
```


### `putQueryParam`

This function adds a query parameter with the given name and value to the URL.

```ts
import { putQueryParam, toUrl } from '@execonline-inc/web-url';
toUrl("https://example.com").map(putQueryParam("foo", "bar")) // Just("https://example.com?foo=bar")
```

### `putQueryParamArray`

This function adds a query parameter with the given name and values to the URL.

```ts
import { putQueryParamArray, toUrl } from '@execonline-inc/web-url';
toUrl("https://example.com").map(putQueryParamArray("foo", ["bar", "baz"])) // Just("https://example.com?foo=bar&foo=baz")
```

### `putQueryParamRailsArray`

This function adds a query parameter with the given name and values to the URL, Rails-style.

```ts
import { putQueryParamRailsArray, toUrl } from '@execonline-inc/web-url';
toUrl("https://example.com").map(putQueryParamRailsArray("foo", ["bar", "baz"])) // Just("https://example.com?foo[]=bar&foo[]=baz")
```

### `getPathname`

This function returns the pathname of the URL.

```ts
import { getPathname, toUrl } from '@execonline-inc/web-url';
toUrl("https://example.com/foo/bar").map(getPathname) // Just("/foo/bar")
```

### `setrPathname`

This function sets the pathname of the URL.

```ts
import { setPathname, toUrl } from '@execonline-inc/web-url';
toUrl("https://example.com").map(setPathname("/foo/bar")) // Just("https://example.com/foo/bar")
```

### `windowLocation`

This function returns the `URL` object for the current window as a `Task`.

```ts
import { windowLocation } from '@execonline-inc/web-url';

windowLocation().fork(
  (error: InvalidWebUrlError) => console.error(error),
  (url: URL) => console.log(url.href) // $> "https://example.com/foo/bar"
);
```
