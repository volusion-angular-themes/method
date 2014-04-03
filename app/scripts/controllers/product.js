'use strict';

module.exports = [
  '$scope',
  'product',
  'api',
  '$stateParams',
  function ($scope, product, api, $stateParams) {
    $scope.product = product.data;

    api.relatedproducts.query({ productCode: 123, filter: 'relatedProducts', pageNumber: 1, pageSize: 10 }).then(function(data) {
      $scope.relatedProducts = data;
    });

    api.reviews.get({ code: $stateParams.productCode }).then(function (data) {
      $scope.ratingsAndReviews = data;
    });
  }
];
