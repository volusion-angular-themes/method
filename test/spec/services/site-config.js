/*global describe, beforeEach, module, inject, it, expect */

describe('Service: siteConfig', function () {

	'use strict';
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
