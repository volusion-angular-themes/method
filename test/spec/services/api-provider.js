'use strict';

// TODO : Figure out why this is an issue: ReferenceError: MessageFormat is not defined

xdescribe('Service: apiProvider', function() {

	// load the service's module
	beforeEach(module('methodApp'));

	// instantiate service
	var apiProvider;
	beforeEach(inject(function(_apiProvider_) {
		apiProvider = _apiProvider_;
	}));

	it('should do something', function() {
		expect(!!apiProvider).toBe(true);
	});

});
