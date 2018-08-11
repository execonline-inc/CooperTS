import { Method } from 'ajaxian';
import Decoder, { array, field, string, succeed } from 'jsonous';
import { err, ok } from 'resulty';
import { Link, Resource } from '../Types';

const methodDecoder = new Decoder<Method>((value: {}) => {
  if (typeof value !== 'string') {
    const stringified = JSON.stringify(value);
    const errorMsg = `Expected to find an HTTP method string. Instead found ${stringified}`;
    return err(errorMsg);
  }

  switch (value) {
    case 'get':
      return ok(value);
    case 'put':
      return ok(value);
    case 'patch':
      return ok(value);
    case 'post':
      return ok(value);
    case 'delete':
      return ok(value);
    default:
      return err(`${value} is not a recognized http method`);
  }
});

export const linkDecoder: Decoder<Link> = succeed({})
  .assign('rel', field('rel', string))
  .assign('href', field('href', string))
  .assign('method', field('method', methodDecoder));

export const resourceDecoder = <T>(payloadDecoder: Decoder<T>): Decoder<Resource<T>> =>
  succeed({})
    .assign('payload', field('payload', payloadDecoder))
    .assign('links', field('links', array(linkDecoder)));
