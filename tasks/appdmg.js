'use strict';

var path = require('path');
var appdmg = require('appdmg');
var _ = require('lodash');
var chalk = require('chalk');

function isAbsolutePath(p) {
  return path.normalize(p) === path.resolve(p);
}

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
  grunt.registerMultiTask('appdmg', 'Generate DMG-images for Mac OSX', function () {

    // Merge task-specific and/or target-specific options with these defaults.
    var defaults = {
      configFile: '.tmp/appdmg/config.json'
    };
    var options = this.options(defaults);
    var config;
    var done = this.async();

    function getConfig(options) {
      var config = _.cloneDeep(options);
      var baseDir = path.dirname(options.configFile);
      var pathProperties = ['icon', 'background'];
      delete config.configFile;

      // Replace properties with correct relative path
      pathProperties.forEach(function (property) {
        if (config[property]) {
          config[property] = path.relative(baseDir, options[property]);
        }
      });
      if (config.contents) {
        config.contents.forEach(function (contents) {
          if (isAbsolutePath(contents.path)) { return; }
          contents.path = path.relative(baseDir, contents.path);
        });
      }
      return config;
    }

    // Save appdmg config json.
    config = getConfig(options);
    grunt.file.write(options.configFile, JSON.stringify(config, null, 2));

    // Iterate over all specified file groups.
    this.files.forEach(function (filePair) {

      var dirname = path.dirname(filePair.dest);
      var emitter;

      // Create directory beforehand to prevent error.
      grunt.file.mkdir(dirname);

      // Run appdmg module.
      emitter = appdmg(options.configFile, filePair.dest);
      emitter.on('progress', function (info) {
        if (info.type === 'step-begin') {
          var line =  '[' + (info.current <= 9 ? ' ' : '') + info.current + '/' + info.total + '] ' + info.title + '...';
          grunt.log.write(line + String.repeat(' ', 45 - line.length));
        }
        if (info.type === 'step-end') {
          var op = ({
            ok: ['green', ' OK '],
            skip: ['yellow', 'SKIP'],
            error: ['red', 'FAIL']
          }[info.status]);
          grunt.log.write('[' + chalk[op[0]](op[1]) + ']\n');
        }
      });
      emitter.on('finish', function (image) {
        grunt.log.writeln('\nImage: ' + chalk.cyan(filePair.dest) + ' was created');
        done();
      });
      emitter.on('error', function (info) {
        grunt.log.error('Error');
        done(false);
      });

    });

  });

};
