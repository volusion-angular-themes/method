'use strict';

// ReSharper disable WrongExpressionStatement
describe('Controller: ProductCtrl', function() {

  // load the controller's module
  beforeEach(module('volusion.controllers'));

  // ReSharper disable once InconsistentNaming
  var controller;
  var scope;
  var product = {
    data: {
      name: 'Product Name',
      code: 'PC123',
      descriptions: {
        detail: 'Detail here...',
        features: 'Features here...',
        techSpecs: 'Tech Specs here...',
        extendedInfo: 'Extended Info here...'
      },
      seo: {
        title: 'qux',
        description: 'quux',
        keywords: 'garply'
      }
    }
  };

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    $rootScope.seo = {
      title: 'foo',
      description: 'bar',
      keywords: 'baz'
    };
    scope = $rootScope.$new();
    controller = $controller('ProductCtrl', {
      $scope: scope,
      product: product
    });
  }));

  it('should attach the product data to the scope', function() {
    expect(scope.product).to.deep.equal(product.data);
  });

  it('updates the root scope\'s seo object with the product seo', function() {
    expect(scope.seo).to.deep.equal(product.data.seo);
  });

});
