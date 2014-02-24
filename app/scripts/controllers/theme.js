'use strict';

module.exports = function ThemeCtrl($scope, $translatePartialLoader) {
  $translatePartialLoader.addPart('theme');
  $scope.htmlReady();
};
