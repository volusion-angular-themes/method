'use strict';

// ReSharper disable WrongExpressionStatement
describe('Service: apiProvider', function() {
  var apiProvider;
  var api;
  var $httpBackend;
  var baseRoutePath = '/local/';
  var customActions = {
    'bar': { method: 'GET', headers: { 'baz': 'qux' } },
    'update': {method: 'POST', headers: { 'foo': 'bar' } }
  };

  beforeEach(module('pascalprecht.translate', 'volusion.services', function(_apiProvider_) {
      apiProvider = _apiProvider_;
      apiProvider.setBaseRoute(baseRoutePath);
      apiProvider.endpoint('test', customActions)
        .route('cart');
    }));

  /*jshint camelcase: false */
  // ReSharper disable InconsistentNaming
  beforeEach(inject(function(_api_, _$httpBackend_) {
    // ReSharper restore InconsistentNaming
    api = _api_;
    $httpBackend = _$httpBackend_;
  }));
  /*jshint camelcase: true */

  describe('with api provider', function() {
      it('it sets base route of the provider', function() {
        // check sanity
        expect(apiProvider).not.to.be.undefined;
        expect(apiProvider.baseRoute).to.eq(baseRoutePath);
      });

      it('it sets the test enpoint with route and default methods', function() {
        expect(api.test).not.to.be.undefined;
        expect(api.test.config.route).to.eq('cart');
        expect(api.test).to.respondTo('get');
        expect(api.test).to.respondTo('save');
        expect(api.test).to.respondTo('query');
        expect(api.test).to.respondTo('update');
        expect(api.test).to.respondTo('patch');
        expect(api.test).to.respondTo('remove');
      });

      it('it makes the HTTP GET call on the get method', function() {
        $httpBackend.whenGET('/local/cart').respond({test: 'test'});
        api.test.get().then(function(response) {
          expect(response.test).to.eq('test');
          $httpBackend.flush();
        });
      });

      it('it makes the HTTP POST call on the save method', function() {
        $httpBackend.whenPOST('/local/cart').respond('201', '');
        api.test.save().then(function(response) {
          expect(response.$resolved).to.be.true;
          $httpBackend.flush();
        });
      });
    });

  describe('Custom Actions', function () {

    it('adds custom actions with headers to the api', function() {
      $httpBackend.expectGET('/local/cart',
        {
          'baz': 'qux',
          'Accept': 'application/json, text/plain, */*'
        })
        .respond({quux: 'corge'});

      expect(api.test).to.respondTo('bar');

      api.test.bar().then(function(response) {
        expect(response.quux).to.eq('corge');
        $httpBackend.flush();
      });

      $httpBackend.verifyNoOutstandingExpectation();
    });

    it('overrides default action  with the custom action if the key is the same', function() {
      $httpBackend.expectPOST('/local/cart', {},
        {
          'foo': 'bar',
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json;charset=utf-8'
        })
        .respond('200', '');

      api.test.update({}, {}).then(function(response) {
        expect(response.$resolved).to.be.true;
        $httpBackend.flush();
      });

      $httpBackend.verifyNoOutstandingExpectation();
    });

  });
});
