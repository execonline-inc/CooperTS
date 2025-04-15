[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

# `CooperTS`

Elm-inspired functional-programming tools in Typescript.

Compilers are great. Let the compiler do the work.

For additional information and examples, please visit [cooperts.io](https://cooperts.io/).

## Packages

Most CooperTS packages are utility packages that build on primitive functional types from [`festive-possum`](https://github.com/kofno/festive-possum), such as `Maybe`, `Task`, `Result`, and `Decoder` types.

- [`collections`](https://github.com/execonline-inc/CooperTS/tree/main/packages/collections) - Provides functions to work with lists in various ways
- [`decoders`](https://github.com/execonline-inc/CooperTS/tree/main/packages/decoders) - Provides useful utility decoder implementations (see `jsonous`)
- [`dom`](https://github.com/execonline-inc/CooperTS/tree/main/packages/dom) - Manipulate the HTML dom using Tasks (see `taskarian`)
- [`environment`](https://github.com/execonline-inc/CooperTS/tree/main/packages/environment) - Provides functions to read from the execution environment
- [`logging`](https://github.com/execonline-inc/CooperTS/tree/main/packages/logging) - Provides a few logging functions
- [`maybe-adapter`](https://github.com/execonline-inc/CooperTS/tree/main/packages/maybe-adapter) - Provides functions to convert to/from `Maybe` types (see `maybeasy`)
- [`numbers`](https://github.com/execonline-inc/CooperTS/tree/main/packages/numbers) - Parse strings into numbers
- [`url`](https://github.com/execonline-inc/CooperTS/tree/main/packages/url) - Provides functions to validate URLs

Other CooperTS packages provide types & patterns for developers to conform to known good standards.

- [`appy`](https://github.com/execonline-inc/CooperTS/tree/main/packages/appy) - Provides functions to interface with HATEOAS API endpoints
- [`resource`](https://github.com/execonline-inc/CooperTS/tree/main/packages/resource) - Provides types and functions for dealing with HATEOAS REST resources
- [`translations`](https://github.com/execonline-inc/CooperTS/tree/main/packages/translations) - Provides support for typed translation keys and typed React-based translation interpolation using the [i18next](https://www.i18next.com/) library with a custom adapter
- [`time`](https://github.com/execonline-inc/CooperTS/tree/main/packages/time) - Provides interfaces and functions for dealing with time durations
- [`time-distance`](https://github.com/execonline-inc/CooperTS/tree/main/packages/time-distance) - Provides interfaces and functions for dealing with distances between dates

See also the lower-level packages at [`festive-possum`](https://github.com/kofno/festive-possum), especially:

- [`ajaxian`](https://github.com/kofno/festive-possum/tree/main/packages/ajaxian) - A wrapper around `XMLHttpRequest` that borrows heavily from Elm
- [`jsonous`](https://github.com/kofno/festive-possum/tree/main/packages/jsonous) - Use Elm-inspired `Decoder` functions to verify JSON objects match expected types
- [`maybeasy`](https://github.com/kofno/festive-possum/tree/main/packages/maybeasy) - Use a `Maybe` to represent possibly-nullish values
- [`nonempty-list`](https://github.com/kofno/festive-possum/tree/main/packages/nonempty-list) - A list-like type that is guaranteed to never be empty
- [`piper`](https://github.com/kofno/festive-possum/tree/main/packages/piper) - Functional composition in Typescript
- [`resulty`](https://github.com/kofno/festive-possum/tree/main/packages/resulty) - Defines `Result`, a disjunction implementation in Typescript
- [`taskarian`](https://github.com/kofno/festive-possum/tree/main/packages/taskarian) - Defines `Task`, a Future implementation in Typescript; like Promises, but lazy

## Local Development

This repo uses [bun](https://bun.sh/) as a package manager and runtime. It is recommended to use bun for local development, as it is
significantly faster than npm or yarn. Bun is also used to build the packages in this repo.

Install bun and then run the following command to install all dependencies:

```bash
bun install
```
Then, run the following command to build all packages:

```bash
bun run build
```

## Releasing new versions
All packages in this repo are published to github's npm registry. You should already have your npm configured with
the correct access token. Bun will use this same token to publish the packages.

Because all of the packages are frequently interdependent. Often because a package either depends on other packages
or else several packages all have the same dependencies. Often, when one package is updated, all of the packages need to
be updated.

For example, when a new version of `jsonous` is released, all of the packages that depend on `jsonous` need to be updated.
This is especially true for `decoders`, which are used in many of the packages. Since there is so much interdependence,
it is often easier to update all of the packages at once. In this example, you will want to update the version of `jsonous`
in all of the packages that depend on it. Then you will want to rebuild all of the packages. Finally, you will want to
bump the minor version of all the packages and then publish them.

To release a new version of all packages, run the following commands in the root of the repo:

```bash
bun run build
bun run bump:minor
bun run pub
```

This will build all packages, bump the minor version of all packages, and then publish all packages to the github npm registry.

Other commands of interest are:
- `bun run bump:patch` - Bump the patch version of all packages
- `bun run bump:major` - Bump the major version of all packages
- `bun run pub:dryrun` - Run a dry run of the publish command to see what will be published
- `bun run changed` - Show which packages have changed since the last release

If only need to update a single package for some reason, all these commands can be run in an individual package directory.

So for example, if you want to update the `appy` package, you can run the following commands in the `packages/appy` directory:

```bash
bun run build
bun run bump:minor
bun run pub
```
This will build the `appy` package, bump the minor version of the `appy` package, and then publish the `appy` package to the github npm registry.


