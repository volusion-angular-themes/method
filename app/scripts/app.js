/*global angular: true*/
'use strict';
var angular = require('angular');
require('./theme');

function getI18NPath() {
  if (localStorage && localStorage.getItem) {
    var i18n = JSON.parse(localStorage.getItem('VOLUSION_I18N')) || {};
    i18n.region = i18n.region || 'us';
    i18n.lang = localStorage.getItem('NG_TRANSLATE_LANG_KEY') || i18n.lang || 'en';
    i18n.country = i18n.country || 'us';
    localStorage.setItem('VOLUSION_I18N', JSON.stringify(i18n));
    return i18n.region + '/' + i18n.lang + '-' + i18n.country;
  }
  return '/us/en-us';
}

angular.module('volusionApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'seo',
    'pascalprecht.translate',
    'ui.bootstrap.carousel',
    'ui.bootstrap.dropdownToggle',
    'ui.bootstrap.transition',
    'ui.bootstrap.accordion',
    'ui.bootstrap.collapse'
  ])
  .config(function(
    $stateProvider,
    $urlRouterProvider,
    $locationProvider,
    $translateProvider,
    $translatePartialLoaderProvider) {

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise(getI18NPath);

    var i18NPrefix = '/:region/:language-:country';
    $stateProvider
      .state('home', {
        url: i18NPrefix,
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .state('style-guide', {
        url: i18NPrefix + '/style-guide',
        templateUrl: 'views/style-guide.html',
        controller: 'StyleGuideCtrl'
      })
      .state('category', {
        url: i18NPrefix + '/:categoryName/c/:categoryId',
        templateUrl: 'views/category.html',
        controller: 'CategoryCtrl'
      })
      .state('product', {
        url: i18NPrefix + '/:productTitle/p/:productCode',
        templateUrl: 'views/product.html',
        controller: 'ProductCtrl'
      });

    // i18n
    $translatePartialLoaderProvider.addPart('index');
    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: '/translations/{part}/{lang}.json'
    });
    $translateProvider.useMessageFormatInterpolation();
    $translateProvider.useMissingTranslationHandlerLog();
    $translateProvider.preferredLanguage('en');
    $translateProvider.useLocalStorage();
  })
  .run(function($rootScope, $translate, $templateCache) {
    $rootScope.$on('$translatePartialLoaderStructureChanged', function() {
      $translate.refresh();
    });
    $templateCache.put('views/home.html', require('./views/home.html'));
    $templateCache.put('views/style-guide.html', require('./views/style-guide.html'));
    $templateCache.put('views/category.html', require('./views/category.html'));
    $templateCache.put('views/product.html', require('./views/product.html'));
  })
  .controller('HomeCtrl', require('./controllers/home'))
  .controller('StyleGuideCtrl', require('./controllers/style-guide'))
  .controller('CategoryCtrl', require('./controllers/category'))
  .controller('ProductCtrl', require('./controllers/product'))
  .controller('IndexCtrl', require('./controllers/index'));
