'use strict';

const maybeAdapter = require('..');
const maybeasy = require('maybeasy');
const assert = require('assert');

maybeasy
  .just(123)
  .andThen(maybeAdapter.when(n => n === 123))
  .do(n => assert.strictEqual(n, 123))
  .elseDo(() => assert.fail('Expected fromBool to succeed'));
