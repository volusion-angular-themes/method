angular.module('Volusion.controllers')
	.controller('MainCtrl', ['$scope', '$rootScope', '$location', '$window', '$timeout', 'vnApi', 'themeSettings', 'vnSiteConfig', 'vnImagePreloader', 'vnDevice', 'paypalConfig',
		function ($scope, $rootScope, $location, $window, $timeout, vnApi, themeSettings, vnSiteConfig, vnImagePreloader, vnDevice, paypalConfig) {

			'use strict';

			$rootScope.seo = {};

			vnSiteConfig.getConfig().then(function (response) {

				$rootScope.config = response.data;
				$rootScope.config.paypal = paypalConfig;

				$rootScope.seo = response.data.seo;

				if($rootScope.config.checkout.isPaypalExpressAvailable){
					angular.element('body').append('<script src="' + $rootScope.config.paypal.checkoutUrl + '" async></script>');
				}

				$rootScope.$emit('config.updated');
			});

			themeSettings.getThemeSettings().then(function(response) {
				$scope.themeSettings = response;

				var imagesToPreload  = [];

				angular.forEach($scope.themeSettings.pages.home.slider.slides, function (slide) {
					imagesToPreload.push(slide.imageUrl);
				});

				vnImagePreloader.preloadImages(imagesToPreload);
			});

			vnDevice.init({
				breakpoints: {
					phone: 768,
					tablet: 992
				},
				listeners: {
					location: false,
					orientation: true,
					network: false,
					resize: false
				}
			});

		}]);
