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
  function (
    api,
    productResponse,
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

    var product = $scope.product = productResponse.data;
    var cartItem = $scope.cartItem = product.cartItem;

    angular.extend($scope.seo, product.seo);

    $scope.product.quantity = 1;

    $scope.toTrusted = function (htmlCode) {
      return $sce.trustAsHtml(htmlCode);
    };

    function setDefaults() {
      product.optionSelection = { images: 'default' };
      product.image = product.images.default[0];
      cartItem.options = cartItem.options || {};
    }

    setDefaults();

    $scope.$watch('product.optionSelection', function (selection, oldSelection) {
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

    // carousel
    $scope.carousel = {
      interval: 4000
    };

    // accordion panels
    $scope.accordionPanels = {
      isopen1: true
    };

    // tabs
    $scope.tabs = {
      relatedProducts: {
        active: true
      },
      accessories: {
        active: false
      }
    };

    var categoryIds = productResponse.categories.map(function (category) {
      return category.id;
    }).join();

    // related products
    api.products.get({ categoryIds: categoryIds, pageNumber: 1, pageSize: 4 }).then(function (response) {
      $scope.relatedProducts = response.data;
    });

    // accessories
    api.products.get({ accessoriesOf: $stateParams.productCode, pageNumber: 1, pageSize: 4 }).then(function (response) {
      $scope.accessories = response.data;
    });

    // reviews
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
    $scope.$watch('cartItem.sku', function (sku) {
      $scope.isAddToCartEnabled = !!sku;
    });

    $scope.addToCart = function () {
      $scope.isAddToCartEnabled = false;
      $rootScope.$emit('ADD_TO_CART', cartItem);
    };

    $rootScope.$on('ITEM_ADDED_TO_CART', function () {
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
