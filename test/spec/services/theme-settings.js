'use strict';

describe('Service: themeSettings', function () {

  // load the service's module
  beforeEach(module('volusionMethodThemeApp'));

  // instantiate service
  var themeSettings;
  beforeEach(inject(function (_themeSettings_) {
    themeSettings = _themeSettings_;
  }));

  it('should do something', function () {
    expect(!!themeSettings).toBe(true);
  });

});
