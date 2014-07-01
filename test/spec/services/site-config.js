'use strict';

describe('Service: siteConfig', function () {

	// load the service's module
	beforeEach(module('methodApp'));

	// instantiate service
	var siteConfig;
	beforeEach(inject(function (_SiteConfig_) {
		siteConfig = _SiteConfig_;
	}));

	it('should do something', function () {
		expect(!!siteConfig).toBeDefined();
	});

});
