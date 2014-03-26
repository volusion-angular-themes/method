'use strict';

module.exports = [
  '$scope',
  '$http',

  function ($scope, $http) {

    $scope.global = {
      cart: {
        itemCount: 10
      }
    };

    // Cart
    $http.get('http://volusion.apiary.io/cart')
      .success(function (data) {
        $scope.cart = data;

        // TODO: REMOVE
        console.log('Cart: ' + data);
      })
      .error(function (data) {
        console.log('Error: ' + data);
      });

    // Categories
    $http.get('http://volusion.apiary.io/categories')
      .success(function (data) {
        $scope.categories = data;

        // TODO: REMOVE
        console.log('Categories: ' + data);
      })
      .error(function (data) {
        console.log('Error: ' + data);
      });

    // Config
    $http.get('http://volusion.apiary.io/config')
      .success(function (data) {
        $scope.config = data;

        // TODO: REMOVE
        console.log('Config: ' + data);
      })
      .error(function (data) {
        console.log('Error: ' + data);
      });

    $scope.htmlReady();
  }
];
