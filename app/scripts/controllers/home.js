'use strict';

module.exports = [
  '$scope',
  'api',
  function ($scope, api) {
    // Slider
    api.slider.query().then(function(data){
        $scope.slider = data;
      });

    $scope.interval = 4000;
  }
];
