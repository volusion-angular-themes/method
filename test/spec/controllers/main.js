describe('Controller: MainCtrl', function () {

	'use strict';

	var MainCtrl,
		scope,
		vnDevice,
		vnSiteConfig;

	// load the controller's module
	beforeEach(module('methodApp'));

	beforeEach(inject(function ($controller, $rootScope, _vnSiteConfig_, _vnDevice_) {
		vnDevice = _vnDevice_;
		vnSiteConfig = _vnSiteConfig_;

		spyOn(vnDevice, "init");
		spyOn(vnSiteConfig, "getConfig").and.returnValue({
			then: function(response) {
				return response;
			}
		});

		scope = $rootScope.$new();
		MainCtrl = $controller('MainCtrl', {
			$scope: scope
		});

	}));

	it('should exist', function() {
		expect(MainCtrl).toBeDefined();
	});

	it('should initialize vnDevice', function() {
		expect(vnDevice.init).toHaveBeenCalled();
	});

	it('should call SiteConfig', function() {
		expect(vnSiteConfig.getConfig).toHaveBeenCalled();
	});
});
