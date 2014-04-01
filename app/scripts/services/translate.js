'use strict';

var storageKey = 'VN_TRANSLATE';

// ReSharper disable once InconsistentNaming
function Translate($translate, $translatePartialLoader, storage, options) {
  this.$translate = $translate;
  this.$translatePartialLoader = $translatePartialLoader;
  this.storage = storage;
  this.configure(angular.extend(options, this.getConfig()));
  this.addPart = $translatePartialLoader.addPart;
}

Translate.prototype.getConfig = function() {
  var storage = this.storage;
  var config = JSON.parse(storage.get(storageKey)) || {};
  var lang = storage.get('NG_TRANSLATE_LANG_KEY');
  if (lang) {
    config.lang = lang;
  }
  return config;
};

Translate.prototype.configure = function(config) {
  config = angular.extend(this.getConfig(), config);
  this.storage.set(storageKey, JSON.stringify(config));
  this.$translate.use(config.lang);
};

Translate.prototype.addParts = function() {
  var loader = this.$translatePartialLoader;
  angular.forEach(arguments, angular.bind(this, function(part) {
    loader.addPart(part);
  }));
  return this.$translate.refresh();
};

module.exports = Translate;
