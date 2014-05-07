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
      },
      checkout: {
        cartId: '1234'
      }
    }
  };

  var cartResponse = {
    data: {
      id: 1,
      foo: 'bar',
      baz: 'qux'
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

    sinon.stub(api.carts, 'save', function() {
      return {
        then: function(fn) {
          return fn(cartResponse);
        }
      };
    });

    controller = $controller('IndexCtrl', {
      $scope: scope
    });

  }));

  afterEach(function() {
    api.config.get.restore();
    api.carts.save.restore();
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

  it('updates the seo object when navigating to the home route', function() {
    rootScope.seo = {};
    var toState = {
      name: 'i18n.home'
    };
    rootScope.$broadcast('$stateChangeSuccess', toState);
    expect(rootScope.seo).to.deep.equal(response.data.seo);
  });

  it('makes the carts.save() call on the ADD_TO_CART event', function (done) {

    scope.cart = {
      id: 1
    };

    var eventData = {
      id: 123,
      code: 'foo',
      name: 'bar',
      qty: 1,
      options: [],
      pricing: {
        regularPrice: 100
      }
    };

    rootScope.$on('ITEM_ADDED_TO_CART', function() {
      done();
    });

    rootScope.$broadcast('ADD_TO_CART', eventData);
    expect(api.carts.save).to.have.been.calledOnce;
  });

});
