/*
 * grunt-make-b64image
 * https://github.com/robinradic/wow-raid-icons
 *
 * Copyright (c) 2014 Robin Radic
 * Licensed under the MIT license.
 */

'use strict';
var fs = require('fs');
var _ = require('lodash');
var util = require('util');
var path = require('path');

function decodeImage(imagePath, callback) {
    fs.readFile(imagePath, function (err, original_data) {
        callback(original_data.toString('base64'));
    });
}

var tpl = '<% _.each(files, function(file){ %>' +
    "$image-<%= file.name %>: 'data:image/png;base64,<%= file.base64 %>'\n" +
    "<% }); %>";

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('grunt-image-base64-sass', 'Reads images, writes base64 string to scss file', function () {
        var done = this.async();
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            punctuation: '.',
            separator: ', '
        });

        var templateData = [];



        // Iterate over all specified file groups.
        this.files.forEach(function (f) {
            // Concat specified files.
            var src = f.src.filter(function (filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function (filepath) {
                // Read file source.
                return grunt.file.read(filepath);
            }).join(grunt.util.normalizelf(options.separator));

            // Handle options.
            src += options.punctuation;
            var base64 = new Buffer(src, 'binary').toString('base64');
            var filename = path.basename(f.src[0]);
            var name = filename.replace( path.extname(filename), '');

            templateData.push({
                filename: filename,
                name: name,
                base64: base64
            });

            // Write the destination file.
           // decodeImage(src, function (b64) {
              //  grunt.file.write(f.dest, b64);
            //    grunt.log.writeln('File "' + f.dest + '" created.');
          //  });

            // Print a success message.

        });
        var newFileContent = _.template(tpl, { files: templateData });
        grunt.log.writeln(util.inspect(templateData));
        fs.writeFile(this.options().dest, newFileContent, function(err){
            if(err) throw err;
            grunt.log.writeln('File written');
            done();
        });
    });

};
