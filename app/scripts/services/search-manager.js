'use strict';

/**
 * @ngdoc service
 * @name volusionMethodThemeApp.searchManager
 * @description
 * # searchManager
 * Factory in the volusionMethodThemeApp.
 */
angular.module('methodApp')
	.factory('searchManager', ['$route', '$location', 'vnProductParams', function ($route, $location, vnProductParams) {

		function updateSearch(terms) {
			vnProductParams.updateSearch(terms);
			$location.search('q', terms);
			if ('/search' !== $location.path()) {
				$location.path('/search');
			}
			$route.reload();
		}

		return {
			updateSearch: updateSearch
		};
	}]);
