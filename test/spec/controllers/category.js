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
      products: [],
      seo: {
        title: 'qux',
        description: 'quux',
        keywords: 'garply'
      }
    }
  };

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    $rootScope.seo = {
      title: 'foo',
      description: 'bar',
      keywords: 'baz'
    };
    scope = $rootScope.$new();
    controller = $controller('CategoryCtrl', {
      $scope: scope,
      category: category
    });
  }));

  it('should attach the category data to the scope', function () {
    expect(scope.category).to.deep.equal(category.data);
  });

  it('updates the root scope\'s seo object with the category seo', function() {
    expect(scope.seo).to.deep.equal(category.data.seo);
  });

});
