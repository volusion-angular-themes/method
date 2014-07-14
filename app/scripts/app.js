'use strict';

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
	//'Volusion.google.tagmanager' //TODO fix Volusion.google.tagmanager
])
	.config(['$routeProvider', '$locationProvider', 'translateProvider', 'AppConfigProvider',
		function ($routeProvider, $locationProvider, translateProvider, AppConfigProvider) {

			//console.log($route);
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
.when('/search', {
  templateUrl: 'views/search.html',
  controller: 'SearchCtrl'
})
				.otherwise({
					redirectTo: '/'
				});
		}])
	.run(['snapRemote', '$rootScope', '$window', 'cacheBustFilter', 'SiteConfig', 'themeSettings', 'Cart',
		function (snapRemote, $rootScope, $window, cacheBustFilter, SiteConfig, themeSettings, Cart) {

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

			// TODO: This should be in a controller ...  $rootScope is not the place for that
			$rootScope.overridesCSS = cacheBustFilter('/styles/overrides.css');

			// Init services
			// one time initialization for services
			SiteConfig.init();
			themeSettings.init();
			Cart.init();

		}]);
