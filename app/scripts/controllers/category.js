'use strict';

module.exports = [
  '$scope',
  'category',
  function ($scope, category) {
    $scope.category = category;
  }
];
