'use strict';

xdescribe('Service: tokenGenerator', function () {

	// load the service's module
	beforeEach(module('methodApp'));

	// instantiate service
	var tokenGenerator;
	beforeEach(inject(function (_tokenGenerator_) {
		tokenGenerator = _tokenGenerator_;
	}));

	it('should do something', function () {
		expect(!!tokenGenerator).toBe(true);
	});

});
