'use strict';

///**
// * @ngdoc service
// * @name methodApp.starage
// * @description
// * # starage
// * Factory in the methodApp.
// */
//angular.module('methodApp')
//  .factory('storage', function () {
//    // Service logic
//    // ...
//
//    var meaningOfLife = 42;
//
//    // Public API here
//    return {
//      someMethod: function () {
//        return meaningOfLife;
//      }
//    };
//  });

angular.module('Volusion.services')
	.factory('storage', [
		'$window', '$cookieStore',
		function($window, $cookieStore) {

			function createLocalStorageAdapter() {
				return {
					get: function(key) {
						var value = $window.localStorage.getItem(key);
						if (value === null) {
							return resolveCookieValue(key);
						}
						return value;
					},
					set: function(key, value) {
						return $window.localStorage.setItem(key, value);
					},
					remove: function(key) {
						return $window.localStorage.removeItem(key);
					}
				};
			}

			function resolveCookieValue(key) {
				var value = $cookieStore.get(key);
				return (typeof value === 'undefined') ? null : value;
			}

			function createCookieStorageFacade() {
				return {
					get: function(key) {
						return resolveCookieValue(key);
					},
					set: function(key, value) {
						return $cookieStore.put(key, value);
					},
					remove: function(key) {
						return $cookieStore.remove(key);
					}
				};
			}

			if ('localStorage' in $window && $window.localStorage !== null) {
				return createLocalStorageAdapter();
			} else {
				return createCookieStorageFacade();
			}

		}
	]);
