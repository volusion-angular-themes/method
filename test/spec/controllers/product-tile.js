'use strict';

xdescribe('Controller: ProductTileCtrl', function () {

  // load the controller's module
  beforeEach(module('methodApp'));

  var ProductTileCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProductTileCtrl = $controller('ProductTileCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
