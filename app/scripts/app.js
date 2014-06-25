/*global angular, enquire */

// TODO move the dependency's injected to the place it is needed/used
angular.module('Volusion.directives', []);
angular.module('Volusion.filters', []);
angular.module('Volusion.services', []);
angular.module('Volusion.decorators', []);
angular.module('Volusion.controllers', []);

angular.module('methodApp', [
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
    .config(['$routeProvider', '$locationProvider', 'translateProvider',
        function ($routeProvider, $locationProvider, translateProvider) {

            'use strict';

//            console.log($route);
//            console.log(config);

            $locationProvider.html5Mode(true);

            var translateOptions = {
//                urlPrefix          : env.URL_PREFIX || '',
//                region             : env.REGION,
//                lang               : env.LANG,
//                country            : env.COUNTRY,
//                disableTranslations: env.DISABLE_TRANSLATIONS
            };

            translateProvider.configure(translateOptions);

            $routeProvider
                .when('/', {
                    templateUrl: 'views/main.html',
                    controller : 'MainCtrl',
                    resolve    : {
                        translations: ['translate', function (translate) {
                            return translate.addParts('main');
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
    .run(['snapRemote', '$rootScope', '$window', 'themeSettings',
        function (snapRemote, $rootScope, $window, themeSettings) {

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

            $rootScope.$on('$routeChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                event.preventDefault();
                if (error.status === 404) {
                    $window.location.replace('/404.html');
                }
            });

            // Init services
            themeSettings.init();

        }]);
