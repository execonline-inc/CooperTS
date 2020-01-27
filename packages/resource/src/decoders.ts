import { mapMaybe } from "@execonline-inc/collections";
import { identity } from "@kofno/piper";
import { Method } from "ajaxian";
import Decoder, { array, field, maybe, string, succeed } from "jsonous";
import { stringify } from "jsonous/Internal/ErrorStringify";
import { Maybe } from "maybeasy";
import { err, ok, Result } from "resulty";
import {
  Link,
  Resource,
  ResourceWithErrors,
  ResourceWithMetadata,
  ServerError
} from "./types";

const methodDecoder = new Decoder<Method>((value: unknown) => {
  if (typeof value !== "string") {
    const stringified = stringify(value);
    const errorMsg = `Expected to find an HTTP method string. Instead found ${stringified}`;
    return err(errorMsg);
  }

  switch (value) {
    case "get":
    case "put":
    case "patch":
    case "post":
    case "delete":
      return ok(value);
    default:
      return err(`${value} is not a recognized http method`);
  }
});

type ToRel<Rel extends string> = (v: string) => Result<string, Rel>;

const relDecoder = <Rel extends string>(toRel: ToRel<Rel>) =>
  new Decoder<Rel>(val => {
    if (typeof val !== "string") {
      const errorMsg = `Expected to find a rel string, but instead found ${val}`;
      return err(errorMsg);
    }

    return toRel(val).orElse(msg => {
      return err(msg);
    });
  });

interface UnconfirmedLink<Rel extends string> extends Omit<Link<Rel>, "rel"> {
  rel: Maybe<Rel>;
}

const unconfirmedLinkDecoder = <Rel extends string>(
  toRel: ToRel<Rel>
): Decoder<UnconfirmedLink<Rel>> =>
  succeed({})
    .assign("rel", field("rel", maybe(relDecoder(toRel))))
    .assign("href", field("href", string))
    .assign("method", field("method", methodDecoder))
    .assign("type", field("type", string));

const confirmLinkRel = <Rel extends string>(
  l: UnconfirmedLink<Rel>
): Maybe<Link<Rel>> =>
  l.rel.map(rel => ({
    ...l,
    rel
  }));

const confirmLinkRels = <Rel extends string>(
  ls: ReadonlyArray<UnconfirmedLink<Rel>>
): ReadonlyArray<Maybe<Link<Rel>>> => ls.map(confirmLinkRel);

export const linksDecoder = <Rel extends string>(
  toRel: ToRel<Rel>
): Decoder<ReadonlyArray<Link<Rel>>> =>
  array(unconfirmedLinkDecoder(toRel))
    .map(confirmLinkRels)
    .map(mapMaybe(identity));

export const errorDecoder: Decoder<ServerError> = succeed({})
  .assign("type", field("type", string))
  .assign("param", field("param", string))
  .assign("code", field("code", string))
  .assign("source", field("source", string))
  .assign("message", field("message", string));

export function resourceDecoder<T, Rel extends string>(
  toRel: ToRel<Rel>
): (payloadDecoder: Decoder<T>) => Decoder<Resource<T, Rel>>;
export function resourceDecoder<T, Rel extends string>(
  toRel: ToRel<Rel>,
  payloadDecoder: Decoder<T>
): Decoder<Resource<T, Rel>>;
export function resourceDecoder<T, Rel extends string>(
  toRel: ToRel<Rel>,
  payloadDecoder?: Decoder<T>
) {
  const doit = (payloadDecoder: Decoder<T>): Decoder<Resource<T, Rel>> =>
    succeed({})
      .assign("links", field("links", linksDecoder(toRel)))
      .assign("payload", field("payload", payloadDecoder));

  return typeof payloadDecoder === "undefined" ? doit : doit(payloadDecoder);
}

export const resourceWithMetadataDecoder = <T, M, Rel extends string>(
  toRel: ToRel<Rel>
) => (
  payloadDecoder: Decoder<T>,
  metadataDecoder: Decoder<M>
): Decoder<ResourceWithMetadata<T, M, Rel>> =>
  resourceDecoder<T, Rel>(toRel, payloadDecoder).andThen(r =>
    field("metadata", metadataDecoder).map(metadata => ({ ...r, metadata }))
  );

export const resourceWithErrorsDecoder = <T, Rel extends string>(
  toRel: ToRel<Rel>
) => (payloadDecoder: Decoder<T>): Decoder<ResourceWithErrors<T, Rel>> =>
  resourceDecoder<T, Rel>(toRel, payloadDecoder).andThen(r =>
    array(errorDecoder).map(errors => ({ ...r, errors }))
  );
