'use strict';

module.exports = [
  '$scope',
  '$http',

  function($scope, $http) {

    $scope.headingMenus = [
      {
        title: 'Sign-In',
        url: '#'
      },
      {
        title: 'Create Account',
        url: '#'
      },
      {
        title: 'My Favorites',
        url: '#'
      }
    ];

    $scope.global = {
      cart: {
        itemCount: 10
      }
    };

    // Config
    $http.get('http://volusion.apiary.io/config')
      .success(function (data) {
        $scope.config = data;

        // TODO: REMOVE
        console.log(data);
      })
      .error(function (data) {
        console.log('Error: ' + data);
      });

    $scope.htmlReady();
  }
];
