import { toHttpTask, HttpError, RequestBuilder, Header, header } from 'ajaxian';
import Task from 'taskarian';
import Decoder from 'jsonous';
import { Link } from './Resource/Types';

const request = <T>(
  link: Link,
  decoder: Decoder<T>,
  payload: {},
  headers: Header[] = []
): RequestBuilder<T> => {
  return new RequestBuilder<T>({
    url: link.href,
    decoder: decoder.toJsonFn(),
    method: link.method,
    timeout: 0,
    data: payload,
    withCredentials: false,
    headers,
  });
};

/**
 * The callApi function takes a decoder, payload, link, and headers and returns a task that will make
 * an ajax request using the link and headers provided when forked and return either a decoded object
 * or an error.
 */
export const callApi = <T>(
  decoder: Decoder<T>,
  payload: {},
  headers: Header[] = []
) => (link: Link): Task<HttpError, T> =>
  toHttpTask(request(link, decoder, payload, headers));
