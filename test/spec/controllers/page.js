'use strict';

describe('Controller: PageCtrl', function() {

	// load the controller's module
	beforeEach(module('methodApp'));

	var PageCtrl;
	var scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function($controller, $rootScope) {
		scope = $rootScope.$new();
		PageCtrl = $controller('PageCtrl', {
			$scope: scope
		});
	}));

	xit('should attach a list of awesomeThings to the scope', function() {
		expect(scope.awesomeThings.length).toBe(3);
	});
});
