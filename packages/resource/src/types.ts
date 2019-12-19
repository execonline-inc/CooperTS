import { find } from "@execonline-inc/collections";
import { Method } from "ajaxian";
import { Maybe } from "maybeasy";

export interface Link<Rel extends string> {
  rel: Rel;
  href: string;
  method: Method;
  type: string;
}

export interface ServerError {
  type: string;
  param: string;
  message: string;
  code: string;
  source: string;
}

export interface Linkable<Rel extends string> {
  links: ReadonlyArray<Link<Rel>>;
}

export interface PossiblyLinkable<Rel extends string> {
  whenLinks: Maybe<Linkable<Rel>>;
}

export interface Payloaded<T> {
  payload: T;
}

export interface Resource<T, Rel extends string>
  extends Payloaded<T>,
    Linkable<Rel> {}

export interface ResourceWithErrors<T, Rel extends string>
  extends Resource<T, Rel> {
  errors: ServerError[];
}

export interface IdentifiablePayload {
  id: number;
}

export interface ResourceWithMetadata<T, M, Rel extends string>
  extends Resource<T, Rel> {
  metadata: M;
}

export const selfUrl = <T, Rel extends string>(r: Resource<T, Rel>) =>
  find(l => l.rel === "self", r.links);

export const selfUrlM = <Rel extends string, T>(
  r: Resource<T, Rel>
): Maybe<Link<Rel>> => selfUrl(r);

export const iconUrl = <T, Rel extends string>(r: Resource<T, Rel>) =>
  find(l => l.rel === "icon", r.links);

export const isNotSelf = (url: string) => <T, Rel extends string>(
  r: Resource<T, Rel>
): boolean => !r.links.some(l => l.rel === "self" && l.href === url);

export const resource = <Rel extends string, T>(
  links: ReadonlyArray<Link<Rel>>,
  payload: T
): Resource<T, Rel> => ({
  links,
  payload
});

export const payload = <A, R extends Payloaded<A>>(r: R): A => r.payload;

export const links = <Rel extends string, R extends Linkable<Rel>>(
  r: R
): ReadonlyArray<Link<Rel>> => r.links;
