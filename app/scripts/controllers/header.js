/**
 * @ngdoc function
 * @name methodApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the methodApp
 */

angular.module('Volusion.controllers')
	.controller('HeaderCtrl', ['$rootScope', '$scope', '$window', '$timeout', '$filter', 'translate', 'Cart', 'vnApi', 'ContentMgr',
		function ($rootScope, $scope, $window, $timeout, $filter, translate, Cart, vnApi, ContentMgr) {

			'use strict';

			$scope.$watch(
				function () {
					return ContentMgr.getHeaderState();
				},
				function (state) {
					$scope.headerState = state;
				}, true);
		}]);
