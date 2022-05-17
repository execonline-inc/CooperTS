[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

# `CooperTS`

Elm-inspired functional-programming tools in Typescript.

Compilers are great. Let the compiler do the work.

## Packages

Most CooperTS packages are utility packages that build on primitive functional types from [`festive-possum`](https://github.com/kofno/festive-possum), such as `Maybe`, `Task`, `Result`, and `Decoder` types.

- [`collections`](https://github.com/execonline-inc/CooperTS/tree/master/packages/collections) - Provides functions to work with lists in various ways
- [`decoders`](https://github.com/execonline-inc/CooperTS/tree/master/packages/decoders) - Provides useful utility decoder implementations (see `jsonous`)
- [`dom`](https://github.com/execonline-inc/CooperTS/tree/master/packages/dom) - Manipulate the HTML dom using Tasks (see `taskarian`)
- [`environment`](https://github.com/execonline-inc/CooperTS/tree/master/packages/environment) - Provides functions to read from the execution environment
- [`logging`](https://github.com/execonline-inc/CooperTS/tree/master/packages/logging) - Provides a few logging functions and also exports [`Honeybadger`](https://www.honeybadger.io/)
- [`maybe-adapter`](https://github.com/execonline-inc/CooperTS/tree/master/packages/maybe-adapter) - Provides functions to convert to/from `Maybe` types (see `maybeasy`)
- [`numbers`](https://github.com/execonline-inc/CooperTS/tree/master/packages/numbers) - Parse strings into numbers
- [`url`](https://github.com/execonline-inc/CooperTS/tree/master/packages/url) - Provides functions to validate URLs

Other CooperTS packages provide types & patterns for developers to conform to known good standards.

- [`appy`](https://github.com/execonline-inc/CooperTS/tree/master/packages/appy) - Provides functions to interface with HATEOAS API endpoints
- [`resource`](https://github.com/execonline-inc/CooperTS/tree/master/packages/resource) - Provides types and functions for dealing with HATEOAS REST resources
- [`translations`](https://github.com/execonline-inc/CooperTS/tree/master/packages/translations) - Provides support for typed translation keys and typed React-based translation interpolation using the [i18next](https://www.i18next.com/) library with a custom adapter
- [`time`](https://github.com/execonline-inc/CooperTS/tree/master/packages/time) - Provides interfaces and functions for dealing with time durations
- [`time-distance`](https://github.com/execonline-inc/CooperTS/tree/master/packages/time-distance) - Provides interfaces and functions for dealing with distances between dates


See also the lower-level packages at [`festive-possum`](https://github.com/kofno/festive-possum), especially:

- [`ajaxian`](https://github.com/kofno/festive-possum/tree/main/packages/ajaxian) - A wrapper around `XMLHttpRequest` that borrows heavily from Elm
- [`jsonous`](https://github.com/kofno/festive-possum/tree/main/packages/jsonous) - Use Elm-inspired `Decoder` functions to verify JSON objects match expected types
- [`maybeasy`](https://github.com/kofno/festive-possum/tree/main/packages/maybeasy) - Use a `Maybe` to represent possibly-nullish values
- [`nonempty-list`](https://github.com/kofno/festive-possum/tree/main/packages/nonempty-list) - A list-like type that is guaranteed to never be empty
- [`piper`](https://github.com/kofno/festive-possum/tree/main/packages/piper) - Functional composition in Typescript
- [`resulty`](https://github.com/kofno/festive-possum/tree/main/packages/resulty) - Defines `Result`, a disjunction implementation in Typescript
- [`taskarian`](https://github.com/kofno/festive-possum/tree/main/packages/taskarian) - Defines `Task`, a Future implementation in Typescript; like Promises, but lazy

## Local Development

```bash
# Clone the repo
git clone https://github.com/execonline-inc/CooperTS.git
cd CooperTS

# Install dependencies
yarn run bootstrap
```
