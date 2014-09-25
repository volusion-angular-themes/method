/**
 * @ngdoc filter
 * @name volusionMethodThemeApp.filter:currency
 * @function
 * @description
 * # currency
 * Filter in the volusionMethodThemeApp.
 */

angular.module('Volusion.controllers')
	.filter('vnCurrency', ['$filter', '$locale', '$translate', function ($filter, $locale, $translate) {

		'use strict';

		return function (amount, currencySymbol) {
			var currency = $filter('currency');

			if (amount === 0) {
				return 'Free';
			}

			if ($locale.id === 'en-us' && amount < 0) {
				return currency(amount, currencySymbol).replace('(', '-').replace(')', '');
			}

			return currency(amount, currencySymbol);
		};
	}]);
