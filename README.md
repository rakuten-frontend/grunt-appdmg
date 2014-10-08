grunt-appdmg
============

> Grunt plugin for generating Mac OSX DMG-images

Overview
--------

[node-appdmg](https://github.com/LinusU/node-appdmg) is an awesome command line tool to generate Mac disk images.
This grunt plugin wraps the node-appdmg and executes it using Gruntfile.  
You can use Grunt template strings in the appdmg config, like: `title: '<%= pkg.name %>'`.

**Note:**  
grunt-appdmg works on **Mac OS X only** due to the node-appdmg limitation.

Getting Started
---------------

If you are new to Grunt, you will find a lot of answers to your questions in their [getting started guide](http://gruntjs.com/getting-started).  
Install this plugin with this command:

```shell
npm install grunt-appdmg --save-dev
```

Once the plugin has been installed, it may be enabled inside your "Gruntfile.js" with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-appdmg');
```

The "appdmg" task
-----------------

In your project's Gruntfile, add a section named `appdmg` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  appdmg: {
    options: {
      title: 'Title of DMG',
      app: 'path/to/your-app.app',
      background: 'path/to/background.png',
      icon: 'path/to/icon.icns',
      icons: {
        size: 80,
        app: [192, 344],
        alias: [448, 344]
      },
      extra: [
        ['path/to/extra-file.txt', 512, 128]
      ]
    },
    target: {
      dest: 'your-app.dmg'
    }
  }
});
```

### Options
Options except for **configFile** follow the spec of node-appdmg.
Please refer the [JSON Specification](https://github.com/LinusU/node-appdmg#json-specification) for details.

* **title** `String` (Required) - The title of the produced DMG, which will be shown when mounted.
* **app** `String` (Required) - Path to your .app.
* **background** `String` (Required) - Path to your background.
* **icon** `String` - Path to your icon, which will be shown when mounted.
* **icons** `Object` (Required) - Size and position of the icons in the DMG.
  * **size** `Number` (Required) - Icon size.
  * **app** `Array` (Required) - Position of your application. Specified as X and Y in the center of icon.
  * **alias** `Array` (Required) - Position of alias to the Applications folder.
  * **extra** `Array` - Optional extra files to be put in the DMG. Each entry is [path, Xpos, Ypos].


* **configFile** `String` Default: `.tmp/appdmg/config.json` - Path to the temporary config file for appdmg task.

License
-------

Copyright (c) 2014 Rakuten, Inc. Licensed under the [MIT License](http://opensource.org/licenses/MIT).
