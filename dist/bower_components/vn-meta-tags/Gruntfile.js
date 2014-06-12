'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  //// Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: {
      // configurable paths
      app: 'src',
      dist: 'dist'
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      views: {
        files: ['<%= yeoman.app %>/*.html'],
        tasks: ['copy', 'htmlmin', 'browserify:test', 'karma'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['index.js', '<%= yeoman.app %>/*.js'],
        tasks: ['newer:jshint:all', 'copy', 'browserify:test', 'karma'],
        options: {
          livereload: true
        }
      },
      jsTest: {
        files: ['test/spec/*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['karma']
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= yeoman.app %>'
          ],
          middleware: function (connect, options) {
            var middlewares = [];

            if (!Array.isArray(options.base)) {
              options.base = [options.base];
            }

            var directory = options.directory || options.base[options.base.length - 1];
            options.base.forEach(function (base) {
              // Serve static files.
              middlewares.push(connect.static(base));
            });

            // Make directory browse-able.
            middlewares.push(connect.directory(directory));

            return middlewares;
          }
        }
      },
      test: {
        options: {
          port: 9001,
          base: [
            '.tmp',
            'test',
            '<%= yeoman.app %>'
          ]
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        'index.js',
        '<%= yeoman.app %>/*.js'
      ],
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      server: '.tmp'
    },

    htmlmin: {
      options: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true, // Only if you don't use comment directives!
        removeCommentsFromCDATA: true,
        removeEmptyAttributes: false,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      },
      views: {
        files: [{
          expand: true,
          cwd: '.tmp',
          src: '**/*.html',
          dest: '.tmp'
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      app: {
        expand: true,
        cwd: '',
        src: ['index.js', '<%= yeoman.app %>/**'],
        dest: '.tmp'
      }
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },

    browserify: {
      test: {
        options: {
          debug: true
        },
        files: {
          '.tmp/index.js': ['.tmp/index.js']
        }
      }
    }
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'newer:jshint',
      'clean',
      'copy',
      'htmlmin',
      'browserify',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('test', [
    'clean',
    'copy',
    'htmlmin',
    'browserify',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('default', [
    'serve'
  ]);
};
