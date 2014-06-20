'use strict';

angular.module('volusion.controllers').controller('IndexCtrl', [
  '$state',
  '$location',
  '$scope',
  '$http',
  'api',
  '$rootScope',
  'tokenGenerator',
  'cacheBustFilter',
  function (
    $state,
    $location,
    $scope,
    $http,
    api,
    $rootScope,
    tokenGenerator,
    cacheBustFilter) {

    $http.get(cacheBustFilter('/settings/themeSettings.json'))
    .success(function (data) {
      console.log('themeSettings: ', data);
      $rootScope.themeSettings = data;

      $rootScope.slider = {
        interval: $rootScope.themeSettings.slider.interval,
        slides: $rootScope.themeSettings.slider.slides
      };

      $rootScope.homeTiles = {
        tile1: {
          imageUrl: $rootScope.themeSettings.homeTiles.tile1.imageUrl,
          linkTo: $rootScope.themeSettings.homeTiles.tile1.linkTo
        },
        tile2: {
          imageUrl: $rootScope.themeSettings.homeTiles.tile2.imageUrl,
          linkTo: $rootScope.themeSettings.homeTiles.tile2.linkTo
        },
        tile3: {
          imageUrl: $rootScope.themeSettings.homeTiles.tile3.imageUrl,
          linkTo: $rootScope.themeSettings.homeTiles.tile3.linkTo
        },
        tile4: {
          imageUrl: $rootScope.themeSettings.homeTiles.tile4.imageUrl,
          linkTo: $rootScope.themeSettings.homeTiles.tile4.linkTo
        },
        tile5: {
          imageUrl: $rootScope.themeSettings.homeTiles.tile5.imageUrl,
          linkTo: $rootScope.themeSettings.homeTiles.tile5.linkTo
        },
        tile6: {
          imageUrl: $rootScope.themeSettings.homeTiles.tile6.imageUrl,
          linkTo: $rootScope.themeSettings.homeTiles.tile6.linkTo
        }
      };
    });

    //hide header & footer when viewing theme-settings
    if ($location.path().indexOf('/theme-settings') >= 0) {
      $rootScope.hideWrapper = true;
    }

    $rootScope.seo = {};

    $scope.$on('$stateChangeSuccess', function (event, toState) {
      if (toState.name === 'i18n') {
        $state.go('.home', null, { location: 'replace' });
      } else if (toState.name === 'i18n.home' && $scope.config) {
        $rootScope.seo = angular.extend($rootScope.seo, $scope.config.seo);
      }
    });

    this.getMenuItems = function () {
      // Nav
      api.navs.get({ navId: 1 }).then(function (response) {
        $scope.categories = response.data;

        // TODO: REMOVE
        console.log('Categories: ', response.data);
      }, function (error) {
        console.log('Error: ' + error);
      });
    };

    this.getConfig = function (callbackFn) {
      // Config
      api.config.get(tokenGenerator.getCacheBustingToken()).then(function (response) {
        $scope.config = response.data;
        angular.extend($rootScope.seo, $scope.config.seo);

        // TODO: REMOVE
        console.log('Config: ', response.data);

        if (callbackFn) {
          callbackFn($scope.config.checkout.cartId);
        }

      }, function (error) {

        console.log('Error: ', error);

      });
    };

    this.getCart = function (cartId) {
      // Carts
      api.carts.get({ cartId: cartId })
        .then(function (response) {
          $scope.cart = response.data;
          // TODO: REMOVE
          console.log('Cart: ', response.data);
        }, function (error) {
          console.log('Error: ', error);
        });
    };

    this.getMenuItems();

    this.getConfig(this.getCart);

    $rootScope.viewCart = function () {
      if ($rootScope.isInDesktopMode) {
        return '/shoppingcart.asp';
      } else {
        return '/checkout.asp';
      }
    };

    // Add to Cart
    $rootScope.$on('ADD_TO_CART', function(event, cartItem) {
      var cartId = $scope.cart && $scope.cart.id;
      if (typeof cartId === 'undefined') {
        cartId = $scope.config.checkout.cartId;
      }
      api.carts.save({ cartId: cartId }, cartItem)
        .then(function(response) {
          $rootScope.$emit('ITEM_ADDED_TO_CART', $scope.cart = response.data);
        });
    });
  }
]);
