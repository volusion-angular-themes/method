'use strict';

// ReSharper disable WrongExpressionStatement
describe('Controller: ContactCtrl', function() {

  beforeEach(module('volusionApp'));

  var controller;
  var scope;

  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    controller = $controller('ContactCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(scope.awesomeThings).to.have.length(3);
  });

});
