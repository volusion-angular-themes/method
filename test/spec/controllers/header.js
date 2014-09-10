describe('Controller: HeaderCtrl', function () {

	'use strict';

	// load the controller's module
	beforeEach(module('methodApp'));

	var HeaderCtrl,
		scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		HeaderCtrl = $controller('HeaderCtrl', {
			$scope: scope
		});
	}));

    it('should exist', function() {
        expect(HeaderCtrl).toBeDefined();
    });
});
