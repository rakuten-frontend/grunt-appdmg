'use strict';

var fs = require('fs');

exports.appdmg = {
  basic: function (test) {
    test.expect(1);
    var exists = fs.existsSync('test/tmp/basic.dmg');
    test.ok(exists, 'should create a dmg file with basic option.');
    test.done();
  },

  basepath: function (test) {
    test.expect(1);
    var exists = fs.existsSync('test/tmp/basepath.dmg');
    test.ok(exists, 'should create a dmg file with basepath option.');
    test.done();
  },

  extra: function (test) {
    test.expect(1);
    var exists = fs.existsSync('test/tmp/extra.dmg');
    test.ok(exists, 'should create a dmg file including extra contents.');
    test.done();
  }
};
