// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['mocha', 'chai-jquery', 'sinon-chai'],

    // list of files / patterns to load in the browser
    files: [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-resource/angular-resource.js',
      'app/bower_components/angular-cookies/angular-cookies.js',
      'app/bower_components/angular-sanitize/angular-sanitize.js',
      'app/bower_components/angular-ui-router/release/angular-ui-router.js',
      'app/bower_components/angular-seo/angular-seo.js',
      'app/bower_components/angular-translate/angular-translate.js',
      'app/bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
      'app/bower_components/angular-translate-storage-local/angular-translate-storage-local.js',
      'app/bower_components/messageformat/messageformat.js',
      'app/bower_components/angular-translate-interpolation-messageformat/angular-translate-interpolation-messageformat.js',
      'app/bower_components/angular-translate-handler-log/angular-translate-handler-log.js',
      'app/bower_components/angular-translate-loader-partial/angular-translate-loader-partial.js',
      'app/bower_components/messageformat/locale/en.js',
      'app/bower_components/angular-i18n/angular-locale_en-us.js',
      '.tmp/scripts/scripts.js',
      'test/mock/**/*.js',
      'app/bower_components/jquery/dist/jquery.js',
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [],

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
