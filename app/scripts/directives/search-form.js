'use strict';

/**
 * @ngdoc directive
 * @name volusionMethodThemeApp.directive:searchForm
 * @description
 * # searchForm
 */
angular.module('methodApp')
	.directive('searchForm', function () {
		return {
			templateUrl: 'views/partials/search-form.html',
			restrict   : 'AE',
			link       : function postLink(scope, element) {
				element.bind('click', function () {
					element.find('input').focus();
				});
			}
		};
	});
