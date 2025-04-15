import { readVarT } from '@execonline-inc/environment';
import { identity } from '@kofno/piper';
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
  toHttpTask,
} from 'ajaxian';
import { Decoder } from 'jsonous';
import { Maybe } from 'maybeasy';
import { Task } from 'taskarian';

/**
 * Represents an error state where the application ID is missing.
 *
 * This interface is used to indicate that a required application ID
 * was not provided or is unavailable. It can be used in error handling
 * scenarios to identify this specific type of issue.
 *
 * @property kind - A string literal identifying the type of error as 'missing-application-id'.
 */
export interface MissingApplicationId {
  kind: 'missing-application-id';
}

/**
 * Represents an error that can occur within the Appy application.
 * This is a union type that can be either an `HttpError` or a `MissingApplicationId`.
 */
export type AppyError = HttpError | MissingApplicationId;

const missingApplicationId = (): MissingApplicationId => ({
  kind: 'missing-application-id',
});

const appId = readVarT('REACT_APP_APPLICATION_ID').mapError<AppyError>(missingApplicationId);
const applicationIdHeader = appId.map((id) => header('application-id', id));

const appendAuthHeader =
  (token: Maybe<string>) =>
  (headers: Header[]): Header[] => {
    return token.cata({
      Just: (t) => [...headers, header('authorization', `Bearer ${t}`)],
      Nothing: () => headers,
    });
  };

/**
 * Represents an object that can be referenced via a hyperlink.
 *
 * @interface HReferenceable
 * @property {string} href - The URL or hyperlink reference.
 * @property {Method} method - The HTTP method associated with the reference (e.g., GET, POST).
 */
export interface HReferenceable {
  href: string;
  method: Method;
}

/**
 * Creates a function to build a `RequestBuilder` for a given link, decoder, and payload.
 *
 * @template Link - A type that extends `HReferenceable`, representing a hyperlink referenceable object.
 * @template T - The type of the decoded response.
 *
 * @param token - A `Maybe<string>` representing an optional authentication token.
 * @returns A function that takes a link, a decoder, and a payload, and returns a `Task` that resolves to a `RequestBuilder<T>`.
 *
 * The returned function:
 * - Accepts a `link` of type `Link`, a `decoder` of type `Decoder<T>`, and a `payload` of type `unknown`.
 * - Constructs a `RequestBuilder<T>` with the provided link, decoder, and payload.
 * - Adds headers, including an optional application ID header and an authentication header if the token is provided.
 *
 * @example
 * ```typescript
 * const token = just("auth-token");
 * const link = { href: "https://api.example.com/resource", method: "POST" };
 * const decoder = new Decoder<MyResponseType>(...);
 * const payload = { key: "value" };
 *
 * const result = await Task.succeed(token)
 *  .andThen(request)
 *  .andThen(req => {
 *    return req(link, decoder, payload);
 *  })
 *  .run();
 * ```
 */
export const request =
  <Link extends HReferenceable>(token: Maybe<string>) =>
  <T>(link: Link, decoder: Decoder<T>, payload: unknown): Task<AppyError, RequestBuilder<T>> =>
    applicationIdHeader
      .map((header) => [header])
      .map(appendAuthHeader(token))
      .map((headers) => {
        return new RequestBuilder<T>({
          url: link.href,
          decoder: decoder.toJsonFn(),
          method: link.method,
          timeout: 0,
          data: payload,
          withCredentials: false,
          headers,
        });
      });

const logoutIfSessionExpired =
  <T>(whenUnauthorized: Task<never, void>) =>
  (err: AppyError): Task<AppyError, T> => {
    switch (err.kind) {
      case 'bad-status':
        if (err.response.status === 401) {
          return (whenUnauthorized as Task<BadStatus, void>).andThen(() => Task.fail(err));
        } else {
          return Task.fail(err);
        }
      case 'bad-payload':
      case 'bad-url':
      case 'missing-application-id':
      case 'network-error':
      case 'timeout':
        return Task.fail(err);
    }
  };

/**
 * Creates a function to call an API endpoint with a given token, handling decoding,
 * error management, and session expiration.
 *
 * @template T - The type of the decoded response.
 * @template Link - The type of the link object, which must extend `HReferenceable`.
 * @param token - A `Maybe<string>` representing the authentication token.
 * @returns A function that takes a `whenUnauthorized` task, which is executed when the session is expired.
 * The returned function then takes a decoder, a payload, and a link, and returns a `Task` that resolves
 * to the decoded response or an `AppyError`.
 *
 * @example
 * ```typescript
 * const result = await Task.succeed(token)
 *  .andThen(callApi)
 *  .andThen(apiCaller => apiCaller(handleUnauthorized))
 *  .andThen(apiCaller => apiCaller(myDecoder, myPayload))
 *  .andThen(apiCaller => apiCaller(myLink))
 *  .run();
 * ```
 */
export const callApi =
  <T, Link extends HReferenceable>(token: Maybe<string>) =>
  (whenUnauthorized: Task<never, void>) =>
  (decoder: Decoder<T>, payload: unknown) =>
  (link: Link): Task<AppyError, T> =>
    Task.succeed<AppyError, {}>({})
      .assign('fn', Task.succeed(request(token)))
      .assign('request', ({ fn }) => fn(link, decoder, payload))
      .andThen<T>(({ request }) => toHttpTask<T>(request))
      .orElse(logoutIfSessionExpired(whenUnauthorized))
      .map<T>(identity);

/**
 * Creates a function to post data to an API endpoint with optional authentication.
 *
 * @param token - A `Maybe<string>` representing the authentication token. If `Nothing`, the request will not include an authentication header.
 * @returns A higher-order function that takes the following parameters:
 *
 * - `whenUnauthenticated`: A `Task<never, void>` that will be executed when the user is unauthenticated.
 * - `payload`: The data to be sent in the request body.
 * - `link`: An object of type `HReferenceable` containing the API endpoint information.
 *
 * The returned function performs the following:
 * - Adds an `applicationIdHeader` to the request headers.
 * - Optionally appends an authentication header if a token is provided.
 * - Constructs an HTTP POST request with the given payload and headers.
 * - Converts the request into a `Task` that resolves to the response string or an `AppyError`.
 * - Handles session expiration by executing the `whenUnauthenticated` task if necessary.
 *
 * @typeParam Link - A type extending `HReferenceable` that represents the API endpoint.
 * @returns A `Task<AppyError, string>` representing the result of the HTTP request.
 */
export const postToApi =
  (token: Maybe<string>) =>
  (whenUnauthenticated: Task<never, void>) =>
  (payload: unknown) =>
  <Link extends HReferenceable>(link: Link): Task<AppyError, string> =>
    applicationIdHeader
      .map((header) => [header])
      .map(appendAuthHeader(token))
      .map((headers) => {
        const request = post(link.href).withData(payload).setWithCredentials(false);
        return headers.reduce((req, header) => req.withHeader(header), request);
      })
      .andThen<string>(toHttpTask)
      .orElse(logoutIfSessionExpired(whenUnauthenticated));

/**
 * Creates a function to send a PUT request to an API endpoint with the given payload and link.
 *
 * @param token - A `Maybe<string>` representing the authentication token. If provided, it will be used to add an authorization header.
 * @param whenUnauthenticated - A `Task<never, void>` that will be executed if the user is unauthenticated.
 * @returns A function that accepts a payload and a link, and returns a `Task<AppyError, string>` representing the result of the API call.
 *
 * The function performs the following steps:
 * 1. Adds an application ID header.
 * 2. Optionally appends an authorization header if a token is provided.
 * 3. Constructs a PUT request with the given payload and headers.
 * 4. Converts the request into an HTTP task.
 * 5. Handles session expiration by executing the `whenUnauthenticated` task if necessary.
 *
 * @template Link - A type that extends `HReferenceable`, representing the link to the API endpoint.
 */
export const putToApi =
  (token: Maybe<string>) =>
  (whenUnauthenticated: Task<never, void>) =>
  (payload: unknown) =>
  <Link extends HReferenceable>(link: Link): Task<AppyError, string> =>
    applicationIdHeader
      .map((header) => [header])
      .map(appendAuthHeader(token))
      .map((headers) => {
        const request = put(link.href).withData(payload).setWithCredentials(false);
        return headers.reduce((req, header) => req.withHeader(header), request);
      })
      .andThen<string>(toHttpTask)
      .orElse(logoutIfSessionExpired(whenUnauthenticated));

/**
 * Creates a function to perform a DELETE request to an API endpoint.
 *
 * @param token - A `Maybe<string>` representing the authentication token. If present, it will be used to authenticate the request.
 * @returns A higher-order function that takes a `whenAuthenticated` task and returns another function.
 *
 * The returned function takes a `link` of type `HReferenceable` and returns a `Task` that performs the DELETE request.
 *
 * - If the `applicationIdHeader` is available, it is included in the request headers.
 * - The `token` is appended as an authentication header if provided.
 * - The DELETE request is constructed using the `link.href` and the headers.
 * - The request is converted into an HTTP task using `toHttpTask`.
 * - If the session is expired, the `logoutIfSessionExpired` handler is invoked with the `whenAuthenticated` task.
 *
 * @template Link - A type that extends `HReferenceable`, representing the resource to delete.
 * @returns A `Task` that resolves to the response as a string or rejects with an `AppyError`.
 */
export const deleteToApi =
  (token: Maybe<string>) =>
  (whenAuthenticated: Task<never, void>) =>
  <Link extends HReferenceable>(link: Link): Task<AppyError, string> =>
    applicationIdHeader
      .map((header) => [header])
      .map(appendAuthHeader(token))
      .map((headers) => {
        const request = del(link.href).setWithCredentials(false);
        return headers.reduce((req, header) => req.withHeader(header), request);
      })
      .andThen<string>(toHttpTask)
      .orElse(logoutIfSessionExpired(whenAuthenticated));

/**
 * Creates a function to perform an API request using a provided token and payload.
 *
 * @param token - A `Maybe<string>` representing the authentication token. If the token is `Nothing`,
 *                the request will not include an authentication header.
 * @returns A function that takes a `whenAuthenticated` task, which is executed when the user is authenticated.
 *          This function returns another function that takes a `payload` object to be sent with the request.
 *          Finally, it returns a function that takes a `link` of type `HReferenceable` and performs the API request.
 *
 * @template Link - A type that extends `HReferenceable`, representing the link to the API endpoint.
 *
 * @param whenAuthenticated - A `Task<never, void>` that is executed when the user is authenticated.
 * @param payload - An object containing the data to be sent with the API request.
 * @param link - An object of type `Link` that contains the `href` property, representing the API endpoint.
 * @returns A `Task<AppyError, string>` that represents the result of the API request. If the request is successful,
 *          it resolves to a `string` (e.g., the response body). If an error occurs, it resolves to an `AppyError`.
 *
 * The function constructs the request by:
 * - Adding an `applicationIdHeader` to the request headers.
 * - Optionally appending an authentication header if a token is provided.
 * - Configuring the request with the provided payload and disabling credentials.
 * - Executing the request using `toHttpTask`.
 * - Handling session expiration errors by invoking `logoutIfSessionExpired` with the `whenAuthenticated` task.
 */
export const getFromApi =
  (token: Maybe<string>) =>
  (whenAuthenticated: Task<never, void>) =>
  (payload: {}) =>
  <Link extends HReferenceable>(link: Link): Task<AppyError, string> =>
    applicationIdHeader
      .map((header) => [header])
      .map(appendAuthHeader(token))
      .map((headers) => {
        const request = get(link.href).withData(payload).setWithCredentials(false);
        return headers.reduce((req, header) => req.withHeader(header), request);
      })
      .andThen<string>(toHttpTask)
      .orElse(logoutIfSessionExpired(whenAuthenticated));

/**
 * Creates a function to make an authenticated API request and handle potential session expiration.
 *
 * @param token - A `Maybe<string>` representing the authentication token. If `Nothing`, the request will not include an authentication header.
 * @param whenUnauthenticated - A `Task<never, void>` that will be executed if the session is determined to be expired or unauthenticated.
 * @returns A function that takes a payload and returns another function to make the API request.
 *
 * The returned function:
 * - Accepts a payload of type `unknown` to be sent with the request.
 * - Returns a function that takes a `Link` of type `HReferenceable` and returns a `Task<AppyError, HttpSuccess<string>>`.
 *
 * The request process:
 * 1. Adds an `applicationIdHeader` if available.
 * 2. Appends an authentication header if a valid token is provided.
 * 3. Constructs the request with the provided payload and headers.
 * 4. Sends the request and converts the response into a `Task<HttpSuccess<string>>`.
 * 5. Handles session expiration by executing the `whenUnauthenticated` task if necessary.
 *
 * @template Link - A type extending `HReferenceable` representing the API link.
 */
export const getRespFromApi =
  (token: Maybe<string>) =>
  (whenUnauthenticated: Task<never, void>) =>
  (payload: unknown) =>
  <Link extends HReferenceable>(link: Link): Task<AppyError, HttpSuccess<string>> =>
    applicationIdHeader
      .map((header) => [header])
      .map(appendAuthHeader(token))
      .map((headers) => {
        const request = get(link.href).withData(payload).setWithCredentials(false);
        return headers.reduce((req, header) => req.withHeader(header), request);
      })
      .andThen<HttpSuccess<string>>(toHttpResponseTask)
      .orElse(logoutIfSessionExpired(whenUnauthenticated));
