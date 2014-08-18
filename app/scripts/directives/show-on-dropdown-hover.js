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
//				scope   : {},
				link    : function postLink(scope, element) {

					var timerHide,
						triggerHover = angular.element(element.parent().parent().find('a')[0]);  // target category anchor (first <a> in <li>)

					triggerHover.bind('mouseenter', function() {
							element.show();
							$timeout.cancel( timerHide );
						})
						.bind('mouseleave', function() {
							timerHide = $timeout(function () {
								element.hide();
							}, 100);
						})
						.bind('click', function() {
							element.show();
						});

					element.bind('mouseenter', function() {
							element.show();
							$timeout.cancel( timerHide );
						})
						.bind('mouseleave', function() {
							timerHide = $timeout(function () {
								element.hide();
							}, 100);
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
