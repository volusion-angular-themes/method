'use strict';

module.exports = [
  '$q',
  '$timeout',
  '$translate',
  '$translatePartialLoader',
  function(
    $q,
    $timeout,
    $translate,
    $translatePartialLoader) {
    return function() {
      angular.forEach(arguments, function(translationKey) {
        $translatePartialLoader.addPart(translationKey);
      });
      var d = $q.defer();
      // TODO: Follow issue on GitHub with returning a promise from addPart
      // https://github.com/angular-translate/angular-translate/issues/197
      // and remove the $timeout below when issue is resolved.
      $timeout(function() {
        d.resolve();
      }, 200);
      return d.promise.then(function() {
        $translate.refresh();
      });
    };
  }
];
