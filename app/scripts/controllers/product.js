'use strict';

angular.module('volusion.controllers').controller('ProductCtrl', [
  'api',
  'productResponse',
  '$rootScope',
  '$scope',
  '$stateParams',
  '$sce',
  '$anchorScroll',
  '$location',
  '$compile',
  function (
    api,
    productResponse,
    $rootScope,
    $scope,
    $stateParams,
    $sce,
    $anchorScroll,
    $location,
    $compile
    ) {

    $scope.$on('$stateChangeSuccess', function () {
      $location.hash('top');
      $anchorScroll();
      $location.hash('');
    });

    var product = $scope.product = productResponse.data;
    var cartItem = $scope.cartItem = product.cartItem;

    angular.extend($scope.seo, product.seo);
    $scope.sceDescriptions = angular.copy(product.descriptions);

    $scope.product.quantity = 1;

    $scope.html = function(html) {
      var $p = angular.element('<p/>').html(html);
      $compile($p)($scope);
      return $sce.trustAsHtml($p.html());
    };

    function setDefaults() {
      product.optionSelection = { images: 'default' };
      product.image = product.images.default[0];
      cartItem.options = cartItem.options || {};
    }
    setDefaults();

    $scope.$watch('product.optionSelection', function(selection, oldSelection) {
      function setSKU(sku) {
        if (typeof sku !== 'undefined') {
          cartItem.sku = sku;
        } else {
          delete cartItem.sku;
        }
      }
      function setAvailabilityMessage(message, available) {
        if (message) {
          $scope.availabilityMessage = message.replace('{{available}}', available);
        } else {
          delete $scope.availabilityMessage;
        }
      }
      function setImage() {
        if (selection.images !== oldSelection.images) {
          product.image = product.images[selection.images][0];
        }
      }
      setSKU(selection.sku);
      setAvailabilityMessage(product.optionAvailabilityMessages[selection.state], selection.available);
      setImage();
    });

    // Carousel
    $scope.interval = 4000;

    // Accordion panels
    $scope.isopen1 = true;

    // Related Products
    api.relatedProducts.get({ code: $stateParams.productCode, pageNumber: 1, pageSize: 4 }).then(function (response) {
      $scope.relatedProducts = response.data;
    });

    api.accessories.get({ code: $stateParams.productCode, pageNumber: 1, pageSize: 4 }).then(function (response) {
      $scope.accessories = response.data;
    });

    // Reviews
    // TODO: Need to validate that reviews are the correct viewmodel
    api.reviews.get({ code: $stateParams.productCode }).then(function (response) {
      $scope.ratingsAndReviews = response;
    });

    $scope.decrementQty = function () {
      cartItem.quantity--;
    };

    $scope.incrementQty = function () {
      cartItem.quantity++;
    };

    // Add to Cart
    $scope.isAddToCartEnabled = false;
    $scope.$watch('cartItem.sku', function(sku) {
      $scope.isAddToCartEnabled = !!sku;
    });

    $scope.addToCart = function () {
      $scope.isAddToCartEnabled = false;
      $rootScope.$emit('ADD_TO_CART', cartItem);
    };

    $rootScope.$on('ITEM_ADDED_TO_CART', function() {
      $scope.isAddToCartEnabled = true;
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
]);
