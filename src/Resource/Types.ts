import { Method } from 'ajaxian';
import { Maybe, fromNullable } from 'maybeasy';

export interface Link {
  rel: string;
  href: string;
  method: Method;
}

export interface Linkable {
  links: Link[];
}

export interface Resource<T> extends Linkable {
  payload: T;
}

export interface ResourceWithMetadata<T, M> extends Resource<T> {
  metadata: M;
}
