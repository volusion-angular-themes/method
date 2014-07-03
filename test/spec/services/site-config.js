'use strict';

describe('Service: siteConfig', function () {

	// load the service's module
	beforeEach(module('methodApp'));

	// instantiate service
	var siteConfig,
		vnApi;

	beforeEach(inject(function (_vnApi_, _SiteConfig_) {
		siteConfig = _SiteConfig_;
		vnApi = _vnApi_;
	}));

	xit('should be defined', function () {
		expect(!!siteConfig).toBeDefined();
	});

});
