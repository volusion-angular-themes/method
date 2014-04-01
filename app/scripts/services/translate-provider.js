'use strict';

var Translate = require('./translate');

function TranslateProvider($translateProvider) {
  this.$translateProvider = $translateProvider;
  this.setPreferredLanguage = $translateProvider.preferredLanguage;
}

TranslateProvider.$inject = ['$translateProvider'];

TranslateProvider.prototype.$get = [
  '$translate', '$translatePartialLoader', 'storage',
  function($translate, $translatePartialLoader, storage) {
    var options = this.options;
    return new Translate($translate, $translatePartialLoader, storage, {
      region: options.region,
      lang: options.lang,
      country: options.country
    });
  }
];

TranslateProvider.prototype.configure = function(options) {
  options = angular.extend({ region: 'us', lang: 'en', country: 'us' }, options);
  if (options.lang) {
    this.setPreferredLanguage(options.lang);
  }
  this.options = options;
  this.initTranslateProvider(options.lang);
};

TranslateProvider.prototype.initTranslateProvider = function(lang) {
  var $translateProvider = this.$translateProvider;
  $translateProvider.useLoader('$translatePartialLoader', {
    urlTemplate: '/translations/{part}/{lang}.json'
  });
  if (lang === 'en') {
    $translateProvider.useMessageFormatInterpolation();
  }
  $translateProvider.useMissingTranslationHandlerLog();
  $translateProvider.useLocalStorage();
};

module.exports = TranslateProvider;
