import { InvalidUrlError, toUrlT, URLParser } from '@execonline-inc/url';
import { get, Header, HttpError, toHttpTask } from 'ajaxios';
import Task from 'taskarian';
import { jokeDecoder } from './Decoders';
import { Joke } from './Types';

export type QuoteError = InvalidUrlError | HttpError;

const href = 'https://icanhazdadjoke.com/';

const header: Header = { field: 'Accept', value: 'application/json' };

const parseUrlTask = (href: string): Task<QuoteError, URLParser> => toUrlT(href);

export const getJoke = (url: URLParser): Task<QuoteError, Joke> =>
  toHttpTask(
    get(url.toString())
      .withHeader(header)
      .withDecoder(jokeDecoder),
  );

export const runJoke = () => parseUrlTask(href).andThen(getJoke);
