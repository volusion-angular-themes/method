'use strict';

describe('Controller: MainCtrl', function() {

	// load the controller's module
	beforeEach(module('Volusion.controllers', 'ngResource', 'config', 'Volusion.toolboxCommon', 'Volusion.services'));

	var MainCtrl;
	var scope;
	var SiteConfig, themeSettings, vnApi;


	var configResponse = {
		data: {
			foo: 'bar'
		}
	};

	var themeSettingsResponse = {
		baz: 'qux'
	};

	var navApiResponse = [{
		quux: 'garply'
	}];

	// Initialize the controller and a mock scope
	/*jshint camelcase: false */
	beforeEach(inject(function($controller, $rootScope, _SiteConfig_, _themeSettings_, _vnApi_) {
		SiteConfig = _SiteConfig_;
		themeSettings = _themeSettings_;
		vnApi = _vnApi_;
		sinon.stub(SiteConfig, 'getConfig', function() {
			return {
				then: function(fn) {
					return fn(configResponse);
				}
			};
		});

//		sinon.stub(themeSettings, 'getThemeSettings', function() {
//			return {
//				then: function(fn) {
//					return fn(themeSettingsResponse);
//				}
//			};
//		});

		sinon.stub(vnApi, 'Nav', function() {
			return {
				get: function() {
					return {
						$promise: {
							then: function(fn) {
								return fn(navApiResponse);
							}
						}
					};
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
		SiteConfig.getConfig.restore();
//		themeSettings.getThemeSettings.restore();
		vnApi.Nav.restore();
	});

	it('calls SiteConfig and stores response in scope', function() {
		expect(SiteConfig.getConfig).to.have.been.calledOnce;
		expect(scope.config).to.deep.equal(configResponse.data);
	});

	it.skip('calls themeSettings and stores response in scope', function() {
		expect(themeSettings.getThemeSettings).to.have.been.calledOnce;
		expect(scope.themeSettings).to.deep.equal(themeSettingsResponse);
	});


	it('calls vnApi.Nav and stores response in scope', function() {
		expect(vnApi.Nav).to.have.been.calledOnce;
	});

});
