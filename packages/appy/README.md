# `appy`

The `appy` package provides functions to interface with HATEOAS API endpoints.

## Types

### `MissingApplicationId`

```ts
interface MissingApplicationId {
  kind: 'missing-application-id';
}
```

### `AppyError`

```ts
import { MissingApplicationId } from '@execonline-inc/appy';
import { HttpError } from 'ajaxian';

type AppyError = HttpError | MissingApplicationId;
```

### `HReferenceable`

```ts
import { HttpError, Method } from 'ajaxian';

interface HReferenceable {
  href: string;
  method: Method;
}
```

## Functions

### `request`

This curried function creates an HTTP request `Task` using a given authentication token, HATEOAS link, and payload data, and decodes the response using the given decoder.

```ts
import { AppyError, HReferenceable, request } from '@execonline-inc/appy';
import Decoder, { succeed } from 'jsonous';
import { Maybe, just } from 'maybeasy';
import Task from 'taskarian';

const token: Maybe<string> = just('3ad1afde-6d9f-4e29-97d4-4396f891267f');
const link: HReferenceable = { href: 'https://example.com/', method: 'get' };
interface Response {}
const decoder: Decoder<Response> = succeed({});
const payload = {};

const req: Task<AppyError, RequestBuilder<Response>> = request(token)(link, decoder, payload);
```

### `callApi`

Similar to `request`, this function creates an HTTP request `Task`. The significant differences are that a given `Task` is executed when the response indicates that the authentication is invalid, and the ultimate return value is an object of the decoded type itself, not one wrapped in a `RequestBuilder` object.

```ts
import { AppyError, callApi, HReferenceable } from '@execonline-inc/appy';
import Decoder, { succeed } from 'jsonous';
import { Maybe, just } from 'maybeasy';
import Task from 'taskarian';

const token: Maybe<string> = just('3ad1afde-6d9f-4e29-97d4-4396f891267f');
const link: HReferenceable = { href: 'https://example.com/', method: 'get' };
const whenUnauthenticated: Task<never, void> = new Task(() => noop);
interface Response {}
const decoder: Decoder<Response> = succeed({});
const payload = {};

const req: Task<AppyError, Response> = callApi(token)(whenUnauthenticated)(decoder, payload)(link);
```

### `postToApi`

Similar to `callApi`, this function creates an HTTP request `Task`, but it's hardcoded for the `post` verb and does not decode the response.

```ts
import { AppyError, HReferenceable, postToApi } from '@execonline-inc/appy';
import { Maybe, just } from 'maybeasy';
import Task from 'taskarian';

const token: Maybe<string> = just('3ad1afde-6d9f-4e29-97d4-4396f891267f');
const link: HReferenceable = { href: 'https://example.com/', method: 'post' };
const whenUnauthenticated: Task<never, void> = new Task(() => noop);
const payload = {};

const req: Task<AppyError, string> = postToApi(token)(whenUnauthenticated)(payload)(link);
```

### `putToApi`

Similar to `callApi`, this function creates an HTTP request `Task`, but it's hardcoded for the `put` verb and does not decode the response.

```ts
import { AppyError, HReferenceable, putToApi } from '@execonline-inc/appy';
import { Maybe, just } from 'maybeasy';
import Task from 'taskarian';

const token: Maybe<string> = just('3ad1afde-6d9f-4e29-97d4-4396f891267f');
const link: HReferenceable = { href: 'https://example.com/', method: 'put' };
const whenUnauthenticated: Task<never, void> = new Task(() => noop);
const payload = {};

const req: Task<AppyError, string> = putToApi(token)(whenUnauthenticated)(payload)(link);
```

### `deleteToApi`

Similar to `callApi`, this function creates an HTTP request `Task`, but it's hardcoded for the `delete` verb, does not decode the response, and does not accept request payload data.

```ts
import { AppyError, deleteToApi, HReferenceable } from '@execonline-inc/appy';
import { Maybe, just } from 'maybeasy';
import Task from 'taskarian';

const token: Maybe<string> = just('3ad1afde-6d9f-4e29-97d4-4396f891267f');
const link: HReferenceable = { href: 'https://example.com/', method: 'delete' };
const whenUnauthenticated: Task<never, void> = new Task(() => noop);

const req: Task<AppyError, string> = deleteToApi(token)(whenUnauthenticated)(link);
```

### `getFromApi`

Similar to `callApi`, this function creates an HTTP request `Task`, but it's hardcoded for the `get` verb and does not decode the response.

```ts
import { AppyError, getFromApi, HReferenceable } from '@execonline-inc/appy';
import { Maybe, just } from 'maybeasy';
import Task from 'taskarian';

const token: Maybe<string> = just('3ad1afde-6d9f-4e29-97d4-4396f891267f');
const link: HReferenceable = { href: 'https://example.com/', method: 'get' };
const whenUnauthenticated: Task<never, void> = new Task(() => noop);
const payload = {};

const req: Task<AppyError, string> = getFromApi(token)(whenUnauthenticated)(payload)(link);
```

### `getRespFromApi`

Similar to `callApi`, this function creates an HTTP request `Task`, but it's hardcoded for the `get` verb, does not decode the response, and returns the entire successful response object rather than just its body.

```ts
import { AppyError, getRespFromApi, HReferenceable } from '@execonline-inc/appy';
import { Maybe, just } from 'maybeasy';
import Task from 'taskarian';

const token: Maybe<string> = just('3ad1afde-6d9f-4e29-97d4-4396f891267f');
const link: HReferenceable = { href: 'https://example.com/', method: 'get' };
const whenUnauthenticated: Task<never, void> = new Task(() => noop);
const payload = {};

const req: Task<AppyError, HttpSuccess<string>> = getRespFromApi(token)(whenUnauthenticated)(
  payload
)(link);
```
