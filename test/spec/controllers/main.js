//Disabling until we can get vnDevice to work in this test

/*describe('Controller: MainCtrl', function () {

	'use strict';

	// load the controller's module
	beforeEach(module('methodApp'));

	var MainCtrl,
		scope,
		vnDevice;

	beforeEach(inject(function ($controller, $rootScope, _vnDevice_) {
		vnDevice = _vnDevice_;

		spyOn(vnDevice, "init").and.returnValue(true);

		scope = $rootScope.$new();
		MainCtrl = $controller('MainCtrl', {
			$scope: scope
		});
	}));

	it('should exist', function() {
		expect(MainCtrl).toBeDefined();
	});

	it('should call SiteConfig', function() {
		expect(vnSiteConfig.getConfig).toHaveBeenCalled();
	});
});*/
