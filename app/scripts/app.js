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

  .config(['translateProvider', 'vnAppConfigProvider', 'ENV', '$stateProvider',
	  function (translateProvider, vnAppConfigProvider, ENV, $stateProvider) {

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

		  $stateProvider
			  /* Sample custom route
			  .state('about', {
			   	  parent: 'root',
				  url: '/about',
				  template: '<div class="container"><h1>About</h1></div>'
			  })*/
			  .state('article', { // Articles must be last or the prior /search and /theme-settings will never be picked up
				  parent: 'root',
				  url: '/:slug',
				  templateUrl: 'views/article.html',
				  controller: 'PageCtrl',
				  resolve: {
					  article: ['vnApi', '$stateParams', function (vnApi, $stateParams) {
						  return vnApi.Article().get({slug: $stateParams.slug}).$promise;
					  }]
				  }
			  });
	}])

.run(['snapRemote', '$rootScope', '$window', 'themeSettings', 'vnCart', 'translate', 'vnModalService',
	function (snapRemote, $rootScope, $window, themeSettings, vnCart, translate, vnModalService) {

		'use strict';

		$rootScope.defaultProductImage = '/images/theme/tcp-no-image.jpg';

		vnCart.init();

		translate.addParts('message');

		$rootScope.$on('$stateChangeStart', function () {
			$window.scrollTo(0, 0);
			snapRemote.close();
			if($rootScope.isCartOpen){
				$rootScope.closeCart();
			}
		});

		$rootScope.$on('VN_HTTP_500_ERROR', function () {
			vnModalService.showError('views/server-error.html');
		});
}]);
