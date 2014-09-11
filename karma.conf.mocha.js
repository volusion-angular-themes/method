'use strict';

// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
	config.set({
		// base path, that will be used to resolve files and exclude
		basePath: '',

		// testing framework to use (jasmine/mocha/qunit/...)
		frameworks: ['mocha', 'chai-jquery', 'sinon-chai', 'jquery-2.1.0'],

		// list of files / patterns to load in the browser
		files: [
			'app/bower_components/jquery/dist/jquery.js',
			'app/bower_components/angular/angular.js',
			'app/bower_components/angular-mocks/angular-mocks.js',
			'app/bower_components/angular-resource/angular-resource.js',
			'app/bower_components/angular-cookies/angular-cookies.js',
			'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angular-sanitize/angular-sanitize.js',
			'app/bower_components/angular-animate/angular-animate.js',
			'app/bower_components/angular-touch/angular-touch.js',
			'app/bower_components/angular-translate/angular-translate.js',
			'app/bower_components/angular-translate-loader-partial/angular-translate-loader-partial.js',
			'app/bower_components/messageformat/messageformat.js',
			'app/bower_components/angular-translate-interpolation-messageformat/angular-translate-interpolation-messageformat.js',
			'app/bower_components/angular-translate-loader-partial/angular-translate-loader-partial.js',
			'app/bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
			'app/bower_components/angular-translate-storage-local/angular-translate-storage-local.js',
			'app/bower_components/angular-snap/angular-snap.js',
			'app/bower_components/angular-seo/angular-seo.js',
			'app/bower_components/angulartics/dist/angulartics.min.js',
			'app/bower_components/enquire/dist/enquire.js',
			'app/bower_components/textAngular/dist/textAngular.min.js',
			'app/bower_components/angular-ui-bootstrap-bower/ui-bootstrap.js',
			'app/bower_components/vn-toolbox-common/dist/vn-toolbox-common.js',
			'app/scripts/**/*.js',
			'test/mock/**/*.js',
			'test/spec/**/*.mocha.js',

			// templates
			'app/views/**/*.html'
		],

		// list of files / patterns to exclude
		exclude: [],

		preprocessors: {
			'app/views/partials/**/*.html': ['ng-html2js']
		},

		ngHtml2JsPreprocessor: {
			// strip this from the file path
			stripPrefix: 'app/',
			// prepend this to the
			prependPrefix: '',

			// or define a custom transform function
			//cacheIdFromPath: function(filepath) {
			//	//return cacheId;
			//},

			// setting this option will create only a single module that contains templates
			// from all the files, so you can load them all with module('foo')
			moduleName: 'Volusion.templates'
		},

		// web server port
		port: 8080,

		// level of logging
		// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,


		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browsers: ['PhantomJS'],


		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun: false
	});
};
