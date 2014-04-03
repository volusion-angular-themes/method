'use strict';

module.exports = [
  '$scope',
  'product',
  function($scope, product) {
    $scope.product = product.data;
  }
];
