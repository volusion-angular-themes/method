'use strict';

angular.module('volusionApp')
  .controller('TestproductCtrl', function ($scope) {
    $scope.relatedProducts = [
      {'id':1,'name':'Nike Air Jordan Shoe','price':87.32},
      {'id':2,'name':'Nike Shaq Shoe','price':53.18},
      {'id':3,'name':'Nike Omar Shoe','price':77.99},
      {'id':4,'name':'Nike Kobe Shoe','price':107.00}
    ];
  });
