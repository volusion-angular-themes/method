/**
 * @ngdoc directive
 * @name methodApp.directive:showOnHover
 * @description
 * # showOnHover
 */

angular.module('Volusion.directives')
	.directive('showOnDropdownHover', ['$timeout',
		function ($timeout) {

			'use strict';

			return {
				restrict: 'A',
				link    : function postLink(scope, element) {

					var timerHide;

					element.parent().find('a').bind('mouseenter', function() {
						element.show();
					});

					element.parent().find('a').bind('mouseleave', function() {
						timerHide = $timeout(function () {
							element.hide();
						}, 500);
					});

					element.parent().find('a').bind('click', function() {
						element.show();
					});

					element.bind('mouseenter', function() {
						element.show();
						$timeout.cancel( timerHide );
					});

					element.bind('mouseleave', function() {
						element.hide();
					});

					/* jshint unused:false */
					scope.$on('$destroy',
						function( event ) {

							$timeout.cancel( timerHide );

						}
					);
					/* jshint unused:true */
				}
			};
		}]);
