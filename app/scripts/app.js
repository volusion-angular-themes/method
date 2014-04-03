/*global angular: true*/
'use strict';
var angular = require('angular');

angular.module('volusionApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'seo',
    'pascalprecht.translate',
    require('./services/config').name
  ])
  .provider('api', require('./services/api-provider'))
  .provider('translate', require('./services/translate-provider'));

angular.module('volusionApp')
  .config(function(
    $stateProvider,
    $urlRouterProvider,
    $locationProvider,
    apiProvider,
    translateProvider,
    config) {

    apiProvider.setBaseRoute(config.API_URL);

    $locationProvider.html5Mode(true);

    var translateOptions = {
      urlPrefix: '/:region/:lang-:country',
      region: 'us',
      lang: 'en',
      country: 'us'
    };
    translateProvider.configure(translateOptions);

    $urlRouterProvider.when('/', ['$state', function($state) {
      $state.go('i18n.home', translateOptions, { location: 'replace' });
    }]);

    $urlRouterProvider.otherwise(function($injector) {
      var $window = $injector.get('$window');
      $window.location.replace('/404.html');
    });

    $stateProvider
      .state('i18n', {
        url: '/:region/:lang-:country',
        templateUrl: 'views/i18n.html',
        resolve: {
          translations: ['translate', function(translate) {
            return translate.addParts('index');
          }]
        }
      })
      .state('i18n.home', {
        url: '/',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        resolve: {
          translations: ['translate', function(translate) {
            return translate.addParts('home');
          }]
        }
      })
      .state('i18n.style-guide', {
        url: '/style-guide',
        templateUrl: 'views/style-guide.html',
        controller: 'StyleGuideCtrl',
        resolve: {
          translations: ['translate', function(translate) {
            return translate.addParts('style-guide');
          }]
        }
      });
  })
  .run(function($templateCache) {
    $templateCache.put('views/i18n.html', require('./views/i18n.html'));
    $templateCache.put('views/home.html', require('./views/home.html'));
    $templateCache.put('views/style-guide.html', require('./views/style-guide.html'));
  })
  .factory('storage', require('./services/storage'))
  .controller('IndexCtrl', require('./controllers/index'))
  .controller('HomeCtrl', require('./controllers/home'))
  .controller('StyleGuideCtrl', require('./controllers/style-guide'));
