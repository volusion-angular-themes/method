/**
 * @ngdoc directive
 * @name volusionMethodThemeApp.directive:paginator
 * @description
 * # paginator
 */

angular.module('Volusion.directives')
	.directive('vnPaginator', ['vnProductParams', 'themeSettings', function (vnProductParams, themeSettings) {

		'use strict';

		return {
			templateUrl: 'views/partials/paginator.html',
			restrict   : 'A',
			scope      : {
				cursor     : '=',
				queryFn    : '&'
			},
			link       : function postLink(scope, elem, attrs) {

				vnProductParams.setPageSize(themeSettings.getPageSize());

				scope.prevPage = function () {
					if (scope.cursor.currentPage > 1) {
						vnProductParams.previousPage();
						scope.queryFn();
					}
				};

				scope.nextPage = function () {
					if (scope.cursor.currentPage < scope.cursor.totalPages) {
						vnProductParams.nextPage();
						scope.queryFn();
					}
				};

				scope.$watch(attrs.cursor, function (value) {

					if (value === undefined) {
						return;
					}

					scope.currentPage = value.currentPage;
					vnProductParams.setPage(scope.currentPage);
				}, true);
			}
		};
	}]);
