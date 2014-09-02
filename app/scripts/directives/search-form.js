angular.module('methodApp')
	.directive('searchForm', function () {

		'use strict';

		return {
			templateUrl: 'views/partials/search-form.html',
			restrict   : 'AE',
			replace    : true,
			link       : function postLink(scope, element) {
				element.bind('click', function () {
					element.find('input').focus();
				});
			}
		};
	});
