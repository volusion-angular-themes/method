'use strict';

// ReSharper disable WrongExpressionStatement
describe('Controller: ProductCtrl', function () {

  // load the controller's module
  beforeEach(module('volusionApp'));

  // ReSharper disable once InconsistentNaming
  var controller;
  var scope;
  var product = {
    name: 'Product Name',
    code: 'PC123'
  };

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    controller = $controller('ProductCtrl', {
      $scope: scope,
      product: product
    });
  }));

  it('should attach the product data to the scope', function () {
    expect(scope.product).to.deep.equal(product);
  });

});
