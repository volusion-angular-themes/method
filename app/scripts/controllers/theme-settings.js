/**
 * @ngdoc function
 * @name methodApp.controller:ThemeSettingsCtrl
 * @description
 * # ThemeSettingsCtrl
 * Controller of the methodApp
 */
angular.module('methodApp')
	.controller('ThemeSettingsCtrl', ['$scope', '$http', '$location', 'ContentMgr',
		function ($scope, $http, $location, ContentMgr) {
			'use strict';

			/*
			Welcome to the main theme settings controller.
			The data model in themeSettings.json is 100% customizable. Make it your own.
			Your storefront theme can read the themeSettings.json file in production at www.domain.com/scripts/themeSettings.json
			And this admin interface can read & write this file via the Volusion API endpoint www.domain.com/api/v1/themes/method/settings
			*/

			//load data on initial page load
			var apiUrl;
			var environment;

			// Update the UI For this page and hide header and footer when this controller is in use
			ContentMgr.hideAppHeader();
			ContentMgr.hideAppFooter();


			if ($location.absUrl().indexOf('127.0.0.1') >= 0 || $location.absUrl().indexOf('localhost') >= 0) {
				//in local development environment (i.e. grunt serve)
				environment = 'dev';
				apiUrl = '/settings/themeSettings.json';
				$scope.debug = true;
			} else {
				//in production
				environment = 'prod';
				var queryString = $location.search();
				apiUrl = '/api/v1/themes/' + queryString.themeName + '/versions/' + queryString.themeVersion + '/settings';
			}
			$http.get(apiUrl)
			.success(function(data) {
					if (environment === 'dev') {
						$scope.settings = data;
					} else {
						$scope.settings = data.data; //API in production has a "data{}" wrapper
					}
				});

			//add slide
			$scope.addSlide = function() {
				$scope.settings.pages.home.slider.slides.push({
					headline: '',
					subHeadline: '',
					imageUrl: '',
					linksTo: ''
				});
			};

			//handle save button
			$scope.save = function () {
					if (environment === 'dev') {
						//don't save it since we don't have a way to override the themeSettings.json
						console.log('would be saved if you were in production');
						window.alert('would be saved if you were in production, but since you\'re not:=, simply copy the debug output to your themeSettings.json file manually.');
					} else {
						//use the Volusion API to overwrite themeSettings.json
						$http.put(apiUrl, $scope.settings)
						.success(function () {
								console.log('successfully saved');
							});
					}
				};

			// Update the ui and show header / footer when this controller is destroyed
			$scope.$on('$destroy', function cleanUp() {
				ContentMgr.showAppHeader();
				ContentMgr.showAppFooter();
			});

		}]);
