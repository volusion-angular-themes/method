'use strict';

module.exports = [
  '$scope',
  '$translatePartialLoader',

  function($scope, $translatePartialLoader) {
    $translatePartialLoader.addPart('theme');
    $scope.htmlReady();
  }
];
