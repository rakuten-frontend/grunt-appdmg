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
        background: 'test/fixtures/TestBkg.png',
        'icon-size': 80,
        contents: [
          {
            x: 192,
            y: 344,
            type: 'file',
            path: 'test/fixtures/TestApp.app'
          },
          {
            x: 448,
            y: 344,
            type: 'link',
            path: '/Applications'
          }
        ]
      },
      basic: {
        dest: 'tmp/basic.dmg'
      },
      extra: {
        dest: 'tmp/extra.dmg',
        options: {
          configFile: '.tmp/appdmg/extra.json',
          icon: 'test/fixtures/TestIcon.icns',
          contents: [
            {
              x: 192,
              y: 344,
              type: 'file',
              path: 'test/fixtures/TestApp.app'
            },
            {
              x: 448,
              y: 344,
              type: 'link',
              path: '/Applications'
            },
            {
              x: 512,
              y: 128,
              type: 'file',
              path: 'test/fixtures/TestDoc.txt'
            }
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
