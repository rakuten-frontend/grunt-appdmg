'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // ESLint
    eslint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        'test/*.js'
      ]
    },

    // Clean up
    clean: {
      tests: ['test/tmp']
    },

    // "appdmg" task for tests
    appdmg: {
      basic: {
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
        dest: 'test/tmp/basic.dmg'
      },
      basepath: {
        options: {
          basepath: 'test/fixtures/',
          title: '<%= pkg.name %> Test',
          background: 'TestBkg.png',
          'icon-size': 80,
          contents: [
            {
              x: 192,
              y: 344,
              type: 'file',
              path: 'TestApp.app'
            },
            {
              x: 448,
              y: 344,
              type: 'link',
              path: '/Applications'
            }
          ]
        },
        dest: 'test/tmp/basepath.dmg'
      },
      extra: {
        options: {
          basepath: 'test/fixtures/',
          title: '<%= pkg.name %> Test',
          icon: 'TestIcon.icns',
          background: 'TestBkg.png',
          'icon-size': 80,
          contents: [
            {
              x: 192,
              y: 344,
              type: 'file',
              path: 'TestApp.app'
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
              path: 'TestDoc.txt'
            }
          ]
        },
        dest: 'test/tmp/extra.dmg'
      }
    },

    // Unit tests
    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "test/tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['eslint', 'clean', 'appdmg', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['test']);
};
