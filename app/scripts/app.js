/* exported VnAppRouteProvider */

angular.module('Volusion.templates', []);
angular.module('Volusion.services', []);
angular.module('Volusion.controllers', []);

angular.module('methodApp', [
	'ngAnimate',
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ngTouch',

	// Third party modules
	'ui.bootstrap',
	'pascalprecht.translate',
	'snap',
	'textAngular',
	'ui.router',
	'ngRoute',

	// Volusion modules
	'config',
	'seo',
	'angulartics',
	'Volusion.toolboxCommon',
	'Volusion.controllers',
	'Volusion.services',
	'Volusion.templates'
])

  .config(['$locationProvider', 'translateProvider', 'vnAppConfigProvider', 'ENV',
	  function ($locationProvider, translateProvider, vnAppConfigProvider, ENV) {

		  'use strict';

		  $locationProvider.html5Mode(true);

		  vnAppConfigProvider.setApiPath(ENV.host, ENV.apiEndpoint);

		  var translateOptions = {
			  urlPrefix          : vnAppConfigProvider.getPrefix(),
			  region             : vnAppConfigProvider.getRegion(),
			  lang               : vnAppConfigProvider.getLang(),
			  country            : vnAppConfigProvider.getCountry(),
			  disableTranslations: vnAppConfigProvider.getTranslations()
		  };

		  translateProvider.configure(translateOptions);

	}])

.run(['snapRemote', '$rootScope', '$window', 'themeSettings', 'vnCart', 'translate', 'vnModalService', 'vnViewPortWatch',
	function (snapRemote, $rootScope, $window, themeSettings, vnCart, translate, vnModalService, vnViewPortWatch) {

		'use strict';

		$rootScope.defaultProductImage = '/images/theme/tcp-no-image.jpg';

		vnCart.init();

		translate.addParts('message');

		vnViewPortWatch.setBreakpoints([{
			name      : 'Non-Desktop',
			mediaQuery: 'screen and (max-width: 991px)',
			onMatch   : function () {
				$rootScope.isInDesktopMode = false;
				$rootScope.$emit('enterNonDesktop');
			},
			onUnmatch : function () {
				snapRemote.close();
				$rootScope.isInDesktopMode = true;
				$rootScope.$emit('exitNonDesktop');
			}
		}]);

		$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {

			if($rootScope.isCartOpen){
				$rootScope.closeCart();
				event.preventDefault();
			}
			else{
				$window.scrollTo(0, 0);
				snapRemote.close();
			}

		});

		$rootScope.$on('$stateChangeSuccess', function (event, toState) {
			$rootScope.currentState = toState.name;
		});

		$rootScope.$on('VN_HTTP_500_ERROR', function () {
			vnModalService.showError('views/server-error.html');
		});
}]);
