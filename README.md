# grunt-image-base64-sass

> Reads images, writes base64 string to scss file

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-image-base64-sass --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-image-base64-sass');
```

## The "image_base64_sass" task

### Overview

```js
grunt.initConfig({
   image_base64_sass: {
              build: {
                  options: {
                      dest: 'src/styles/_imagess.scss'
                  },
                  files: [{src: 'src/images/raid-icons.jpg'}, {src: 'src/images/heroic.png'}]
              }
          }
});
```

### License
Copyright 2014 Robin Radic
[MIT Licensed](http://radic.mit-license.org)