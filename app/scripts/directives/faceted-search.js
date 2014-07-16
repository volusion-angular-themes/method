'use strict';

/**
 * @ngdoc directive
 * @name volusionMethodThemeApp.directive:facetedSearch
 * @description
 * # facetedSearch
 */
angular.module('methodApp')
	.directive('facetedSearch', function () {
		return {
			templateUrl: 'views/partials/faceted-search.html',
			restrict   : 'AE',
			scope      : {
				categories: '=',
				facets    : '='
			},
//      link: function postLink(scope, element, attrs) {
			link       : function postLink() {
//        element.text('this is the facetedSearch directive');
			}
		};
	});
