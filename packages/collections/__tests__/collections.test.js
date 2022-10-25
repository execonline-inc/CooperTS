'use strict';

const assert = require('assert');
const collections = require('..');

assert.deepEqual([0, 1, 2, 3, 4], [...collections.range(5)]);
