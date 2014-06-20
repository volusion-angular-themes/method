'use strict';

angular.module('volusion.controllers').controller('CategoryCtrl', [
  '$scope',
  'category',
  '$stateParams',
  'api',
  function (
    $scope,
    category,
    $stateParams,
    api) {
    $scope.category = category.data;
    angular.extend($scope.seo, category.data.seo);

    api.products.get({ categoryIds: $stateParams.categoryId, page: 1, pageSize: 15 }).then(function (response) {
      $scope.products = response.data;
      $scope.categories = response.categories;
      $scope.facets = response.facets;
      $scope.cursor = response.cursor;
    });
  }
]);
