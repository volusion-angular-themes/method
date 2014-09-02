angular.module('Volusion.filters')
	.filter('html', [
		'$sce',
		function ($sce) {

			'use strict';

			return function (content) {
				return $sce.trustAsHtml(content);
			};
		}
	]);
