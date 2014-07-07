'use strict';

// TODO : Figure out why this is an issue: ReferenceError: MessageFormat is not defined

xdescribe('Service: cart', function() {

	// load the service's module
	beforeEach(module('methodApp'));

	// instantiate service
	var cart;
	beforeEach(inject(function(_cart_) {
		cart = _cart_;
	}));

	it('should do something', function() {
		expect(!!cart).toBe(true);
	});

});
