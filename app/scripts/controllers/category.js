'use strict';

module.exports = [
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
    // http://txlpt374-vm.corp.volusion.com/api/v1/products?categoryId=1816&page=2&pageSize=3
    // TODO: Implement "Add to cart"
    api.products.get({ categoryId: $stateParams.categoryId, page: 1, pageSize: 15 }).then(function (response) {
      $scope.products = response.data;

    });
  }
];
