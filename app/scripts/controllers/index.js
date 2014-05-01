'use strict';

module.exports = [
  '$state',
  '$scope',
  'api',
  '$rootScope',
  '$http',
  '$timeout',
  function (
    $state,
    $scope,
    api,
    $rootScope,
    $http,
    $timeout) {

    $scope.$on('$stateChangeSuccess', function(event, toState) {
      if (toState.name === 'i18n') {
        $state.go('.home', null, { location: 'replace' });
      } else if (toState.name === 'i18n.home' && $scope.config) {
        $rootScope.seo = angular.extend($rootScope.seo, $scope.config.seo);
      }
    });

    // Carts
    api.carts.get().then(function (response) {
        $scope.cart = response.data;
        // TODO: REMOVE
        console.log('Cart: ', response.data);
      }, function (error) {
        console.log('Error: ', error);
      });

    // Nav
    api.navs.get({ navId: 1 }).then(function (response) {
        $scope.categories = response.data;
        // TODO: REMOVE
        console.log('Categories: ', response.data);
      }, function (error) {
        console.log('Error: ' + error);
      });

    // Config
    api.config.get().then(function (response) {
        $scope.config = response.data;
        $rootScope.seo = angular.extend({}, $scope.config.seo);
        // TODO: REMOVE
        console.log('Config: ', response.data);
      }, function (error) {
        console.log('Error: ', error);
      });

    // Add to Cart
    $rootScope.$on('ADD_TO_CART', function (event, args) {
      console.log(args);

      //var product = {
      //  id: args.sku,
      //  code: args.code,
      //  name: args.name,
      //  taxable: true,
      //  qty: 1,
      //  options: [],
      //  kits: [],
      //  pricing: {
      //    subtotal: args.price,
      //    unitPrice: args.price
      //  },
      //  imgUrl: '',
      //  productUrl: ''
      //};

      //$scope.cart.items.push(product);

      //$http.put('/api/v1/carts/current', $scope.cart, function (responseText) {
      //  console.log(responseText);
      //});

      // SAMPLE URL
      //   /ProductDetails.asp?ProductCode=' + encodeURIComponent(productCode) + '&btnaddtocart=btnaddtocart&AjaxError=Y&batchadd=Y',
      //  'ProductCode=' + encodeURIComponent(productCode) + '&QTY.' + encodeURIComponent(productCode) + '=1' + '&' + selectedValues.join('&')
      var url = '/ProductDetails.asp?ProductCode=' + encodeURIComponent(args.sku) + '&btnaddtocart=btnaddtocart&AjaxError=Y&batchadd=Y';
      var postData = 'ProductCode=' + encodeURIComponent(args.sku) + '&QTY.' + encodeURIComponent(args.sku) + '=1';

      $http.post(url, postData).success(function (data) {
        console.log(data);
        $scope.cart.items.push({});
      });

      $timeout(function() {
        $rootScope.$emit('ITEM_ADDED_TO_CART');
      }, 1000);
    });
  }
];
