'use strict';

// ReSharper disable WrongExpressionStatement
describe('Controller: ProductCtrl', function() {

  // load the controller's module
  beforeEach(module('volusionApp'));

  // ReSharper disable once InconsistentNaming
  var controller;
  var scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    controller = $controller('ProductCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of oneAtATime to the scope', function() {
    expect(scope.oneAtATime).to.exist;
  });

  it('should attach a list of groups to the scope', function() {
    expect(scope.groups).to.have.length(2);
  });

});
