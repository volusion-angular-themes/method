/*global angular: true*/
'use strict';
var angular = require('angular');
var enquire = require('enquire');
require('./theme');

angular.module('volusionApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'seo',
    'pascalprecht.translate',
    require('./services/config').name,
    'ui.bootstrap',
    'snap'
  ])
  .provider('api', require('./services/api-provider'))
  .provider('translate', require('./services/translate-provider'));

angular.module('volusionApp')
  .config(function (
    snapRemoteProvider,
    $stateProvider,
    $urlRouterProvider,
    $locationProvider,
    $windowProvider,
    apiProvider,
    translateProvider,
    config) {

    snapRemoteProvider.globalOptions.touchToDrag = false;

    apiProvider.setBaseRoute(config.ENV.API_URL);
    apiProvider.endpoint('products').
      route('/products/:code');
    apiProvider.endpoint('reviews').
      route('/products/:code/reviews');
    apiProvider.endpoint('categories').
      route('/categories/:id');
    apiProvider.endpoint('config').
      route('/config');
    apiProvider.endpoint('relatedProducts').
      route('/products/:code/relatedProducts');
    apiProvider.endpoint('navs').
      route('/navs/:navId');
    apiProvider.endpoint('carts').
      route('/carts/current');


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

    $urlRouterProvider.otherwise(function() {
      $windowProvider.$get().location.replace('/404.html');
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
  .run(function ($templateCache, snapRemote, $rootScope) {

    $rootScope.isInDesktopMode = true;

    enquire.register('screen and (max-width: 991px)', {
      unmatch: function () {
        snapRemote.close();
        $rootScope.isInDesktopMode = true;
      },
      match: function () {
        $rootScope.isInDesktopMode = false;
      }
    });

    $rootScope.$on('$stateChangeSuccess', function() {
      snapRemote.close();
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
  })
  .factory('storage', require('./services/storage'))
  .directive('legacyLink', require('./directives/legacy-link'))
  .directive('easyZoom', require('./directives/easy-zoom'))
  .filter('seoFriendly', require('./filters/seoFriendly'))
  .controller('IndexCtrl', require('./controllers/index'))
  .controller('HomeCtrl', require('./controllers/home'))
  .controller('StyleGuideCtrl', require('./controllers/style-guide'))
  .controller('AboutCtrl', require('./controllers/about'))
  .controller('ContactCtrl', require('./controllers/contact'))
  .controller('CategoryCtrl', require('./controllers/category'))
  .controller('ProductCtrl', require('./controllers/product'));
