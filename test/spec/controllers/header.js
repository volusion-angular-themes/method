describe('Controller: HeaderCtrl', function () {

	'use strict';

	// load the controller's module
	beforeEach(module('volusionMethodThemeApp'));

	var HeaderCtrl,
		scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		HeaderCtrl = $controller('HeaderCtrl', {
			$scope: scope
		});
	}));

	xit('should attach a list of awesomeThings to the scope', function () {
		expect(scope.awesomeThings.length).toBe(3);
	});
});
