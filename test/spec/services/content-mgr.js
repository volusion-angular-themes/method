'use strict';

describe('Service: vnContentMgr', function () {

	// load the service's module
	beforeEach(module('methodApp'));

	// instantiate service
	var ContentMgr;
	beforeEach(inject(function (_ContentMgr_) {
		ContentMgr = _ContentMgr_;
	}));

	it('should do something', function () {
		expect(ContentMgr).toBeDefined();
	});

});
