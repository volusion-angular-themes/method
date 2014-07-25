'use strict';

describe('Service: vnContentMgr', function () {

	// load the service's module
	beforeEach(module('methodTheme'));

	// instantiate service
	var ContentMgr;
	beforeEach(inject(function (_ContentMgr_) {
		ContentMgr = _ContentMgr_;
	}));

	xit('should do something', function () {
		expect(!!ContentMgr).toBe(true);
	});

});
