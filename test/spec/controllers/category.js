'use strict';

// ReSharper disable WrongExpressionStatement
describe('Controller: CategoryCtrl', function () {

  // load the controller's module
  beforeEach(module('volusionApp'));

  // ReSharper disable once InconsistentNaming
  var controller;
  var scope;
  var category = {
    data: {
      id: 1,
      name: 'Category 1',
      subCategories: [],
      products: []
    }
  };

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    controller = $controller('CategoryCtrl', {
      $scope: scope,
      category: category
    });
  }));

  it('should attach the product data to the scope', function () {
    expect(scope.category).to.deep.equal(category.data);
  });

});
