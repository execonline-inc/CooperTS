import { Maybe } from "maybeasy";
import { Resource } from "./types";

export type ResourceCollection<T, Rel extends string> =
  | None
  | Empty
  | Results<T, Rel>;

export interface None {
  kind: "none";
}

export interface Empty {
  kind: "empty";
}

export interface Results<T, Rel extends string> {
  kind: "results";
  results: Resource<T[], Rel>;
}

export const none = <T, Rel extends string>(): ResourceCollection<T, Rel> => ({
  kind: "none"
});
export const empty = <T, Rel extends string>(): ResourceCollection<T, Rel> => ({
  kind: "empty"
});
export const results = <T, Rel extends string>(
  r: Resource<T[], Rel>
): ResourceCollection<T, Rel> => ({
  kind: "results",
  results: r
});

export const resources = <T, Rel extends string>(
  res: Maybe<Resource<T[], Rel>>
): ResourceCollection<T, Rel> =>
  res
    .map(r => (r.payload.length > 0 ? results<T, Rel>(r) : empty<T, Rel>()))
    .getOrElseValue(none<T, Rel>());
