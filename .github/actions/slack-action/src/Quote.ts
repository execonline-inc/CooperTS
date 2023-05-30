import { get, Header, HttpError, toHttpTask } from 'ajaxios';
import Task from 'taskarian';
import { jokeDecoder } from './Decoders';
import { Joke } from './Types';

const href = 'https://icanhazdadjoke.com/';

const header: Header = { field: 'Accept', value: 'application/json' };

export const getJoke = (): Task<HttpError, Joke> =>
  toHttpTask(
    get(href)
      .withDecoder(jokeDecoder)
      .withHeader(header),
  );
