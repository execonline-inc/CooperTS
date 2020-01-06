import { readVarT } from "@execonline-inc/environment";
import {
  BadStatus,
  del,
  get,
  Header,
  header,
  HttpError,
  HttpSuccess,
  Method,
  post,
  put,
  RequestBuilder,
  toHttpResponseTask,
  toHttpTask
} from "ajaxian";
import Decoder from "jsonous";
import { Maybe } from "maybeasy";
import Task from "taskarian";
export interface MissingApplicationId {
  kind: "missing-application-id";
}

export type AppyError = HttpError | MissingApplicationId;

const missingApplicationId = (): MissingApplicationId => ({
  kind: "missing-application-id"
});

const appId = readVarT("REACT_APP_APPLICATION_ID").mapError<AppyError>(
  missingApplicationId
);
const applicationIdHeader = appId.map(id => header("application-id", id));

const appendAuthHeader = (token: Maybe<string>) => (
  headers: Header[]
): Header[] => {
  return token.cata({
    Just: t => [...headers, header("authorization", `Bearer ${t}`)],
    Nothing: () => headers
  });
};

export interface HReferenceable {
  href: string;
  method: Method;
}

export const request = <Link extends HReferenceable>(token: Maybe<string>) => <
  T
>(
  link: Link,
  decoder: Decoder<T>,
  payload: unknown
): Task<AppyError, RequestBuilder<T>> =>
  applicationIdHeader
    .map(header => [header])
    .map(appendAuthHeader(token))
    .map(headers => {
      return new RequestBuilder<T>({
        url: link.href,
        decoder: decoder.toJsonFn(),
        method: link.method,
        timeout: 0,
        data: payload,
        withCredentials: false,
        headers
      });
    });

const logoutIfSessionExpired = <T>(whenUnauthorized: Task<never, void>) => (
  err: AppyError
): Task<AppyError, T> => {
  switch (err.kind) {
    case "bad-status":
      if (err.response.status === 401) {
        return (whenUnauthorized as Task<BadStatus, void>).andThen(() =>
          Task.fail(err)
        );
      } else {
        return Task.fail(err);
      }
    case "bad-payload":
    case "bad-url":
    case "missing-application-id":
    case "network-error":
    case "timeout":
      return Task.fail(err);
  }
};

export const callApi = <T, Link extends HReferenceable>(
  token: Maybe<string>
) => (whenUnauthorized: Task<never, void>) => (
  decoder: Decoder<T>,
  payload: unknown
) => (link: Link): Task<AppyError, T> =>
  request(token)(link, decoder, payload)
    .andThen(toHttpTask)
    .orElse(logoutIfSessionExpired(whenUnauthorized));

export const postToApi = (token: Maybe<string>) => (
  whenUnauthenticated: Task<never, void>
) => (payload: unknown) => <Link extends HReferenceable>(
  link: Link
): Task<AppyError, string> =>
  applicationIdHeader
    .map(header => [header])
    .map(appendAuthHeader(token))
    .map(headers => {
      const request = post(link.href)
        .withData(payload)
        .setWithCredentials(false);
      return headers.reduce((req, header) => req.withHeader(header), request);
    })
    .andThen(toHttpTask)
    .orElse(logoutIfSessionExpired(whenUnauthenticated));

export const putToApi = (token: Maybe<string>) => (
  whenUnauthenticated: Task<never, void>
) => (payload: unknown) => <Link extends HReferenceable>(
  link: Link
): Task<AppyError, string> =>
  applicationIdHeader
    .map(header => [header])
    .map(appendAuthHeader(token))
    .map(headers => {
      const request = put(link.href)
        .withData(payload)
        .setWithCredentials(false);
      return headers.reduce((req, header) => req.withHeader(header), request);
    })
    .andThen(toHttpTask)
    .orElse(logoutIfSessionExpired(whenUnauthenticated));

export const deleteToApi = (token: Maybe<string>) => (
  whenAuthenticated: Task<never, void>
) => <Link extends HReferenceable>(link: Link): Task<AppyError, string> =>
  applicationIdHeader
    .map(header => [header])
    .map(appendAuthHeader(token))
    .map(headers => {
      const request = del(link.href).setWithCredentials(false);
      return headers.reduce((req, header) => req.withHeader(header), request);
    })
    .andThen(toHttpTask)
    .orElse(logoutIfSessionExpired(whenAuthenticated));

export const getFromApi = (token: Maybe<string>) => (
  whenAuthenticated: Task<never, void>
) => (payload: {}) => <Link extends HReferenceable>(
  link: Link
): Task<AppyError, string> =>
  applicationIdHeader
    .map(header => [header])
    .map(appendAuthHeader(token))
    .map(headers => {
      const request = get(link.href)
        .withData(payload)
        .setWithCredentials(false);
      return headers.reduce((req, header) => req.withHeader(header), request);
    })
    .andThen(toHttpTask)
    .orElse(logoutIfSessionExpired(whenAuthenticated));

export const getRespFromApi = (token: Maybe<string>) => (
  whenUnauthenticated: Task<never, void>
) => (payload: unknown) => <Link extends HReferenceable>(
  link: Link
): Task<AppyError, HttpSuccess<string>> =>
  applicationIdHeader
    .map(header => [header])
    .map(appendAuthHeader(token))
    .map(headers => {
      const request = get(link.href)
        .withData(payload)
        .setWithCredentials(false);
      return headers.reduce((req, header) => req.withHeader(header), request);
    })
    .andThen(toHttpResponseTask)
    .orElse(logoutIfSessionExpired(whenUnauthenticated));
