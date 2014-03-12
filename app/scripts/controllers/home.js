'use strict';

module.exports = [
  '$scope',
  '$translatePartialLoader',
  '$http',

  function ($scope, $translatePartialLoader, $http) {
    $translatePartialLoader.addPart('home');

    // Slider
    $http.get('http://volusion.apiary.io/slider')
      .success(function (data) {
        $scope.slider = data;

        // TODO: REMOVE
        console.log(data);
      })
      .error(function (data) {
        console.log('Error: ' + data);
      });

    $scope.htmlReady();
  }
];
