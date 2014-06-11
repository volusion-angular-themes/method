'use strict';

// ReSharper disable WrongExpressionStatement
describe('Filter: cacheBust', function() {
  beforeEach(module('volusion.filters', 'volusion.services'));

  var cacheBustFilter, cacheBustingToken;

  cacheBustingToken = {'_': 'qux'};
  /*jshint camelcase: false */
  beforeEach(inject(function (_cacheBustFilter_, tokenGenerator) {
    cacheBustFilter = _cacheBustFilter_;
    sinon.stub(tokenGenerator, 'getCacheBustingToken', function() {
      return cacheBustingToken;
    });
  }));
  /*jshint camelcase: true */

  it('appends cache busting token as a query string', function() {
    expect(cacheBustFilter('foo')).to.eq('foo?_=qux');
  });


  it('appends cache busting token to existing query string params', function() {
    expect(cacheBustFilter('foo?bar=baz')).to.eq('foo?bar=baz&_=qux');
  });


  it('does not append cache busting token to an empty string', function() {
    expect(cacheBustFilter('')).to.be.empty;
  });

  it('does not append cache busting token to undefined value', function() {
    expect(cacheBustFilter()).to.be.undefined;
  });

});