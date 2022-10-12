'use strict';

const strings = require('..');
const assert = require('assert').strict;

assert.strictEqual(strings.capitalize('foo'), 'Foo');
assert.strictEqual(strings.capitalize('italya', 'tr'), 'İtalya');
assert.strictEqual(strings.capitalize('𐐶𐐲𐑌𐐼𐐲𐑉'), '𐐎𐐲𐑌𐐼𐐲𐑉');
assert.strictEqual(strings.capitalize(''), '');

console.info('strings tests passed');
