'use strict';

module.exports = function (grunt) {

  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // JSHint
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp', '.tmp']
    },

    // Configuration to be run (and then tested).
    appdmg: {
      options: {
        title: '<%= pkg.name %> Test',
        app: 'test/fixtures/TestApp.app',
        background: 'test/fixtures/TestBkg.png',
        icon: 'test/fixtures/TestIcon.icns',
        icons: {
          size: 80,
          app: [192, 344],
          alias: [448, 344]
        }
      },
      basic: {
        dest: 'tmp/basic.dmg'
      },
      extra: {
        dest: 'tmp/extra.dmg',
        options: {
          configFile: '.tmp/appdmg/extra.json',
          icon: null,
          extra: [
            ['test/fixtures/TestDoc.txt', 512, 128]
          ]
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'appdmg', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
