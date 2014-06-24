'use strict';

angular.module('volusion.controllers').controller('IndexCtrl', [
  '$rootScope',
  '$state',
  '$location',
  '$scope',
  '$http',
  'api',
  'tokenGenerator',
  'cacheBustFilter',
  '$timeout',
  '$window',
  function (
    $rootScope,
    $state,
    $location,
    $scope,
    $http,
    api,
    tokenGenerator,
    cacheBustFilter,
    $timeout,
    $window) {

    $rootScope.seo = {};

    $scope.$on('$stateChangeSuccess', function() {
      $http.get(cacheBustFilter('/settings/themeSettings.json'))
      .success(function (data) {
        console.log('Theme Settings:', data);
        $rootScope.themeSettings = data;
      });
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

    $scope.isPrimaryNavReady = false;

    function buildSmartNav(cssClassForTopLevelMenuItems) {
      var itemIndex = 0;
      var firstItemTopPosition = 0;
      var indexPositionWhereItemWrapped = 0;

      angular.forEach(angular.element('.' + cssClassForTopLevelMenuItems), function (value) {
        // Get top position of first item
        if (itemIndex === 0) {
          firstItemTopPosition = angular.element(value).position().top;
        }

        if (angular.element(value).position().top !== firstItemTopPosition) {
          indexPositionWhereItemWrapped = itemIndex;
          return false;
        }

        itemIndex++;
      });

      if (indexPositionWhereItemWrapped !== 0) {
        $scope.displaySmartNavMoreMenuItem = true;
        $scope.smartNavMoreCategories = [];
        var newSmartNavCategories = [];

        angular.forEach($scope.categories, function (value, index) {
          if (index >= (indexPositionWhereItemWrapped - 1)) {
            $scope.smartNavMoreCategories.push(value);
          } else {
            newSmartNavCategories.push(value);
          }
        });

        $scope.smartNavCategories = newSmartNavCategories;
      }

      angular.element('.' + cssClassForTopLevelMenuItems).css('visibility', 'visible');
    }

    $rootScope.windowWidth = $window.outerWidth;
    angular.element($window).bind('resize', function () {
      $rootScope.windowWidth = $window.outerWidth;
      $rootScope.$apply('windowWidth');
    });

    $rootScope.$watch('windowWidth', function () {
      $scope.displaySmartNavMoreMenuItem = false;
      angular.element('.nav-top-level-menu-items').css('visibility', 'hidden');

      $scope.smartNavCategories = $scope.categories;

      $timeout(function () {
        buildSmartNav('nav-top-level-menu-items');
      }, 0);
    });

    this.getMenuItems = function () {
      // Nav
      api.navs.get({ navId: 1 }).then(function (response) {
        $scope.smartNavCategories = $scope.categories = response.data;

        $timeout(function () {
          buildSmartNav('nav-top-level-menu-items');
        }, 0);

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
        $rootScope.seo = $rootScope.seo || $scope.config.seo;

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

$(document).ready(function() {
  $('[data-toggle="popover"]').popover();
  $('body').on('click', function (e) {
    $('[data-toggle="popover"]').each(function () {
      if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
        $(this).popover('hide');
      }
    });
  });
});
