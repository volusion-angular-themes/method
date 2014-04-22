'use strict';

module.exports = [
  'api',
  'product',
  '$rootScope',
  '$scope',
  '$stateParams',
  '$sce',
  function (
    api,
    product,
    $rootScope,
    $scope,
    $stateParams,
    $sce
    ) {

    var productData = $scope.product = product.data;

    var descriptions = productData.descriptions;
    angular.forEach(['detail', 'features', 'techSpecs', 'extendedInfo'], function(key) {
      descriptions[key] = $sce.trustAsHtml(descriptions[key]);
    });

    // Carousel
    $scope.interval = 4000;

    // Accordion panels
    $scope.isopen1 = true;

    // Related Products
    // TODO: Need to implement "Add to Cart" functionality
    api.relatedProducts.get({ code: $stateParams.productCode, pageNumber: 1, pageSize: 4 }).then(function (response) {
      $scope.relatedProducts = response.data;
    });

    // Reviews
    // TODO: Need to validate that reviews are the correct viewmodel
    api.reviews.get({ code: $stateParams.productCode }).then(function (response) {
      $scope.ratingsAndReviews = response.data;
    });

    // Alt image swaps with main image
    $scope.showAltImage = function (data) {
      var altImage = data.image;

      productData.mainImage = altImage;
    };

    // Add to Cart
    $scope.isCartButtonDisabled = false;
    $scope.addToCart = function () {

      $scope.isCartButtonDisabled = true;

      var pricing = productData.pricing;

      var cart = {
        sku: productData.code,
        name: productData.name,
        qty: productData.qty,
        options: productData.options,
        price: pricing.salePrice > 0 ? pricing.salePrice : pricing.regularPrice
      };

      $rootScope.$emit('ADD_TO_CART', cart);
    };

    $rootScope.$on('ITEM_ADDED_TO_CART', function () {
      $scope.isCartButtonDisabled = false;
      console.log('Item added to cart');
    });
  }
];
