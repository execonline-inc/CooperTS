import * as assert from 'assert';
import {
  putQueryParam,
  putQueryParamArray,
  putQueryParamRailsArray,
  setPathname,
} from '../src/web-url';

const fooPath = new URL('https://foo.com/foo');

const barPath = setPathname('bar', fooPath);
assert('https://foo.com/bar' === barPath.href, 'setPathname failed');

assert(
  'https://foo.com/foo?foo=1' === putQueryParam('foo', '1', fooPath).href,
  'putQueryParam failed'
);

const queryArray = putQueryParamArray('foo', ['1', '2', '3'], fooPath);
assert(
  'https://foo.com/foo?foo=1&foo=2&foo=3' === queryArray.href,
  `putQueryParamArray failed: ${queryArray.href}`
);

const railsStyleQueryArray = putQueryParamRailsArray('foo', ['1', '2', '3'], fooPath);
assert(
  'https://foo.com/foo?foo%5B%5D=1&foo%5B%5D=2&foo%5B%5D=3' === railsStyleQueryArray.href,
  `putQueryParamArray failed: ${railsStyleQueryArray.href}`
);
