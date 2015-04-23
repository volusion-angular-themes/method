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

  .config(['translateProvider', 'vnAppConfigProvider', 'ENV',
	  function (translateProvider, vnAppConfigProvider, ENV) {

		  'use strict';

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

.run(['snapRemote', '$rootScope', '$window', 'themeSettings', 'vnCart', 'translate', 'vnModalService', 'vnDevice',
	function (snapRemote, $rootScope, $window, themeSettings, vnCart, translate, vnModalService, vnDevice) {

		'use strict';

		$rootScope.defaultProductImage = '/images/theme/tcp-no-image.jpg';

		vnCart.init();

		translate.addParts('message');

		vnDevice.init({
			breakpoints: {
				phone: 768,
				tablet: 991
			},
			listeners: {
				location: false,
				orientation: true,
				network: false,
				resize: false
			}
		});

		$rootScope.$on('$stateChangeStart', function (event, toState) {

			if($rootScope.isCartOpen){
				$rootScope.closeCart();
				if(toState.name !== 'checkout'){
					event.preventDefault();
				}
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
