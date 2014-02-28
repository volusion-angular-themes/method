'use strict';

module.exports = [
  '$scope',
  '$translatePartialLoader',

  function($scope, $translatePartialLoader) {
    $translatePartialLoader.addPart('home');
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.htmlReady();
  }
];
