// Generated on 2014-06-16 using generator-angular 0.8.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Define the configuration for all the tasks
	grunt.initConfig({

		// Project settings
		yeoman: {
			// configurable paths
			app: require('./bower.json').appPath || 'app',
			dist: 'dist'
		},

		// Environment variables
		ngconstant: {
			// Options for all targets
			options: {
				space: '  ',
				wrap: '\'use strict\';\n\n {%= __ngModule %}',
				name: 'config'
			},
			// Environment targets
			// see "BUILD" task to add additional targets
			samplestore: {
				options: {
					dest: '<%= yeoman.app %>/scripts/config.js'
				},
				constants: {
					ENV: {
						name: 'samplestore',
						host: 'http://www.samplestore.io',
						apiEndpoint: '/api/v1'
					}
				}
			},
			mybox: {
				options: {
					dest: '<%= yeoman.app %>/scripts/config.js'
				},
				constants: {
					ENV: {
						name: 'mybox',
						host: 'http://txlpt374-vm.corp.volusion.com',
						apiEndpoint: '/api/v1'
					}
				}
			},
			production: {
				options: {
					dest: '<%= yeoman.app %>/scripts/config.js'
				},
				constants: {
					ENV: {
						name: 'production',
						host: '',
						apiEndpoint: '/api/v1'
					}
				}
			}
		},

		// Watches files for changes and runs tasks based on the changed files
		watch: {
			bower: {
				files: ['bower.json'],
				tasks: ['wiredep']
			},
			html: {
				files: ['<%= yeoman.app %>/*.html', '<%= yeoman.app %>/views/**/*.html'],
				tasks: ['htmlmin:server'],
				options: {
					livereload: true
				}
			},
			js: {
				files: ['<%= yeoman.app %>/scripts/{,*/}*.js', '<%= yeoman.app %>/bower_components/vn-toolbox-common/dist/vn-toolbox-common.js'],
				tasks: ['newer:jshint:all'],
				options: {
					livereload: true
				}
			},
			jsTest: {
				files: ['test/spec/{,*/}*.js'],
				tasks: ['newer:jshint:test', 'karma']
			},
			compass: {
				files: ['<%= yeoman.app %>/styles/**/*.{scss,sass}'],
				tasks: ['compass:server', 'autoprefixer']
			},
			css: {
				files: ['<%= yeoman.app %>/styles/**/*.css}'],
				tasks: ['autoprefixer']
			},
			gruntfile: {
				files: ['Gruntfile.js']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
						'<%= yeoman.app %>/{,*/}*.html',
						'.tmp/styles/{,*/}*.css',
						'<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
						'<%= yeoman.app %>/translations/{,*/}*.json',
						'<%= yeoman.app %>/settings/{,*/}*'
				]
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
			rules: [
				{ from: '^/(bower_components|fonts|images|scripts|styles|translations|views)(/.*)$', to: '/$1$2' },
				{ from: '^/404.html', to: '/404.html' },
				{ from: '^/(.*)$', to: '/index.html' }
			],
			livereload: {
				options: {
					open: true,
					base: [
						'.tmp',
						'<%= yeoman.app %>/'
					],
					middleware: function(connect, options) {
						var middlewares = [];
						var directory = options.directory || options.base[options.base.length - 1];
						if (!Array.isArray(options.base)) {
							options.base = [options.base];
						}
						// Setup the proxy to the backend for api calls
						//middlewares.push(require('grunt-connect-proxy/lib/utils').proxyRequest);
						//enable modrewrite for html5mode
						middlewares.push(require('connect-modrewrite')(['^[^\\.]*$ /index.html [L]']));
						options.base.forEach(function(base) {
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
			},
			dist: {
				options: {
					base: '<%= yeoman.dist %>'
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
				'<%= yeoman.app %>/scripts/{,*/}*.js'
			],
			test: {
				options: {
					jshintrc: 'test/.jshintrc'
				},
				src: ['test/spec/{,*/}*.js']
			}
		},

		// Empties folders to start fresh
		clean: {
			dist: {
				files: [
						{
							dot: true,
							src: [
								'.tmp',
								'<%= yeoman.dist %>/*',
								'!<%= yeoman.dist %>/.git*'//,
//								'<%= yeoman.app %>/scripts/config.js'
							]
						}
				]
			},
			configure: {
				files: [
					{
						dot: true,
						src: [
							'<%= yeoman.app %>/scripts/config.js'
						]
					}
				]
			},
			server: '.tmp'
		},

		// Add vendor prefixed styles
		autoprefixer: {
			options: {
				browsers: ['last 1 version']
			},
			dist: {
				files: [
						{
							expand: true,
							cwd: '.tmp/styles/',
							src: '{,*/}*.css',
							dest: '.tmp/styles/'
						}
				]
			}
		},

		// Automatically inject Bower components into the app
		wiredep: {
			target: {
				dependencies: true,
				devDependencies: false,
				src: ['<%= yeoman.app %>/index.html'],
				ignorePath: '<%= yeoman.app %>',
				exclude: ['bootstrap.js'],
				fileTypes: {
					html: {
						replace: {
							js: '<script src="/{{filePath}}"></script>',
							css: '<link rel="stylesheet" href="/{{filePath}}" />'
						}
					}
				}
			}
		},

		// Compiles Sass to CSS and generates necessary files if requested
		compass: {
			options: {
				sassDir: '<%= yeoman.app %>/styles',
				cssDir: '.tmp/styles',
				generatedImagesDir: '.tmp/images/generated',
				imagesDir: '<%= yeoman.app %>/images',
				javascriptsDir: '<%= yeoman.app %>/scripts',
				fontsDir: '<%= yeoman.app %>/fonts',
				importPath: [
					'<%= yeoman.app %>/bower_components',
					'<%= yeoman.app %>/bower_components/bootstrap-sass-official/assets/stylesheets'
				],
				httpImagesPath: '/images',
				httpGeneratedImagesPath: '/images/generated',
				httpFontsPath: '/fonts',
				relativeAssets: false,
				assetCacheBuster: false,
				raw: 'Sass::Script::Number.precision = 10\n'
			},
			dist: {
				options: {
					generatedImagesDir: '<%= yeoman.dist %>/images/generated',
					outputStyle: 'compressed'
				}
			},
			server: {
				options: {
					debugInfo: true
				}
			}
		},

		// Renames files for browser caching purposes
		rev: {
			dist: {
				files: {
					src: [
						'<%= yeoman.dist %>/scripts/{,*/}*.js',
						'<%= yeoman.dist %>/styles/{,*/}*.css',
						'!<%= yeoman.dist %>/styles/overrides.css',
						'<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
						'!<%= yeoman.dist %>/images/marketing-assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
						'!<%= yeoman.dist %>/images/homepage/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
						'!<%= yeoman.dist %>/images/theme/tcp-no-image.{png,jpg,jpeg,gif,webp,svg}',
						'<%= yeoman.dist %>/fonts/*'
					]
				}
			}
		},

		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them
		useminPrepare: {
			html: '<%= yeoman.app %>/index.html',
			options: {
				dest: '<%= yeoman.dist %>',
				flow: {
					html: {
						steps: {
							js: ['concat', 'uglifyjs'],
							css: ['cssmin']
						},
						post: {}
					}
				}
			}
		},

		// Performs rewrites based on rev and the useminPrepare configuration
		usemin: {
			html: ['<%= yeoman.dist %>/{,*/}*.html'],
			css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
			options: {
				assetsDirs: ['<%= yeoman.dist %>'],
				patterns: {
					js: [
						[/src=([^ >]+)/g, 'Update template js to reference revved images'],
						[/(styles\/main.css)/gm, 'Update JS to reference our revved main.css'] //used in settings/app.js
					],
					css: [
						[
							/(?:src=|url\(\s*)['"]?(?:\.\.)?([^'"\)(\?|#)]+)['"]?\s*\)?/gm,
							'Update template CSS to reference revved images, accomodate for ../'
						]
					]
				}
			},
			js: [
				'<%= yeoman.dist %>/scripts/*.scripts.js',
				'<%= yeoman.dist %>/settings/app.js'
			]
		},

		// The following *-min tasks produce minified files in the dist folder
		cssmin: {
			options: {
				root: '<%= yeoman.app %>'
			}
		},

		imagemin: {
			dist: {
				files: [
					{
						expand: true,
						cwd: '<%= yeoman.app %>/images',
						src: '{,*/}*.{png,jpg,jpeg,gif}',
						dest: '<%= yeoman.dist %>/images'
					}
				]
			}
		},

		svgmin: {
			dist: {
				files: [
					{
						expand: true,
						cwd: '<%= yeoman.app %>/images',
						src: '{,*/}*.svg',
						dest: '<%= yeoman.dist %>/images'
					}
				]
			}
		},

		htmlmin: {
			options: {
				collapseWhitespace: true,
				collapseBooleanAttributes: true,
				removeCommentsFromCDATA: true
//				removeOptionalTags: true // This option breaks livereload when used.
			},
			server: {
				files: [
					{
						expand: true,
						cwd: '<%= yeoman.app %>',
						src: ['*.html', 'views/{,*/}*.html'],
						dest: '.tmp'
					}
				]
			},
			dist: {
				files: [
					{
						expand: true,
						cwd: '<%= yeoman.dist %>',
						src: ['*.html', 'views/{,*/}*.html'],
						dest: '<%= yeoman.dist %>'
					}
				]
			}
		},

		html2js: {
			options: {
				singleModule: true,
				module: 'Volusion.templates',
				rename: function(moduleName) {
					return moduleName.replace('../app/', '');
				},
				htmlmin: {
					collapseBooleanAttributes: true,
					collapseWhitespace: true,
					removeAttributeQuotes: true,
					removeComments: true,
					removeEmptyAttributes: true,
					removeRedundantAttributes: true,
					removeScriptTypeAttributes: true,
					removeStyleLinkTypeAttributes: true
				}
			},
			templates: {
				src: ['<%= yeoman.app %>/views/{,*/}*.html'],
				dest: '.tmp/templates.js'
			}
		},

		concat: {
			templates: {
				dest: '.tmp/concat/scripts/scripts.js',
				src: [
					'.tmp/concat/scripts/scripts.js',
					'.tmp/templates.js'
				]
			}
		},

		// ngAnnotate tries to make the code safe for minification automatically by
		// using the Angular long form for dependency injection.
		ngAnnotate: {
			dist: {
				files: [
					{
						expand: true,
						cwd: '.tmp/concat/scripts',
						src: '*.js',
						dest: '.tmp/concat/scripts'
					}
				]
			}
		},

		// Copies remaining files to places other tasks can use
		copy: {
			dist: {
				files: [
					{
						expand: true,
						dot: true,
						cwd: '<%= yeoman.app %>',
						dest: '<%= yeoman.dist %>',
						src: [
							'*.{ico,png,txt}',
							'web.config',
							'.htaccess',
							'*.html',
							'views/{,*/}*.html',
							'images/{,*/}*.{webp}',
							'fonts/*',
							'translations/{,*/}*.json',
							'settings/{,*/}*',
							'styles/overrides.css',
							'bower_components/angular-i18n/angular-locale_*.js'
						]
					},
					{
						expand: true,
						cwd: '.tmp',
						dest: '<%= yeoman.dist %>',
						src: ['styles/main.css', 'images/generated/{,*/}*.*']
					}
				]
			}
		},

		// Test settings
		karma: {
			jasmine: {
				configFile: 'karma.conf.jasmine.js',
				singleRun: true
			},
			mocha: {
				configFile: 'karma.conf.mocha.js',
				singleRun: true
			}
		}
	});

	grunt.registerTask('configure', function(target) {

		// Add additional targets according to environment variables
		if (target === 'dist') {
			grunt.log.write('TARGET is set to [DIST]');
			grunt.task.run(['ngconstant:production']);
		} else if (target === undefined || target === 'undefined' || target === '' || target === 'samplestore') {
			//default build
			grunt.task.run(['ngconstant:samplestore']);
			grunt.log.write('TARGET is set to [SAMPLESTORE]');
		} else {
			//specific build
			grunt.task.run(['ngconstant:' + target ]);
			grunt.log.write('TARGET is set to [' + target + ']');
		}
	});

	grunt.registerTask('serve', function(target) {
		if (target === 'dist') {
			return grunt.task.run(['build:dist', 'connect:dist:keepalive']);
		}

		grunt.task.run([
			'clean:server',
			'wiredep',
			'compass:server',
			'configure:' + target,
			'autoprefixer',
			'htmlmin:server',
			'connect:livereload',
			'watch'
		]);
	});

	grunt.registerTask('server', function(target) {
		grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
		grunt.task.run(['serve:' + target]);
	});

	grunt.registerTask('test', function() {
		grunt.task.run([
			'clean:server',
			'newer:jshint:all',
			'compass:server',
			'autoprefixer',
			'connect:test',
			'karma'
		]);
	});

	grunt.registerTask('build', function(target) {
		grunt.task.run([
			'clean:dist',
			'clean:configure',
			'newer:jshint:all',
			'configure:' + target,
			'test',
			'wiredep',
			'useminPrepare',
			'compass:dist',
			'imagemin',
			'svgmin',
			'autoprefixer',
			'concat:generated',
			'html2js',
			'concat:templates',
			'ngAnnotate',
			'copy:dist',
			'cssmin',
			'uglify',
			'rev',
			'usemin',
			'htmlmin:dist'
		]);
	});

	grunt.registerTask('default', [
		'build:samplestore'
	]);
};
