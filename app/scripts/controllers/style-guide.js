'use strict';

module.exports = [
  '$scope',
  '$translatePartialLoader',

  function($scope, $translatePartialLoader) {
    $translatePartialLoader.addPart('style-guide');
    $scope.htmlReady();
  }
];
