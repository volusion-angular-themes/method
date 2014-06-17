'use strict';

describe('Service: apiProvider', function () {

  // load the service's module
  beforeEach(module('volusionMethodThemeApp'));

  // instantiate service
  var apiProvider;
  beforeEach(inject(function (_apiProvider_) {
    apiProvider = _apiProvider_;
  }));

  it('should do something', function () {
    expect(!!apiProvider).toBe(true);
  });

});
