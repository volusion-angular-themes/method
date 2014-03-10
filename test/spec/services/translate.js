'use strict';

// ReSharper disable WrongExpressionStatement
describe('Service: translate', function() {

  var translate;

  // load the service's module
  beforeEach(module('volusionApp'));

  // instantiate service
  // ReSharper disable once InconsistentNaming
  beforeEach(inject(function(_translate_) {
    translate = _translate_;
  }));

  it('exists', function() {
    expect(translate).to.exist;
  });

  it('has an addParts method', function() {
    expect(translate).to.respondTo('addParts');
  });

  var storageKey = 'VN_TRANSLATE';
  var config = {
    region: 'foo',
    lang: 'bar',
    country: 'baz'
  };

  it('gets and sets configuration', function() {
    translate.configure(config);
    expect(translate.getConfig()).to.deep.eq(config);
  });

  it('supports changing your language at runtime', inject(function(storage) {
    var config2 = {
      region: 'bar',
      lang: 'baz',
      country: 'qux'
    };
    translate.configure(config);
    expect(JSON.parse(storage.get(storageKey))).to.deep.eq(config);
    translate.configure(config2);
    expect(JSON.parse(storage.get(storageKey))).to.deep.eq(config2);
  }));

  it('adds multiple translation parts at a time', inject(function($translatePartialLoader) {
    sinon.stub($translatePartialLoader, 'addPart');
    translate.addParts('foo', 'bar');
    expect($translatePartialLoader.addPart).to.have.been.calledTwice;
    expect($translatePartialLoader.addPart).to.have.been.calledWithExactly('foo');
    expect($translatePartialLoader.addPart).to.have.been.calledWithExactly('bar');
  }));

  it('returns a promise when adding parts', inject(function($q) {
    var result = translate.addParts('foo');
    expect(result.prototype).to.eq($q.defer().promise.prototype);
  }));

});
