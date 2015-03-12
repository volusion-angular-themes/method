// Generated on 2014-06-16 using generator-angular 0.8.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

var modRewrite = require('connect-modrewrite');

// Configurable paths for the application
var appConfig = {
	app : require('./bower.json').appPath || 'app',
	dist: 'dist'
};

module.exports = function (grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Define the configuration for all the tasks
	grunt.initConfig({

		// Project settings
		yeoman: appConfig,

		ngconstant  : {
			options: {
				space: '  ',
				wrap : '\'use strict\';\n\n {%= __ngModule %}',
				name : 'config'

			},
			build  : {
				options  : {
					dest: '<%= yeoman.app %>/scripts/config.js'
				},
				constants: {
					ENV: {
						name       : '<%= ENVConstant.name %>',
						host       : '<%= ENVConstant.host %>',
						apiEndpoint: '<%= ENVConstant.apiEndpoint %>'
					}
				}
			}

		},

		// The actual grunt server settings
		connect     : {
			options   : {
				port      : 9000,
				// Change this to '0.0.0.0' to access the server from outside. (? still the case?)
				hostname  : 'localhost',
				livereload: 35729
			},
			rules     : [	//   certain /keywords will open the folder instead of redirecting to /
				{from: '^/(bower_components|fonts|images|scripts|styles|translations|views)(/.*)$', to: '/$1$2'},
				{from: '^/404.html', to: '/404.html'},
				{from: '^/(.*)$', to: '/index.html'}
			],
			livereload: {
				options: {
					open      : true,
					base      : [
						'.tmp',
						'<%= yeoman.app %>/'
					],
					middleware: function (connect, options) {
						//runs automatically, necessary for dev environment
						if (!Array.isArray(options.base)) {
							options.base = [options.base];
						}

						// Setup the proxy
						var middlewares = [

							// Redirect anything that's not a file or an API call to /index.html.
							// This allows HTML5 pushState to work on page reloads.
							modRewrite(['!/api|/assets|\\..+$ /index.html']),

//							require('grunt-connect-proxy/lib/utils').proxyRequest,
							connect.static('.tmp'),
							connect().use(
								'/bower_components',
								connect.static('./bower_components')
							),
							connect.static(appConfig.app)
						];

						// Make directory browse-able.
						var directory = options.directory || options.base[options.base.length - 1];
						middlewares.push(connect.directory(directory));

						return middlewares;
					}
					//middleware: function(connect, options) {
					//	var middlewares = [];
					//	var directory = options.directory || options.base[options.base.length - 1];
					//	if (!Array.isArray(options.base)) {
					//		options.base = [options.base];
					//	}
					//	// Setup the proxy to the backend for api calls
					//	//middlewares.push(require('grunt-connect-proxy/lib/utils').proxyRequest);
					//	//enable modrewrite for html5mode
					//	middlewares.push(require('connect-modrewrite')(['^[^\\.]*$ /index.html [L]']));
					//	options.base.forEach(function(base) {
					//		// Serve static files.
					//		middlewares.push(connect.static(base));
					//	});
					//	// Make directory browse-able.
					//	middlewares.push(connect.directory(directory));
					//	return middlewares;
					//}
				}
			},
			test      : {
				options: {
					port: 9001,
					base: [
						'.tmp',
						'test',
						'<%= yeoman.app %>'
					]
				}
			},
			dist      : {
				options: {
					base: '<%= yeoman.dist %>'
				}
			}
		},

		// Make sure code styles are up to par and there are no obvious mistakes
		jshint      : {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all    : [
				'Gruntfile.js',
				'<%= yeoman.app %>/scripts/{,*/}*.js'
			],
			test   : {
				options: {
					jshintrc: 'test/.jshintrc'
				},
				src    : ['test/spec/{,*/}*.js']
			}
		},

		// Empties folders to start fresh
		clean       : {
			dist     : {
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
			server   : '.tmp'
		},

		// Add vendor prefixed styles
		autoprefixer: {
			options: {
				browsers: ['last 1 version']
			},
			dist   : {
				src : '<%= yeoman.app %>/styles/main.css',
				dest: '.tmp/styles/main.css'
			}
		},

		// Automatically inject Bower components into the app
		wiredep     : {
			target: {
				dependencies   : true,
				devDependencies: false,
				src            : ['<%= yeoman.app %>/index.html'],
				ignorePath     : '<%= yeoman.app %>',
				exclude        : ['bootstrap.js'],
				fileTypes      : {
					html: {
						replace: {
							js : '<script src="/{{filePath}}"></script>',
							css: '<link rel="stylesheet" href="/{{filePath}}" />'
						}
					}
				}
			}
		},

		// Renames files for browser caching purposes
		rev         : {
			dist: {
				files: {
					src: [
						'<%= yeoman.dist %>/scripts/{,*/}*.js',
						'<%= yeoman.dist %>/styles/{,*/}*.css',
						'!<%= yeoman.dist %>/styles/overrides.css',
						//'<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
						'!<%= yeoman.dist %>/images/marketing-assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
						'!<%= yeoman.dist %>/images/homepage/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
						'!<%= yeoman.dist %>/images/theme/tcp-no-image.{png,jpg,jpeg,gif,webp,svg}'//,
						//'<%= yeoman.dist %>/fonts/*'
					]
				}
			}
		},

		// The following *-min tasks produce minified files in the dist folder
		cssmin      : {
			options: {},

		},

		imagemin: {
			dist: {
				files: [
					{
						expand: true,
						cwd   : '<%= yeoman.app %>/images',
						src   : '{,*/}*.{png,jpg,jpeg,gif}',
						dest  : '<%= yeoman.dist %>/images'
					}
				]
			}
		},

		svgmin: {
			dist: {
				files: [
					{
						expand: true,
						cwd   : '<%= yeoman.app %>/images',
						src   : '{,*/}*.svg',
						dest  : '<%= yeoman.dist %>/images'
					}
				]
			}
		},

		htmlmin: {
			options: {
				collapseWhitespace       : true,
				collapseBooleanAttributes: true,
				removeCommentsFromCDATA  : true
//				removeOptionalTags: true // This option breaks livereload when used.
			},
			server : {
				files: [
					{
						expand: true,
						cwd   : '<%= yeoman.app %>',
						src   : ['*.html', 'views/{,*/}*.html'],
						dest  : '.tmp'
					}
				]
			},
			dist   : {
				files: [
					{
						expand: true,
						cwd   : '<%= yeoman.dist %>',
						src   : ['*.html', 'views/{,*/}*.html'],
						dest  : '<%= yeoman.dist %>'
					}
				]
			}
		},

		html2js: {
			options  : {
				singleModule: true,
				module      : 'Volusion.templates',
				rename      : function (moduleName) {
					return moduleName.replace('../app/', '');
				},
				htmlmin     : {
					collapseBooleanAttributes    : true,
					collapseWhitespace           : true,
					removeAttributeQuotes        : true,
					removeComments               : true,
					removeEmptyAttributes        : true,
					removeRedundantAttributes    : true,
					removeScriptTypeAttributes   : true,
					removeStyleLinkTypeAttributes: true
				}
			},
			templates: {
				src : ['<%= yeoman.app %>/views/{,*/}*.html'],
				dest: '.tmp/templates.js'
			}
		},

		concat    : {
			js       : {
				dest: '.tmp/concat/scripts/scripts.js',
				src : '<%= yeoman.app %>/scripts/{,*/}/*.js'
			},
			templates: {
				dest: '.tmp/concat/scripts/scripts.js',
				src : [
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
						cwd   : '.tmp/concat/scripts',
						src   : '*.js',
						dest  : '.tmp/concat/scripts'
					}
				]
			}
		},

		// Copies remaining files to places other tasks can use
		copy      : {
			build: {
				files: [
					{
						expand: true,
						dot   : true,
						cwd   : '<%= yeoman.app %>',
						dest  : '<%= yeoman.dist %>/scripts',
						src   : [
							'<%= yeoman.app %>/.tmp/concat/scripts/scripts.js',
						]
					},
					{
						expand: true,
						cwd   : '<%= yeoman.app %>',
						dest  : '<%= yeoman.dist %>/index.html',
						src   : [
							'<%= yeoman.app %>/app/index.html'
						]
					}
				]
			},
			dist : {
				files: [
					{
						expand: true,
						dot   : true,
						cwd   : '<%= yeoman.app %>',
						dest  : '<%= yeoman.dist %>',
						src   : [
							'*.{ico,png,txt}',
							'web.config',
							'.htaccess',
							'*.html',
							//'views/{,*/}*.html',			//not right, we just need top-level html, everything else is in js
							//'images/{,*/}*.{webp}',		//not specific enough, wasn't finding all images
							'images/**/*.*',
							'fonts/**/*.*',							//needed to make sure we grab all fonts
							'translations/{,*/}*.json',
							'settings/{,*/}*',
							'styles/overrides.css',
							'styles/main.css',
							'bower_components/angular-i18n/angular-locale_*.js'
						]
					},
					{
						expand: true,
						cwd   : '.tmp',
						dest  : '<%= yeoman.dist %>',
						src   : ['styles/main.css', 'images/generated/{,*/}*.*']
					}
				]
			}
		},

		// Test settings
		karma     : {
			jasmine: {
				configFile: 'test/karma.conf.jasmine.js',
				singleRun : true
			},
			mocha  : {
				configFile: 'test/karma.conf.mocha.js',
				singleRun : true
			}
		},

		sass         : {
			dist: {
				options: {
					style: 'expanded' //We will change this to compressed later, just for testing
				},
				files  : {
					//all the sass needs to be in one css file
					'app/styles/main.css': 'app/styles/main.scss'
				}
			}

		},
		sprite       : {
			icons : {
				src      : 'app/images/sprites/icons/*.png',
				dest     : 'app/images/generated/sprites/icons.png',
				destCss  : 'app/styles/base/icons.scss',			//Use CSS format with scss filtype,
				cssFormat: 'css',													//otherwise outputs only compass SASS
				cssVarMap: function (sprite) {
					sprite.name = 'th-product__' + sprite.name;
				}
			},
			social: {
				src      : 'app/images/sprites/social/*.png',
				dest     : 'app/images/generated/sprites/social.png',
				destCss  : 'app/styles/base/social.scss',
				cssFormat: 'css',
				cssVarMap: function (sprite) {
					sprite.name = 'th-social__icon--' + sprite.name;
				}
			},
			cards : {}
		},

		// Watches files for changes and runs tasks based on the changed files
		watch        : {
			karma: {
				files: ['<%= yeoman.app %>/settings/app.js',
					'<%= yeoman.app %>/scripts/{,*/}*.js',
					'bower_components/vn-toolbox-common/dist/vn-toolbox-common.js'],
				tasks: ['clean:server',
					'newer:jshint:all',
					'karma']
			},
			dev  : {
				files: ['<%= yeoman.app %>/settings/app.js',
					'<%= yeoman.app %>/scripts/{,*/}*.js',
					'bower_components/vn-toolbox-common/dist/vn-toolbox-common.js',
					'<%= yeoman.app %>/*.html',
					'<%= yeoman.app %>/views/**/*.html',
					'<%= yeoman.app %>/styles/**/*.{scss,sass}',
					'bower_components/vn-toolbox-common/dist/vn-toolbox-common-styles.css'],
				tasks: ['sass',							//do SASS compilation which generates main.css,
					//rest of files are being served from app folder
				],
				options:{
					livereload: true
				}
			}
		},

		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them
		useminPrepare: {
			html   : '<%= yeoman.app %>/index.html',
			options: {
				root: '<%= yeoman.app %>',
				dest: '<%= yeoman.dist %>',
			}
		},

		// Performs rewrites based on rev and the useminPrepare configuration
		usemin       : {
			html   : ['<%= yeoman.dist %>/index.html'],
			css    : ['<%= yeoman.dist %>/styles/{,*/}*.css'],
			options: {},
			js     : [
				'<%= yeoman.dist %>/scripts/*.js',
				'<%= yeoman.dist %>/settings/app.js'
			]
		},

	});

	grunt.registerTask('build', ['build:dev']);
	grunt.registerTask('serve', ['build:dev']);

	grunt.registerTask('build:dev', function (protocol, server, name, version) {
		//if there is no target, we'll set the target to samplestore

		if (typeof server === 'undefined') {
			server = (protocol || 'http') + '://' + 'www.samplestore.io';
		} else {
			server = (protocol || 'http') + '://' + server;
		}

		if (typeof name === 'undefined') {
			name = 'samplestore';
		}

		if (typeof version === 'undefined') {
			version = '/api/v1';
		}

		grunt.log.writeln('API URL set for the environment "' + name + '" - ' + server + version);

		grunt.config.set('ENVConstant', {
			name       : name,
			host       : server,
			apiEndpoint: version
		});

		grunt.task.run([
			'clean:dist',				//erase our dist folder
			//no need to clean dist folder; we're serving /app, lets do it anyway
			'clean:configure',	//erase generated config file
			'get_toolbox_dependencies',
			'ngconstant:build',	//build generated config file
			'wiredep',					//include the dependencies
			'sprite:icons',			//Create the icon scss file
			'sprite:social',		//create the social scss file
			'sass',							//do SASS compilation
			'connect:livereload',	//open server
			'watch:dev'							//watch for files
		]);


	});

	grunt.registerTask('build:dist', function (protocol, server, name, version) {
		//there MUST be a target! Can't build for distribution without a target api

		if (typeof server !== 'undefined' && server.trim() !== '') {
			grunt.fail.warn('WARNING: You are using different server for the API cconfiguration. ' +
			'You need to have CORS enabled on the API endpoint for the theme to work.');

			server = (protocol || 'http') + '://' + server;

		} else {
			server = '';
		}

		if (typeof name === 'undefined') {
			name = 'samplestore';
		}
		if (typeof version === 'undefined') {
			version = '/api/v1';
		}

		grunt.config.set('ENVConstant', {
			name       : name,
			host       : server,
			apiEndpoint: version
		});

		//needs to pass karma and JSHint in order to build properly
		//should uglify

		grunt.task.run([
			'clean:dist',				//erase our dist folder
			'clean:configure',	//erase generated config file
			'get_toolbox_dependencies',

			'ngconstant:build',	//build generated config file
			'wiredep',					//include the dependencies
			'karma',						//run tests, must pass
			'jshint:all',				//run jshint, must pass


			'useminPrepare',	  //Prep for creating the html file with the minified files

			'sprite:icons',			//Create the icon scss file
			'sprite:social',		//create the social scss file
			'sass',							//do SASS compilation
			'autoprefixer',			//add browser prefixes to css file (inplace edit .tmp/style/main.css)

			'html2js',						//transforms html to templates.js
			'concat:generated',		//concats vendor JS files to vendor.js and scripts to scripts.js
			'concat:templates',		//concats templates.js *after* scripts.js
			'uglify',							//remove spaces, linebreaks, replace variables
			'cssmin',							//minifies CSS
			'copy:dist',					//copy the required files to the dist folder, so they can be overwritten
			'rev',								//cachebusting
			'usemin',							//last step! here's where we actually make changes to the index.html file
			//which is why this step needs to be last, so we don't lose our original
		]);


	});

	grunt.registerTask('test',
		['clean:server',					//may not be needed?
			'newer:jshint:all',
			'karma',
			'watch:karma']);				//only reload on js file change

	grunt.registerTask('build:travis', ['build:dist']);		//run a test build without watching

	grunt.registerTask('test:travis',		//don't live watch the files on travis build
		['clean:server',					//may not be needed?
			'newer:jshint:all',
			'karma']);

	grunt.registerTask('get_toolbox_dependencies', 'Add VN Toolbox Dependencies to bower.json', function () {
		var fs = require('fs');
		var _ = require('lodash');
		var vnBower = JSON.parse(fs.readFileSync('bower_components/vn-toolbox-common/bower.json', 'utf8'));
		var origBower = JSON.parse(fs.readFileSync('bower.json', 'utf8'));
		_.extend(origBower.dependencies,  vnBower.dependencies);
		fs.writeFileSync('bower.json', JSON.stringify(origBower, undefined, 2), 'utf8');
	});

	grunt.registerTask('default', function () {
		grunt.log.errorlns('No Grunt commands selected! Your options are:');
		grunt.log.writeln('>grunt test [runs karma tests and jshint]');
		grunt.log.writeln('');
		grunt.log.writeln('>grunt serve [builds without minification or concatination for http://www.samplestore.io/api/v1]');
		grunt.log.writeln('>grunt build [builds without minification or concatination for http://www.samplestore.io/api/v1]');
		grunt.log.writeln('>grunt build:dev [builds without minification or concatination for http://www.samplestore.io/api/v1]');
		grunt.log.writeln('>grunt build:dev:http:yourserver.here [builds without minification or concatination for http://yourserver.here/api/v1]');
		grunt.log.writeln('>grunt build:dev:http:yourserver.here:yourserver:/api/vX [builds without minification or concatination for a server named yourserver, located at http://yourserver.here/api/vX]');
		grunt.log.writeln('');
		grunt.log.writeln('>grunt build:dist:http:yourserver.here [builds with minification and concatination for http://yourserver.here/api/v1]');
		grunt.log.writeln('>grunt build:dist:http:yourserver.here:yourserver:/api/vX [builds with minification and concatination for a server named yourserver, located at http://yourserver.here/api/vX]');

	});

};
