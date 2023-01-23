# `error-handling`

The `error-handling` package provides several utility functions that allow you to convert between the types Task, Maybe, and Result while handling any errors.

## Functions

### `asTask`
The asTask function takes a Result object as input and converts it into a Task object.

```ts
import { ok } from 'resulty';
import { asTask } from 'error-handling';

const result = ok('test');
const task = asTask(result); // Task
```

### `asMaybe`
The asMaybe function takes a Result object as input and converts it into a Maybe object.

```ts
import { ok } from 'resulty';
import { asMaybe } from 'error-handling';

const result = ok('test');
const task = asMaybe(result); // Maybe
```

### `runResult`
The runResult function tries to execute the throwable input function, and if it throws an error, it returns an Err case with the error as the value. If the input function runs successfully, it returns an Ok case with the returned value.

```ts
import { runResult } from 'error-handling';

const randomErrorFunction = (): boolean => {
  if (Math.random() < 0.5) {
    return true;
  } else {
    throw new Error('Random Error!');
  }
};

const result = runResult(randomErrorFunction); // Result
```

### `runMaybe`

The runMaybe function tries to execute the throwable input function, and returns a maybe. If an error is thrown `nothing()` will be returned and if the function is successful a `just(value)` will be returned.

```ts
import { runMaybe } from 'error-handling';

const randomErrorFunction = (): boolean => {
  if (Math.random() < 0.5) {
    return true;
  } else {
    throw new Error('Random Error!');
  }
};

const maybe = runMaybe(randomErrorFunction); // Maybe
```

### `runTask`
The runTask function tries to execute the throwable input function, and if it throws an error, it returns an Err case with the error as the value. If the input function runs successfully, it returns an Ok case with the returned value.

```ts
import { runTask } from 'error-handling';

const randomErrorFunction = (): boolean => {
  if (Math.random() < 0.5) {
    return true;
  } else {
    throw new Error('Random Error!');
  }
};

const task = runTask(randomErrorFunction); // Task
```