'use strict';

module.exports = [
  function() {
    return {
      restrict: 'A',
      replace: true,
      controller: 'ProductOptionCtrl',
      templateUrl: 'product-option.html',
      scope: {
        option: '=',
        product: '=',
        saveTo: '='
      }
    };
  }
];
