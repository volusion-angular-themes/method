/* exported VnAppRouteProvider */

angular.module('Volusion.templates', []);
angular.module('Volusion.directives', ['Volusion.templates']);
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
	'textAngular',

	// Volusion modules
	'config',
	'seo',
	//'services.config', // Todo: Refactor this
	'angulartics',

	'Volusion.toolboxCommon',
	'Volusion.controllers',
	'Volusion.decorators',
	'Volusion.directives',
	'Volusion.filters',
	'Volusion.services'
	//'Volusion.google.tagmanager' //TODO fix Volusion.google.tagmanager
])
	.config(['$routeProvider', '$locationProvider', 'translateProvider', 'AppConfigProvider',
		function ($routeProvider, $locationProvider, translateProvider, AppConfigProvider) {

			'use strict';

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
							translate.addParts('home');
							translate.addParts('product');
							return;
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
					controller : 'CategoryCtrl',
					reloadOnSearch: false,
					resolve: {
						route: ['vnAppRoute', '$route', function(vnAppRoute, $route){
							return vnAppRoute.updateRoute($route.current.params);
						}]
					}
				})
				.when('/search', {
					templateUrl: 'views/search.html',
					controller: 'SearchCtrl',
					resolve: {
						route: ['vnAppRoute', '$route', function(vnAppRoute, $route){
							return vnAppRoute.updateRoute($route.current.params);
						}]
					}
				})
				.when('/theme-settings', {
					templateUrl: 'views/theme-settings.html',
					controller: 'ThemeSettingsCtrl'
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
	.run(['snapRemote', '$rootScope', '$window', 'cacheBustFilter', 'SiteConfig', 'themeSettings', 'Cart', 'ContentMgr',
		function (snapRemote, $rootScope, $window, cacheBustFilter, SiteConfig, themeSettings, Cart, ContentMgr) {

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

			// Watch the snap menu state and update as needed
			$rootScope.$watch(
				// Use a fn in $watch first argument that gets value from service
				function () {
					return ContentMgr.getSnapMenuState();
				},
				// Use second fn to update the controller menu state when changed.
				function (state) {
					$rootScope.snapMenuState = state;
				},true);

			$rootScope.$on('$routeChangeSuccess', function () {
				snapRemote.close();
			});

			$rootScope.$on('$routeChangeError', function (event, toState, toParams, fromState, fromParams, error) {
				event.preventDefault();
				if (error.status === 404) {
					$window.location.replace('/404.html');
				}
			});

			// TODO: This should be in a controller ...  $rootScope is not the place for that
			$rootScope.overridesCSS = cacheBustFilter('/styles/overrides.css');

			// Init services
			// one time initialization for services
			Cart.init();
		}]);
