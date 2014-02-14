'use strict';

describe('Controller: TestproductCtrl', function () {

  // load the controller's module
  beforeEach(module('volusionApp'));

  var TestproductCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TestproductCtrl = $controller('TestproductCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
