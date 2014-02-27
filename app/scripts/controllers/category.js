'use strict';

module.exports = [
  '$scope',
  '$translatePartialLoader',

  function($scope, $translatePartialLoader) {
    $translatePartialLoader.addPart('category');
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.htmlReady();
  }
];
