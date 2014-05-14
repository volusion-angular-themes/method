'use strict';

module.exports = [
  'api',
  'product',
  '$rootScope',
  '$scope',
  '$stateParams',
  '$sce',
  '$anchorScroll',
  '$location',
  function (
    api,
    product,
    $rootScope,
    $scope,
    $stateParams,
    $sce,
    $anchorScroll,
    $location
    ) {

    $scope.$on('$stateChangeSuccess', function () {
      $location.hash('top');
      $anchorScroll();
      $location.hash('');
    });

    var productData = $scope.product = product.data;
    $scope.product.quantity = 1;

    angular.extend($scope.seo, product.data.seo);
    $scope.sceDescriptions = angular.copy(productData.descriptions);

    angular.forEach(['detail', 'features', 'techSpecs', 'extendedInfo'], function(key) {
      $scope.sceDescriptions[key] = $sce.trustAsHtml($scope.sceDescriptions[key]);
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
      $scope.ratingsAndReviews = response;
    });

    // Alt image swaps with main image
    $scope.showAltImage = function (data) {
      var altImage = data.image;

      productData.mainImage = altImage;
    };

    $scope.decrementQty = function () {
      $scope.product.quantity--;
    };

    $scope.incrementQty = function () {
      $scope.product.quantity++;
    };

    // Add to Cart
    $scope.isCartButtonDisabled = false;
    $scope.addToCart = function () {
      var currentProduct = $scope.product;
      $scope.isCartButtonDisabled = true;

      var pricing = currentProduct.price;

      var cart = {
        id: currentProduct.id,
        code: currentProduct.code,
        name: currentProduct.name,
        qty: currentProduct.quantity,
        options: currentProduct.options,
        pricing: pricing
      };

      $rootScope.$emit('ADD_TO_CART', cart);
    };

    $rootScope.$on('ITEM_ADDED_TO_CART', function () {
      $scope.isCartButtonDisabled = false;
      console.log('Item added to cart');
    });

    var fullUrl = $location.absUrl();
    var pageTitle = $scope.seo.metaTagTitle;

    // Sharing
    $scope.product.sharing = {
      facebook: 'http://www.facebook.com/sharer.php?u=' + fullUrl + '/',
      twitter: 'http://twitter.com/share?url=' + fullUrl + '&amp;text=' + pageTitle,
      tumblr: 'http://www.tumblr.com/share/link?url=' + fullUrl + '&amp;name=' + pageTitle,
      googlePlus: 'https://plus.google.com/share?url=' + fullUrl
    };
  }
];
