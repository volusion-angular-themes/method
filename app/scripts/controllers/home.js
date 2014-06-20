'use strict';

angular.module('volusion.controllers').controller('HomeCtrl', [
  '$scope',
  '$rootScope',
  'api',
  function (
    $scope,
    $rootScope,
    api) {
    // Featured Products
    api.products.get({ filter: 'featured', pageSize: 4 }).then(function (response) {
      $scope.featuredProducts = response.data;
    });
  }
]);
