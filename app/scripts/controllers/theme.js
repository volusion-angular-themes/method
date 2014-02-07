'use strict';

angular.module('volusionApp')
  .controller('ThemeCtrl', function($scope, $translatePartialLoader) {
    $translatePartialLoader.addPart('theme');
    $scope.htmlReady();
  });
