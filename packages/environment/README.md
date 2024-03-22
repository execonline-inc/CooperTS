# `environment`

The `environment` package provides functions read from the execution environment.

## Types

### `MissingVarError`

Resembles the error when the environment variable doesn't exist for a read attempt.

```ts
interface MissingVarError {
  kind: 'missing-var-error';
  key: string;
}
```

### `Production`

Interface representing a production environment.

```ts
interface Production {
  kind: 'production';
}
```

### `Development`

Interface representing a development environment.

```ts
interface Development {
  kind: 'development';
}
```

### `Unknown`

Interface representing an unknown environment.

```ts
interface Unknown {
  kind: 'unknown';
}
```

### `Environment`

```ts
type Environment = Production | Development | Unknown;
```

## Functions

### `missingVarError`

This function takes an environment variable name and constructs a `MissingVarError` type from it.

```ts
import { missingVarError, MissingVarError } from '@execonline-inc/environment';

const result: MissingVarError = missingVarError('SOME_ENV_VAR');
// { kind: 'missing-var-error', key: 'SOME_ENV_VAR' }
```

### `readVarM`

This function reads for a given key from `process.env` and wraps the value in a `Maybe`. When a value exists for the key, the result is a `Just`, otherwise it is a `Nothing`.

```ts
import { readVarM } from '@execonline-inc/environment';
import { Maybe } from 'maybeasy';

const result: Maybe<string> = readVarM('SOME_ENV_VAR');
```

### `readVarR`

Like `readVarM`, but the condition for no value is an error `Result`.

```ts
import { MissingVarError, readVarR } from '@execonline-inc/environment';
import { Result } from 'resulty';

const result: Result<MissingVarError, string> = readVarR('SOME_ENV_VAR');
```

### `readVarT`

Like `readVarR`, but as a `Task` instead of a `Result`.

```ts
import { MissingVarError, readVarT } from '@execonline-inc/environment';
import { Task } from 'taskarian';

const result: Task<MissingVarError, string> = readVarT('SOME_ENV_VAR');
```

### `environment`

This function reads the `NODE_ENV` environment variable and returns an object representing the detected environment.

```ts
import { environment, Environment } from '@execonline-inc/environment';

const result: Environment = environment();
```
