import { get, HttpError, toHttpTask } from 'ajaxios';
import Task from 'taskarian';
import { quoteDecoder } from './Decoders';
import { ZenQuote } from './Types';

export const getZenQuote = (): Task<HttpError, ZenQuote> =>
  toHttpTask(get('https://zenquotes.io/api/random').withDecoder(quoteDecoder));
