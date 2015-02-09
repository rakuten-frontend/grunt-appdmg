# grunt-appdmg

> Grunt plugin for generating Mac OS X DMG-images

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][deps-image]][deps-url]

## Overview
[node-appdmg](https://github.com/LinusU/node-appdmg) is an awesome command line tool to generate Mac disk images.
This Grunt plugin wraps the node-appdmg and executes it using Gruntfile.  
You can use Grunt template strings in the appdmg config, like: `title: '<%= pkg.name %>'`.

**Note:**  
grunt-appdmg works on **Mac OS X only** due to the node-appdmg limitation.

## Getting Started
If you are new to Grunt, you will find a lot of answers to your questions in their [getting started guide](http://gruntjs.com/getting-started).  
Install this plugin with this command:

```shell
npm install grunt-appdmg --save-dev
```

Once the plugin has been installed, it may be enabled inside your "Gruntfile.js" with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-appdmg');
```

## The "appdmg" task

### Options
See the [JSON Specification](https://github.com/LinusU/node-appdmg#json-specification) of node-appdmg.
`basepath` is also supported.

#### basepath
Type: `String`  
Default: `process.cwd()` - Project root

Optional. Base path to look for asset files: `icon`, `background` and `contents.path`.

### Example config
In your project's Gruntfile, add a section named `appdmg` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  appdmg: {
    options: {
      basepath: 'path/to/assets',
      title: 'Title of DMG',
      icon: 'icon.icns',
      background: 'background.png',
      'icon-size': 80,
      contents: [
        {x: 448, y: 344, type: 'link', path: '/Applications'},
        {x: 192, y: 344, type: 'file', path: 'your-app.app'},
        {x: 512, y: 128, type: 'file', path: 'extra-file.txt'}
      ]
    },
    target: {
      dest: 'path/to/your-app.dmg'
    }
  }
});
```

## License
Copyright (c) 2014-2015 Rakuten, Inc. Licensed under the [MIT License](LICENSE).

[npm-image]: https://img.shields.io/npm/v/grunt-appdmg.svg?style=flat
[npm-url]: https://www.npmjs.com/package/grunt-appdmg
[travis-image]: https://img.shields.io/travis/rakuten-frontend/grunt-appdmg/master.svg?style=flat
[travis-url]: https://travis-ci.org/rakuten-frontend/grunt-appdmg
[deps-image]: http://img.shields.io/david/rakuten-frontend/grunt-appdmg.svg?style=flat
[deps-url]: https://david-dm.org/rakuten-frontend/grunt-appdmg
