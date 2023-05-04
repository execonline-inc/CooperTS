# About

CooperTS is a collection of [Elm]-inspired functional-programming tools in Typescript. CooperTS is
focused on eliminating runtime exceptions and reducing testing burden.

[Elm]: https://elm-lang.org/

## Why CooperTS?

CooperTS lets the Typescript compiler do as much of the work as possible.

### Avoid `null` Errors

CooperTS provides [`Maybe<T>`] to represent values that are nullable.

Example:

```ts
function find<T>(fn: (t: T) => boolean, ts: ReadonlyArray<T>): Maybe<T> {
  for (const t of ts) {
    if (fn(t)) {
      return just(t);
    }
  }
  return nothing<T>();
}
```

### Handle Errors Without Raising Exceptions

CooperTS provides [`Result<E, T>`] to represent the result of a computation that can fail.

Example:

```ts
import { ok, err } from 'resulty';

export const decodeBase64: Result<string, string> = (value: string) => {
  try {
    const decodedStr = Base64.decode(value);
    return ok(decodedStr);
  } catch {
    return err(`Expected a base64 encoded string but got ${value}`);
  }
};
```

### Verify Types at the App's Edges

CooperTS provides [`Decoder<T>`] for verifying the type of unknown objects or JSON and converting it
into a shape the app can use. Rather than type-checking external data as it is used, Decoders verify
data right when it is received.

Instead of:

```ts
export const helloUser = (data: string) => {
  const value: unknown = JSON.parse(data);
  if (
    value &&
    typeof value === 'object' &&
    'user' in value &&
    value.user &&
    typeof value.user === 'object' &&
    'name' in value.user &&
    typeof value.user.name === 'string'
  ) {
    console.log(`Hello ${value.user.name}`);
  }
};
```

Decoders let us write:

```ts
import { field, string } from 'jsonous';

export const helloUserWithDecoder = (data: string) => {
  field('user', field('name', string))
    .decodeJson(data)
    .map((name) => `Hello ${name}`)
    .do(console.log);
};

```

### Prefer [Pure Functions] by Isolating Side-Effects

CooperTS provides [`Task<E, T>`] for wrapping side-effects. This is similar to JavaScript's
`Promise`, except that Tasks do not run until they are forked, so a function can create a Task
without causing any side-effects.

This allows us to create and run a Task in two separate places, which gives us the ability to build
large chains of tasks from smaller tasks.

For example, this method creates a Task that is in charge of sending a Slack message, but no Slack
message is sent until the Task is forked.

```ts
export const sendMessage = (event: Event) =>
  Task.succeed<ActionFailed, {}>({})
    .assign('zenQuote', getZenQuote)
    .assign('slackChannel', slackChannel)
    .assign('slackWebhookUrl', slackWebhookUrl)
    .andThen(postQuoteToSlack(event));
```

### Prefer Functional Programming Over Nesting Logic

[`Maybe<T>`], [`Result<E, T>`], [`Decoder<T>`], and [`Task<E, T>`] all have similar methods, can be
used to avoid complex if/else scenarios

For example, we can use the `find` method from the [section above on avoiding `null` errors] to
simplify this code:

```ts
const users: Array<{ id: number; parentId: number }> = findUsers();
const user = users.find(({ id }) => id === 1);

if (user) {
  const parent = users.find(({ id }) => id === user.parentId);
  if (parent) {
    console.log(`Found parent of user #1: ${parent.name}!`);
  }
}
```

Into this:

```ts
const users: Array<{ id: number; parentId: number }> = findUsers();

find(({ id }) => id === 1, users)
  .andThen(({ parentId }) => find(({ id }) => id === parentId, users))
  .map(({ name }) => `Found parent of user #1: ${name}!`)
  .do(console.log);
```

[`Maybe<T>`]: /packages/maybeasy
[`Result<E, T>`]: /packages/resulty
[Pure Functions]: https://en.wikipedia.org/wiki/Pure_function
[`Task<E, T>`]: /packages/taskarian
[`Decoder<T>`]: /packages/jsonous
[section above on avoiding `null` errors]: #avoid-null-errors
