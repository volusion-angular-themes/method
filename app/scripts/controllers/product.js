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

    function setDefaults() {
      product.optionSelection = { images: 'default' };
      product.image = product.images.default[0];
      cartItem.options = cartItem.options || {};
    }

    setDefaults();

    $rootScope.$on('VN_PRODUCT_SELECTED', function(event, selection) {
      selection.product.optionSelection = selection;
    });

    $scope.$watch('product.optionSelection', function (selection, oldSelection) {

      function setAvailabilityMessage() {
        var message = product.optionAvailabilityMessages[selection.state];
        if (message) {
          $scope.availabilityMessage = message.replace('{{available}}', selection.available);
        } else {
          delete $scope.availabilityMessage;
        }
      }

      function setSKU() {
        var sku = selection.sku;
        if (sku !== null && typeof sku !== 'undefined') {
          cartItem.sku = sku;
        }
      }

      function setQuantity() {
        if (!selection.isValid) {
          cartItem.quantity = 0;
          selection.available = 0;
          return;
        }
        if (selection.available < cartItem.quantity) {
          cartItem.quantity = selection.available;
        }
        if (cartItem.quantity === 0 && selection.available > 0) {
          cartItem.quantity = 1;
        }
        selection.available -= cartItem.quantity;
      }

      function setImage() {
        if (selection.images !== oldSelection.images) {
          product.image = product.images[selection.images][0];
        }
      }

      setAvailabilityMessage();
      setSKU();
      setQuantity();
      setImage();
      $scope.isAddToCartButtonEnabled = selection.isValid && cartItem.quantity > 0;
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

    var categoryIds = productResponse.data.categories.map(function (category) {
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
      modifyQuantity(-1);
    };

    $scope.incrementQty = function () {
      modifyQuantity(1);
    };

    function modifyQuantity(amount) {
      cartItem.quantity += amount;
      var selection = product.optionSelection;
      if (selection) {
        selection.available -= amount;
      }
    }

    // Add to Cart
    $scope.addToCart = function () {
      $rootScope.$emit('ADD_TO_CART', cartItem);
      cartItem.quantity = 0;
    };

    $rootScope.$on('ITEM_ADDED_TO_CART', function () {
      var selection = product.optionSelection;
      modifyQuantity(selection.available && 1);
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
