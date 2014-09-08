'use strict';

xdescribe('Service: searchManager', function () {

	// load the service's module
	beforeEach(module('methodApp'));

	// instantiate service
	var searchManager;
	beforeEach(inject(function (_searchManager_) {
		searchManager = _searchManager_;
	}));

	it('should do something', function () {
		expect(!!searchManager).toBe(true);
	});
});
