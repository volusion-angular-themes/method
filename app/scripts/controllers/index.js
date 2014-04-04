'use strict';

module.exports = [
  '$scope',
  '$state',
  'api',
  function(
    $scope,
    $state,
    api) {

    $scope.$on('$stateChangeSuccess', function(event, toState) {
      if (toState.name === 'i18n') {
        $state.go('.home', null, { location: 'replace' });
      }
    });

    $scope.global = {
      cart: {
        itemCount: 10
      }
    };

    // Cart
    api.cart.get().then(function (response) {
        $scope.cart = response.data;
        // TODO: REMOVE
        console.log('Cart: ', response.data);
      }, function (error) {
        console.log('Error: ', error);
      });

    // Categories
    api.categories.get().then(function (response) {
        $scope.categories = response.data;
        // TODO: REMOVE
        console.log('Categories: ', response.data);
      }, function (error) {
        console.log('Error: ' + error);
      });

    // Config
    api.config.get().then(function (response) {
        $scope.config = response.data;
        // TODO: REMOVE
        console.log('Config: ', response.data);
      }, function (error) {
        console.log('Error: ', error);
      });

  }
];
