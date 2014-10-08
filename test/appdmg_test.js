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
    test.expect(2);
    var exists = fs.existsSync('tmp/basic.dmg');
    var actual = grunt.file.read('.tmp/appdmg/config.json');
    var expected = grunt.file.read('test/expected/config.json');
    test.ok(exists, 'should create the dmg file with basic option.');
    test.equal(actual, expected, 'should describe what the behavior of basic option is.');
    test.done();
  },

  extra: function (test) {
    test.expect(2);
    var exists = fs.existsSync('tmp/extra.dmg');
    var actual = grunt.file.read('.tmp/appdmg/extra.json');
    var expected = grunt.file.read('test/expected/extra.json');
    test.ok(exists, 'should create the dmg file with extra option.');
    test.equal(actual, expected, 'should describe what the behavior of extra option is.');
    test.done();
  }

};
