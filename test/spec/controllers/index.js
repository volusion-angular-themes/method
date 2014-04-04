'use strict';

// ReSharper disable WrongExpressionStatement
describe('Controller: IndexCtrl', function() {

  beforeEach(module('volusionApp'));

  var controller;
  var scope;
  var rootScope;

  beforeEach(inject(function($controller, $rootScope) {
    rootScope = $rootScope;
    scope = $rootScope.$new();
    controller = $controller('IndexCtrl', {
      $scope: scope
    });
  }));

  it('should navigate home when no sub-route is defined', function() {
    inject(function($state) {
      var go = sinon.stub($state, 'go');
      rootScope.$broadcast('$stateChangeSuccess', { name: 'i18n' });
      expect(go).to.have.been.calledOnce;
      expect(go).to.have.been.calledWithExactly('.home', null, { location: 'replace' });
      $state.go.restore();
    });
  });

});
