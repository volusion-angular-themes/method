'use strict';

module.exports = [
  '$scope',
  '$translatePartialLoader',
  '$http',
  function($scope, $translatePartialLoader, $http) {
    $translatePartialLoader.addPart('product');

    // when landing on the page, get the product
    $http.get('http://volusion.apiary.io/products/1')
      .success(function (data) {
        $scope.product = data;

        // TODO: REMOVE
        console.log(data);
      })
      .error(function (data) {
        console.log('Error: ' + data);
      });

    $scope.language = {
      'writeReview': 'Write A Review',
      'addToFavorites': 'Add to Favorites',
      'price': 'Now',
      'msrp': 'Reg',
      'addToCart': 'Add to Bag',
      'description': 'Description',
      'relatedProducts': 'Similar Items',
      'reviews': 'Customer Reviews',
      'readAllReviews': 'Read All Reviews'
    };

    $scope.htmlReady();
  }
];
