'use strict';

module.exports = function (grunt) {

  var path = require('path');
  var appdmg = require('appdmg');
  var _ = require('lodash');

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

    var getConfig = function (options) {
      var config = _.cloneDeep(options);
      var baseDir = path.dirname(options.configFile);
      var targetProperties = ['app', 'background', 'icon'];
      delete config.configFile;
      targetProperties.forEach(function (property) {
        if (config[property]) {
          config[property] = path.relative(baseDir, options[property]);
        }
      });
      if (config.extra) {
        config.extra.forEach(function (extra) {
          extra[0] = path.relative(baseDir, extra[0]);
        });
      }
      return config;
    };

    // Save appdmg config json.
    config = getConfig(options);
    grunt.file.write(options.configFile, JSON.stringify(config));

    // Iterate over all specified file groups.
    this.files.forEach(function (filePair) {

      var dirname = path.dirname(filePair.dest);

      // Create directory beforehand to prevent error.
      grunt.file.mkdir(dirname);

      // Run appdmg module.
      appdmg(options.configFile, filePair.dest, function (err, image) {
        if (err) {
          grunt.log.error('Error');
          done(false);
        }
        else {
          grunt.log.writeln('\n"' + image + '" was created!');
          done();
        }
      });

    });

  });

};
