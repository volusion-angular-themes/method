'use strict';

describe('Controller: SearchCtrl', function () {

	// load the controller's module
	beforeEach(module('methodApp'));

	var SearchCtrl,
		scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		SearchCtrl = $controller('SearchCtrl', {
			$scope: scope
		});
	}));

	xit('should attach a list of awesomeThings to the scope', function () {
		expect(true).toBe(true);
	});
});
