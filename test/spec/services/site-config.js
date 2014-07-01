'use strict';

describe('Service: siteConfig', function () {

  // load the service's module
  beforeEach(module('volusionMethodThemeApp'));

  // instantiate service
  var siteConfig;
  beforeEach(inject(function (_siteConfig_) {
    siteConfig = _siteConfig_;
  }));

  it('should do something', function () {
    expect(!!siteConfig).toBe(true);
  });

});
