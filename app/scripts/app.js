/* exported VnAppRouteProvider */

angular.module('Volusion.templates', []);
angular.module('Volusion.services', []);
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
	'textAngular',

	// Volusion modules
	'config',
	'seo',
	//'services.config', // Todo: Refactor this
	'angulartics',

	'Volusion.toolboxCommon',
	'Volusion.controllers',
	'Volusion.services'
])
	.config(['$routeProvider', '$locationProvider', 'translateProvider', 'vnAppConfigProvider', 'vnDataEndpointProvider', 'ENV',
		function ($routeProvider, $locationProvider, translateProvider, vnAppConfigProvider, vnDataEndpointProvider, ENV) {

			'use strict';

			$locationProvider.html5Mode(true);

            vnAppConfigProvider.setApiPath(ENV.host, ENV.apiEndpoint);
            vnDataEndpointProvider.setApiUrl(vnAppConfigProvider.getApiPath());

			var translateOptions = {
				urlPrefix          : vnAppConfigProvider.getPrefix(),
				region             : vnAppConfigProvider.getRegion(),
				lang               : vnAppConfigProvider.getLang(),
				country            : vnAppConfigProvider.getCountry(),
				disableTranslations: vnAppConfigProvider.getTranslations()
			};

			translateProvider.configure(translateOptions);

			$routeProvider
				.when('/', {
					templateUrl: 'views/home.html',
					controller : 'HomeCtrl',
					resolve    : {
						translations: ['translate', function (translate) {
							translate.addParts('home');
							translate.addParts('product');
						}]
					}
				})
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
					templateUrl   : 'views/category.html',
					controller    : 'CategoryCtrl',
					reloadOnSearch: false,
					resolve       : {
						params: ['vnAppRoute', '$location', function (vnAppRoute, $location) {
							return vnAppRoute.resolveParams($location.search());
						}]
					}
				})
				.when('/search', {
					templateUrl   : 'views/search.html',
					controller    : 'SearchCtrl',
					reloadOnSearch: false,
					resolve       : {
						params: ['vnAppRoute', '$location', function (vnAppRoute, $location) {
							return vnAppRoute.resolveParams($location.search());
						}]
					}
				})
				.when('/all-products', {
					templateUrl   : 'views/search.html',
					controller    : 'SearchCtrl',
					reloadOnSearch: false,
					resolve       : {
						params: ['vnAppRoute', '$location', function (vnAppRoute, $location) {
							return vnAppRoute.resolveParams($location.search());
						}]
					}
				})
				.when('/theme-settings', {
					templateUrl: 'views/theme-settings.html',
					controller : 'ThemeSettingsCtrl'
				})
				// Articles must be last or the prior /search and /theme-settings will never be picked up
				.when('/:slug', {
					templateUrl: 'views/article.html',
					controller : 'ArticleCtrl'
				})
				.otherwise({
					redirectTo: '/'
				});
		}])
	.run(['snapRemote', '$rootScope', '$window', 'vnCacheBustFilter', 'themeSettings', 'vnCart', 'ContentMgr', 'translate', 'vnErrorModalService',
		function (snapRemote, $rootScope, $window, vnCacheBustFilter, themeSettings, vnCart, ContentMgr, translate, vnErrorModalService) {

			'use strict';

			$rootScope.isInDesktopMode = true;

			$rootScope.overridesCSS = vnCacheBustFilter('/styles/overrides.css');

			vnCart.init();

			translate.addParts('message');

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

			$rootScope.$on('$routeChangeError', function (event, toState, toParams, fromState, fromParams, error) {
				event.preventDefault();
				if (error.status === 404) {
					$window.location.replace('/404.html');
				}
			});

			$rootScope.$on('$routeChangeSuccess', function () {
				snapRemote.close();
			});

            $rootScope.$on('VN_HTTP_500_ERROR', function() {
                vnErrorModalService.showError('views/server-error.html');
            });

			$rootScope.$watch(
				// Use a fn in $watch first argument that gets value from service
				function () {
					return ContentMgr.getSnapMenuState();
				},
				// Use second fn to update the controller menu state when changed.
				function (state) {
					$rootScope.snapMenuState = state;
				}, true);
		}]);
