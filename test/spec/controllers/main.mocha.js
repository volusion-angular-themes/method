'use strict';

describe('Controller: MainCtrl', function() {

	// load the controller's module
	beforeEach(module('Volusion.controllers', 'ngResource', 'ngSanitize', 'config', 'Volusion.toolboxCommon', 'Volusion.services'));

	var MainCtrl;
	var scope;
	var vnSiteConfig, themeSettings, vnApi;

	var configResponse = {
		data: {
			foo: 'bar'
		}
	};

	var themeSettingsResponse = {
		baz: 'qux'
	};

	// Initialize the controller and a mock scope
	/*jshint camelcase: false */
	beforeEach(inject(function($controller, $rootScope, _vnSiteConfig_, _themeSettings_, _vnApi_) {
		vnSiteConfig = _vnSiteConfig_;
		themeSettings = _themeSettings_;
		vnApi = _vnApi_;
		sinon.stub(vnSiteConfig, 'getConfig', function() {
			return {
				then: function(fn) {
					return fn(configResponse);
				}
			};
		});

		scope = $rootScope.$new();
		MainCtrl = $controller('MainCtrl', {
			$scope: scope
		});
	}));
	/*jshint camelcase: true */

	afterEach(function () {
        vnSiteConfig.getConfig.restore();
	});

	it('calls SiteConfig and stores response in scope', function() {
		expect(vnSiteConfig.getConfig).to.have.been.calledOnce;
		expect(scope.config).to.deep.equal(configResponse.data);
	});
});
