/**
 * @ngdoc directive
 * @name volusionMethodThemeApp.directive:autoGrow
 * @description
 * # autoGrow
 */

angular.module('Volusion.controllers')
	.directive('autoGrow', function () {

		'use strict';

		return function (scope, element, attr) {

			attr.$set('ngTrim', 'false');

			var update = function(){
				element.css('height', 'auto');
				element.css('height', element[0].scrollHeight + 'px');
			};

			scope.$watch(attr.ngModel, function(){
				update();
			});

			element.bind('keydown', update);
		};
	});
