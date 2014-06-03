'use strict';

// ReSharper disable WrongExpressionStatement
describe('Service: tokenGenerator', function() {

  beforeEach(module('volusion.services'));

  var tokenGenerator;

  // ReSharper disable once InconsistentNaming
  beforeEach(inject(function(_tokenGenerator_) {
    tokenGenerator = _tokenGenerator_;
  }));

  it('exists', function () {
    expect(tokenGenerator).to.exist;
  });

  it('is an object', function() {
    expect(tokenGenerator).to.be.an('object');
  });

  it('has getCacheBustingToken method', function() {
    expect(tokenGenerator).to.respondTo('getCacheBustingToken');
  });

  it('getCacheBustingToken method returns a token object', function() {
    var token = tokenGenerator.getCacheBustingToken();
    expect(token).to.be.an('object');
    expect(token._).to.exist;
  });
});
