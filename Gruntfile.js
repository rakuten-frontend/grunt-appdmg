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
      tests: ['test/.tmp']
    },

    // Configuration to be run (and then tested).
    appdmg: {
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
      basic: {
        dest: 'test/.tmp/basic.dmg'
      },
      extra: {
        dest: 'test/.tmp/extra.dmg',

        options: {
          icon: 'TestIcon.icns',
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

  // Whenever the "test" task is run, first clean the ".tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['jshint', 'clean', 'appdmg', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['test']);

};
