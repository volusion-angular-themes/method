angular.module('Volusion.directives')
	.directive('showOnDropdownHover', ['$timeout',
		function ($timeout) {

			'use strict';

			return {
				restrict: 'A',
				link    : function postLink(scope, element) {

					var timerHide,
						triggerHover = angular.element(element.parent().find('a')[0]);

					element.bind('mouseenter', function () {
						element.show();
						$timeout.cancel(timerHide);
					})
						.bind('mouseleave', function () {
							timerHide = $timeout(function () {
								element.hide();
							}, 100);
						});

					triggerHover.bind('mouseenter', function () {
						element.show();
						$timeout.cancel(timerHide);
					})
						.bind('mouseleave', function () {
							timerHide = $timeout(function () {
								element.hide();
							}, 100);
						})
						.bind('click', function () {
							element.show();
						});

					/* jshint unused:false */
					scope.$on('$destroy',
						function (event) {
							$timeout.cancel(timerHide);
						}
					);
					/* jshint unused:true */
				}
			};
		}]);
