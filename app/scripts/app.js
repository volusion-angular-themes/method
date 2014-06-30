/*global angular, enquire, location, console */

angular.module('Volusion.directives', []);
angular.module('Volusion.filters', []);
angular.module('Volusion.services', []);
angular.module('Volusion.decorators', []);
angular.module('Volusion.controllers', []);

angular.module('methodApp', [
	'ngAnimate',
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ngRoute',
	'ngTouch',

	// Third party modules
	'ui.bootstrap',
	'pascalprecht.translate',
	'snap',

	// Volusion modules
	'seo',
	//'services.config', // Todo: Refactor this
	'angulartics',

	'Volusion.toolboxCommon',
	'Volusion.controllers',
	'Volusion.decorators',
	'Volusion.directives',
	'Volusion.filters',
	'Volusion.services'
//        'Volusion.google.tagmanager' //TODO fix Volusion.google.tagmanager
])
	.config(['$routeProvider', '$locationProvider', 'translateProvider', 'AppConfigProvider',
		function ($routeProvider, $locationProvider, translateProvider, AppConfigProvider) {

			'use strict';

//            console.log($route);
			console.log(AppConfigProvider);

			if (location.hostname === 'localhost') {
				AppConfigProvider.setApiPath('http://www.samplestore.io/api/v1');
				AppConfigProvider.setIsLocalEnv(true);
			} else {
				AppConfigProvider.setApiPath('/api/v1');
				AppConfigProvider.setIsLocalEnv(false);
			}

			$locationProvider.html5Mode(true);

			var translateOptions = {
				urlPrefix          : AppConfigProvider.getPrefix(),
				region             : AppConfigProvider.getRegion(),
				lang               : AppConfigProvider.getLang(),
				country            : AppConfigProvider.getCountry(),
				disableTranslations: AppConfigProvider.getTranslations()
			};

			translateProvider.configure(translateOptions);

			$routeProvider
				.when('/', {
					templateUrl: 'views/home.html',
					controller : 'HomeCtrl',
					resolve    : {
						translations: ['translate', function (translate) {
							return translate.addParts('home');
						}]
					}
				})

				// Second pass at routes
				.when('/p/:slug', {
					templateUrl: 'views/product.html',
					controller : 'ProductCtrl',
					resolve    : {
						translations: ['translate', function (translate) {
							return translate.addParts('product');
						}]
					}
				})
				.when('/c/:slug', {
					templateUrl: 'views/category.html',
					controller : 'CategoryCtrl'
				})
				.when('/:slug', {
					templateUrl: 'views/article.html',
					controller : 'ArticleCtrl'
				})
				.otherwise({
					redirectTo: '/'
				});
		}])
	.run(['snapRemote', '$rootScope', '$window', 'themeSettings', 'Cart',
		function (snapRemote, $rootScope, $window, themeSettings, Cart) {

			'use strict';

			$rootScope.isInDesktopMode = true;

			enquire.register('screen and (max-width: 991px)', {
				// transitioning to desktop mode
				unmatch: function () {
					snapRemote.close();
					$rootScope.isInDesktopMode = true;
				},
				// transitioning to mobile mode
				match  : function () {
					$rootScope.isInDesktopMode = false;
				}
			});

			$rootScope.$on('$routeChangeSuccess', function () {
				snapRemote.close();
			});

			/*jslint unparam: true*/
			$rootScope.$on('$routeChangeError', function (event, toState, toParams, fromState, fromParams, error) {
				event.preventDefault();
				if (error.status === 404) {
					$window.location.replace('/404.html');
				}
			});
			/*jslint unparam: false*/

			// Init services
			// one time initialization for services
			themeSettings.init();
			Cart.init();

		}]);
