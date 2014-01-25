'use strict';

angular.module('volusionApp')
  .controller('HomeCtrl', function($scope, $translatePartialLoader) {
    $translatePartialLoader.addPart('home');

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.htmlReady();
  });
