'use strict';

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
    'ngRoute',
    'seo',
    'pascalprecht.translate'
  ])
  .config([
    '$routeProvider', '$locationProvider', '$translateProvider', '$translatePartialLoaderProvider',
    function($routeProvider, $locationProvider, $translateProvider, $translatePartialLoaderProvider) {

      $locationProvider.html5Mode(true);

      $routeProvider
        .when('/', {
          redirectTo: getI18NPath
        })
        .when('/:region/:language-:country', {
          templateUrl: '../views/home.html',
          controller: 'HomeCtrl'
        })
        .otherwise({
          redirectTo: '/'
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
    }
  ])
  .run([
    '$rootScope', '$translate',
    function($rootScope, $translate) {
      $rootScope.$on('$translatePartialLoaderStructureChanged', function() {
        $translate.refresh();
      });
    }
  ]);
