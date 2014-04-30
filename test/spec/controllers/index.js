'use strict';

// ReSharper disable WrongExpressionStatement
describe('Controller: IndexCtrl', function() {

  beforeEach(module('volusionApp'));

  var controller;
  var scope;
  var rootScope;
  var api;

  var response = {
    data: {
      seo: {
        foo: 'bar',
        baz: 'qux'
      }
    }
  };

  beforeEach(inject(function($controller, $rootScope, _api_) {
    api = _api_;
    rootScope = $rootScope;
    scope = $rootScope.$new();

    sinon.stub(api.config, 'get', function() {
      return {
        then: function(fn) {
          return fn(response);
        }
      };
    });

    controller = $controller('IndexCtrl', {
      $scope: scope
    });

  }));

  afterEach(function() {
    api.config.get.restore();
  });

  it('should navigate home when no sub-route is defined', function() {
    inject(function($state) {
      var go = sinon.stub($state, 'go');
      rootScope.$broadcast('$stateChangeSuccess', { name: 'i18n' });
      expect(go).to.have.been.calledOnce;
      expect(go).to.have.been.calledWithExactly('.home', null, { location: 'replace' });
      $state.go.restore();
    });
  });

  it('assigns seo data from the config api response to the rootscope', function() {
    expect(rootScope.seo).to.deep.equal(response.data.seo);
  });
});
