/*global angular: true*/
'use strict';
var angular = require('angular');
var enquire = require('enquire');
require('./theme');

angular.module('volusion.directives', []);
angular.module('volusion.filters', ['volusion.services']);
angular.module('volusion.services', ['ngCookies', 'ngResource', 'pascalprecht.translate', 'services.config']);
angular.module('volusion.decorators', ['pascalprecht.translate', 'services.config']);
angular.module('volusion.controllers', ['ui.router', 'volusion.services']);

angular.module('volusionApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'seo',
    'services.config',
    require('../bower_components/vn-bem').name,
    'ui.bootstrap',
    'snap',
    require('../bower_components/vn-meta-tags').name,
    'angulartics',
    // volusion modules
    'volusion.controllers',
    'volusion.decorators',
    'volusion.directives',
    'volusion.filters',
    'volusion.services',
    'volusion.google.tagmanager'
  ]);

angular.module('volusionApp')
  .config(function (
    snapRemoteProvider,
    $stateProvider,
    $urlRouterProvider,
    $locationProvider,
    $windowProvider,
    translateProvider,
    config) {

    snapRemoteProvider.globalOptions.touchToDrag = false;

    var env = config.ENV;

    $locationProvider.html5Mode(true);

    var translateOptions = {
      urlPrefix: env.URL_PREFIX || '',
      region: env.REGION,
      lang: env.LANG,
      country: env.COUNTRY,
      disableTranslations: env.DISABLE_TRANSLATIONS
    };

    translateProvider.configure(translateOptions);

    $urlRouterProvider.when('/', ['$state', function($state) {
      $state.go('i18n.home', translateOptions, { location: 'replace' });
    }]);

    $urlRouterProvider.otherwise(function() {
      $windowProvider.$get().location.replace('/404.html');
    });

    $stateProvider
      .state('i18n', {
        url: translateOptions.urlPrefix,
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
      })
      .state('i18n.about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        resolve: {
          translations: ['translate', function(translate) {
            return translate.addParts('about');
          }]
        }
      })
      .state('i18n.contact', {
        url: '/contact',
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl',
        resolve: {
          translations: ['translate', function(translate) {
            return translate.addParts('contact');
          }]
        }
      })
      .state('i18n.category', {
        url: '/:categoryName/c/:categoryId',
        templateUrl: 'views/category.html',
        controller: 'CategoryCtrl',
        resolve: {
          translations: ['translate', function(translate) {
            return translate.addParts('category');
          }],
          category: ['api', '$stateParams', function(api, $stateParams) {
            return api.categories.get({ id: $stateParams.categoryId });
          }]
        }
      })
      .state('i18n.product', {
        url: '/:productTitle/p/:productCode',
        templateUrl: 'views/product.html',
        controller: 'ProductCtrl',
        resolve: {
          translations: ['translate', function(translate) {
            return translate.addParts('product');
          }],
          product: ['api', '$stateParams', function(api, $stateParams) {
            return api.products.get({code: $stateParams.productCode});
          }]
        }
      });
  })
  .run(function ($templateCache, snapRemote, $rootScope, cacheBustFilter, $window) {

    $rootScope.isInDesktopMode = true;

    enquire.register('screen and (max-width: 991px)', {
      // transitioning to desktop mode
      unmatch: function () {
        snapRemote.close();
        $rootScope.isInDesktopMode = true;
      },
      // transitioning to mobile mode
      match: function () {
        $rootScope.isInDesktopMode = false;
      }
    });

    $rootScope.$on('$stateChangeSuccess', function() {
      snapRemote.close();
    });

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
      event.preventDefault();
      if (error.status === 404) {
        $window.location.replace('/404.html');
      }
    });

    $templateCache.put('views/i18n.html', require('./views/i18n.html'));
    $templateCache.put('views/home.html', require('./views/home.html'));
    $templateCache.put('views/style-guide.html', require('./views/style-guide.html'));
    $templateCache.put('views/about.html', require('./views/about.html'));
    $templateCache.put('views/contact.html', require('./views/contact.html'));
    $templateCache.put('views/category.html', require('./views/category.html'));
    $templateCache.put('views/product.html', require('./views/product.html'));
    $templateCache.put('views/partials/product-tile.html', require('./views/partials/product-tile.html'));
    $templateCache.put('views/partials/footer.html', require('./views/partials/footer.html'));
    $templateCache.put('views/partials/header.html', require('./views/partials/header.html'));
    $templateCache.put('views/partials/mobile-menu.html', require('./views/partials/mobile-menu.html'));
    $templateCache.put('views/partials/social-sharing.html', require('./views/partials/social-sharing.html'));
    $rootScope.overridesCSS = cacheBustFilter('/styles/overrides.css');
  });
