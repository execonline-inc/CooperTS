# `resource`

The `resource` package provides types and functions for dealing with HATEOAS REST resources.

## Usage

Create a module dedicated to resources and export as necessary.

```ts
import {
  Link as LinkR,
  payload as payloadR,
  Resource as ResourceR,
  resource as resourceR,
  ResourceWithErrors as ResourceWithErrorsR,
  ResourceWithMetadata as ResourceWithMetadataR,
} from '@execonline-inc/resource';
import { Result } from 'resulty';

const rels = ['prev', 'next', 'self'] as const;

export type Rel = typeof rels[number];

export const toRel = (value: string): Result<string, Rel> =>
  toResult(
    `Expected to find an HTTP rel string. Instead I found ${value}`,
    find(rel => rel === value, rels)
  );

export type Link = LinkR<Rel>;
export type Resource<T> = ResourceR<T, Rel>;
export type ResourceWithErrors<T> = ResourceWithErrorsR<T, Rel>;
export type ResourceWithMetadata<T, M> = ResourceWithMetadataR<T, M, Rel>;

export const resource: <T>(links: ReadonlyArray<Link>, payload: T) => Resource<T> = resourceR;
export const payload: <T, R extends Resource<T>>(r: R) => T = payloadR;
```

## Types

### `ResourceCollection`

```ts
import { Empty, None, Results } from '@execonline-inc/resource';

type ResourceCollection<T, Rel extends string> = None | Empty | Results<T, Rel>;
```

### `None`

```ts
interface None {
  kind: 'none';
}
```

### `Empty`

```ts
interface Empty {
  kind: 'empty';
}
```

### `Results`

```ts
import { Resource } from '@execonline-inc/resource';

interface Results<T, Rel extends string> {
  kind: 'results';
  results: Resource<T[], Rel>;
}
```

### `Link`

```ts
import { Method } from 'ajaxian';

interface Link<Rel extends string> {
  rel: Rel;
  href: string;
  method: Method;
  type: string;
}
```

### `ServerError`

```ts
interface ServerError {
  type: string;
  param: string;
  message: string;
  code: string;
  source: string;
}
```

### `Linkable`

```ts
import { Link } from '@execonline-inc/resource';

interface Linkable<Rel extends string> {
  links: ReadonlyArray<Link<Rel>>;
}
```

### `PossiblyLinkable`

```ts
import { Linkable } from '@execonline-inc/resource';

interface PossiblyLinkable<Rel extends string> {
  whenLinks: Maybe<Linkable<Rel>>;
}
```

### `Payloaded`

```ts
interface Payloaded<T> {
  payload: T;
}
```

### `Resource`

```ts
import { Linkable, Payloaded } from '@execonline-inc/resource';

interface Resource<T, Rel extends string> extends Payloaded<T>, Linkable<Rel> {}
```

### `ResourceWithErrors`

```ts
import { Resource, ServerError } from '@execonline-inc/resource';

interface ResourceWithErrors<T, Rel extends string> extends Resource<T, Rel> {
  errors: ServerError[];
}
```

### `IdentifiablePayload`

```ts
interface IdentifiablePayload {
  id: number;
}
```

### `ResourceWithMetadata`

```ts
import { Resource } from '@execonline-inc/resource';

interface ResourceWithMetadata<T, M, Rel extends string> extends Resource<T, Rel> {
  metadata: M;
}
```

### `ValidationError`

```ts
interface ValidationError {
  kind: 'validation-error';
  on: string;
  param: string;
  error: string;
  detail: string;
}
```

### `ValidationErrors`

```ts
import { ValidationError } from '@execonline-inc/resource';

type ValidationErrors = ValidationError[];
```

### `PaginationMetadata`

```ts
interface PaginationMetadata {
  resultsCount: number;
  pageCount: number;
  perPage: number;
  currentPage: number;
}
```

## Functions

### `none`

Creates a `None` object.

```ts
import { none, ResourceCollection } from '@execonline-inc/resource';

const result: ResourceCollection<unknown, 'self'> = none();
```

### `empty`

Creates an `Empty` object.

```ts
import { empty, ResourceCollection } from '@execonline-inc/resource';

const result: ResourceCollection<unknown, 'self'> = empty();
```

### `results`

Creates a `Results` object.

```ts
import { Link, results, Resource, ResourceCollection } from '@execonline-inc/resource';

interface ExamplePayload {
  kind: 'example-payload';
}
const payload = { kind: 'example-payload' };
const links: ReadonlyArray<Link<'self'>> = [
  {
    rel: 'self',
    href: 'https://example.com/',
    method: 'get',
    type: 'application/json',
  },
];
const resource: Resource<ExamplePayload[], 'self'> = { payload: [payload], links };
const result: ResourceCollection<ExamplePayload, 'self'> = results(resource);
```

### `resources`

This function returns the appropriate `ResourceCollection` type depending on the presence of the given resource and its payload.

```ts
import { Link, resources, Resource, ResourceCollection } from '@execonline-inc/resource';
import { just } from 'maybeasy';

interface ExamplePayload {
  kind: 'example-payload';
}
const payload = { kind: 'example-payload' };
const links: ReadonlyArray<Link<'self'>> = [
  {
    rel: 'self',
    href: 'https://example.com/',
    method: 'get',
    type: 'application/json',
  },
];
const resource: Resource<ExamplePayload[], 'self'> = { payload: [payload], links };
const result: ResourceCollection<ExamplePayload, 'self'> = resources(just(resource));
```

### `linksDecoder`

This function returns a decoder for decoding HATEOAS links with valid `rel` values. It takes a function that checks for valid `rel` values.

```ts
import { find } from '@execonline-inc/collections';
import { toResult } from '@execonline-inc/maybe-adapter';
import { Link, linksDecoder } from '@execonline-inc/resource';
import { Result } from 'resulty';

const validRels = ['self'] as const;
type Rel = typeof validRels[number];
const toRel = (v: string): Result<string, Rel> =>
  toResult(
    `Invalid rel found: ${v}`,
    find(rel => rel === v, validRels)
  );
const linksDecoder: Decoder<ReadonlyArray<Link<Rel>>> = linksDecoder<Rel>(toRel);
```

### `errorDecoder`

This decoder is for a particular error object structure.

```ts
import { errorDecoder, ServerError } from '@execonline-inc/resource';

const obj = {
  type: 'some type',
  param: 'some param',
  code: '123',
  source: 'some source',
  message: 'some message',
};
const decoder: Decoder<ServerError> = errorDecoder;
const result: Result<string, ServerError> = decoder.decodeAny(obj);
```

### `resourceDecoder`

This function with a curried and non-curried form. The returned decoder is for a HATEOAS resource structure.

```ts
import { find } from '@execonline-inc/collections';
import { resourceDecoder, Resource } from '@execonline-inc/resource';
import { toResult } from '@execonline-inc/maybe-adapter';
import { Result } from 'resulty';

type Rel = 'self';
interface ExamplePayload {}
const obj = { payload: {}, links: [] };

const toRel = (v: string): Result<string, Rel> =>
  toResult(
    `Invalid rel found: ${v}`,
    find(rel => rel === v, validRels)
  );

const payloadDecoder: Decoder<ExamplePayload> = succeed({});
const decoder: Decoder<Resource<ExamplePayload, Rel>> = resourceDecoder<ExamplePayload, Rel>(toRel)(
  payloadDecoder
);
const result: Result<string, Resource<ExamplePayload, Rel>> = decoder.decodeAny(obj);
```

### `resourceWithMetadataDecoder`

This curried function returns a decoder for a resource with an additional `metadata` key.

```ts
import { find } from '@execonline-inc/collections';
import { resourceWithMetadataDecoder, ResourceWithMetadata } from '@execonline-inc/resource';
import { toResult } from '@execonline-inc/maybe-adapter';
import Decoder, { succeed } from 'jsonous';
import { Result } from 'resulty';

type Rel = 'self';
interface ExamplePayload {}
interface ExampleMetadata {}

const obj = {
  payload: {},
  links: [],
  metadata: {},
};
const toRel = (v: string): Result<string, Rel> =>
  toResult(
    `Invalid rel found: ${v}`,
    find(rel => rel === v, validRels)
  );

const payloadDecoder: Decoder<ExamplePayload> = succeed({});
const metadataDecoder: Decoder<ExampleMetadata> = succeed({});
const decoder: Decoder<ResourceWithMetadata<
  ExamplePayload,
  ExampleMetadata,
  Rel
>> = resourceWithMetadataDecoder<ExamplePayload, ExampleMetadata, Rel>(toRel)(
  payloadDecoder,
  metadataDecoder
);
const result: Result<
  string,
  ResourceWithMetadata<ExamplePayload, ExampleMetadata, Rel>
> = decoder.decodeAny(obj);
```

### `resourceWithErrorsDecoder`

This curried function returns a decoder for a resource with an additional `errors` key.

```ts
import { find } from '@execonline-inc/collections';
import { resourceWithErrorsDecoder, ResourceWithErrors } from '@execonline-inc/resource';
import { toResult } from '@execonline-inc/maybe-adapter';
import Decoder, { succeed } from 'jsonous';
import { Result } from 'resulty';

type Rel = 'self';
interface ExamplePayload {}

const obj = {
  payload: {},
  links: [],
  errors: [],
};
const toRel = (v: string): Result<string, Rel> =>
  toResult(
    `Invalid rel found: ${v}`,
    find(rel => rel === v, validRels)
  );

const payloadDecoder: Decoder<ExamplePayload> = succeed({});
const decoder: Decoder<ResourceWithErrors<ExamplePayload, Rel>> = resourceWithErrorsDecoder<
  ExamplePayload,
  Rel
>(toRel)(payloadDecoder, metadataDecoder);
const result: Result<string, ResourceWithErrors<ExamplePayload, Rel>> = decoder.decodeAny(obj);
```

### `paginationMetadataDecoder`

This decoder decodes a specific pagination object structure.

```ts
import { paginationMetadataDecoder, PaginationMetadata } from '@execonline-inc/resource';
import { Result } from 'resulty';

const obj = { results_count: 1, page_count: 1, per_page: 1, current_page: 1 };
const result: Result<string, PaginationMetadata> = paginationMetadataDecoder.decodeAny(obj);
```

### `validationErrorDecoder`

This decoder decodes a specific validation error object structure.

```ts
import { validationErrorDecoder, ValidationError } from '@execonline-inc/resource';
import { Result } from 'resulty';

const obj = {
  kind: 'validation-error',
  on: 'that',
  param: 'that',
  error: 'error',
  detail: 'detail',
};
const result: Result<string, ValidationError> = validationErrorDecoder.decodeAny(obj);
```

### `validationErrorsDecoder`

This decoder is for decoding an array with `validationErrorDecoder`.

### `selfUrl`

This function finds the link in a resource with a `rel` of `self`.

```ts
import { Resource, selfUrl } from '@execonline-inc/resource';
import { Maybe } from 'maybeasy';

type Rel = 'self';
interface ExamplePayload {}

const resource: Resource<ExamplePaylod, Rel> = {
  payload: {},
  links: [
    {
      rel: 'self',
      href: 'https://example.com/',
      method: 'get',
      type: 'application/json',
    },
  ],
};
const result: Maybe<Link<Rel>> = selfUrl<ExamplePayload, Rel>(resource);
```

### `iconUrl`

This function finds the link in a resource with a `rel` of `icon`.

```ts
import { iconUrl, Resource } from '@execonline-inc/resource';
import { Maybe } from 'maybeasy';

type Rel = 'icon';
interface ExamplePayload {}

const resource: Resource<ExamplePaylod, Rel> = {
  payload: {},
  links: [
    {
      rel: 'icon',
      href: 'https://example.com/',
      method: 'get',
      type: 'application/json',
    },
  ],
};
const result: Maybe<Link<Rel>> = iconUrl<ExamplePayload, Rel>(resource);
```

### `isNotSelf`

This curried function determines if the given URL is not the same as the link in the resource with a rel of `self`.

```ts
import { isNotSelf, Resource } from '@execonline-inc/resource';

type Rel = 'self';
interface ExamplePayload {}

const resource: Resource<ExamplePaylod, Rel> = {
  payload: {},
  links: [
    {
      rel: 'self',
      href: 'https://example.com/',
      method: 'get',
      type: 'application/json',
    },
  ],
};
const result: boolean = isNotSelf('https://not.example.com/')(resource);
```

### `resource`

This function constructs a resource object given separated links and a payload.

```ts
import { Link, resource, Resource } from '@execonline-inc/resource';

type Rel = 'self';
interface ExamplePayload {}

const links: ReadonlyArray<Link<Rel>> = [];
const payload: ExamplePayload = {};
const result: Resource<ExamplePayload, Rel> = resource<Rel, ExamplePayload>(links, payload);
```

### `payload`

This function retrieves the payload from a given resource.

```ts
import { payload, Resource } from '@execonline-inc/resource';

type Rel = 'self';
interface ExamplePayload {}

const resource: Resource<ExamplePayload, Rel> = { payload: {}, links: [] };
const result: ExamplePayload = payload(resource);
```

### `links`

This function retrieves the links from a given resource.

```ts
import { links, Link, Resource } from '@execonline-inc/resource';

type Rel = 'self';
interface ExamplePayload {}

const resource: Resource<ExamplePayload, Rel> = { payload: {}, links: [] };
const result: ReadonlyArray<Link<Rel>> = links(resource);
```
