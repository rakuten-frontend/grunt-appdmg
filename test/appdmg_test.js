'use strict';

var fs = require('fs');
var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.appdmg = {

  setUp: function (done) {
    // setup here if necessary
    done();
  },

  basic: function (test) {
    test.expect(1);
    var exists = fs.existsSync('test/tmp/basic.dmg');
    test.ok(exists, 'should create the dmg file with basic option.');
    test.done();
  },

  extra: function (test) {
    test.expect(1);
    var exists = fs.existsSync('test/tmp/extra.dmg');
    test.ok(exists, 'should create the dmg file with extra option.');
    test.done();
  }

};
