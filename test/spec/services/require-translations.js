'use strict';

// ReSharper disable WrongExpressionStatement
describe('Service: requireTranslations', function () {

  beforeEach(module('volusionApp'));

  var service;
  beforeEach(inject(function(requireTranslations) {
    service = requireTranslations;
  }));

  it('adds multiple translation parts at a time', inject(function($translatePartialLoader) {
    sinon.stub($translatePartialLoader, 'addPart');
    service('foo', 'bar');
    expect($translatePartialLoader.addPart).to.have.been.calledTwice;
    expect($translatePartialLoader.addPart).to.have.been.calledWithExactly('foo');
    expect($translatePartialLoader.addPart).to.have.been.calledWithExactly('bar');
  }));

  it('returns a promise', inject(function($q) {
    var promise = $q.defer().promise;
    expect(service().prototype).to.eq(promise.prototype);
  }));

});
