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

    apiProvider.setBaseRoute(config.ENV.API_URL);
    apiProvider.endpoint('products').
      route('/products/:code');
    apiProvider.endpoint('categories').
      route('/categories/:id');
    apiProvider.endpoint('config').
      route('/config');
    apiProvider.endpoint('cart').
      route('/cart');


    $locationProvider.html5Mode(true);

    var translateOptions = {
      urlPrefix: '/:region/:lang-:country',
      region: 'us',
      lang: 'en',
      country: 'us'
    };
    translateProvider.configure(translateOptions);

    $urlRouterProvider.when('/', ['$state', function($state) {
      $state.go('i18n.home', translateOptions);
    }]);
    $urlRouterProvider.otherwise('/404.html');

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
      .state('i18n.category', {
        url: '/:categoryName/c/:categoryId',
        templateUrl: 'views/category.html',
        controller: 'CategoryCtrl',
        resolve: {
          translations: ['translate', function(translate) {
            return translate.addParts('category');
          }],
          category: ['api', '$stateParams', function (api, $stateParams) {
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
  .run(function($templateCache) {
    $templateCache.put('views/i18n.html', require('./views/i18n.html'));
    $templateCache.put('views/home.html', require('./views/home.html'));
    $templateCache.put('views/style-guide.html', require('./views/style-guide.html'));
    $templateCache.put('views/category.html', require('./views/category.html'));
    $templateCache.put('views/product.html', require('./views/product.html'));
  })
  .factory('storage', require('./services/storage'))
  .controller('HomeCtrl', require('./controllers/home'))
  .controller('StyleGuideCtrl', require('./controllers/style-guide'))
  .controller('CategoryCtrl', require('./controllers/category'))
  .controller('ProductCtrl', require('./controllers/product'))
  .controller('IndexCtrl', require('./controllers/index'));
