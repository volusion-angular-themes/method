'use strict';

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

        // Volusion Modules
        'snap',
        'seo',
        'services.config', // Todo: Refactor this
        'angulartics',

        // Volusion modules
        'Volusion.toolboxCommon',
        'Volusion.controllers',
        'Volusion.decorators',
        'Volusion.directives',
        'Volusion.filters',
        'Volusion.services',
        'Volusion.google.tagmanager'
    ])
    .config(function ($routeProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller : 'MainCtrl'
            })
            .when('/:productTitle/p/:productCode', {
                temnplateUrl: 'views/product.html',
                controller: 'ProductCtrl'
            })
            .when('/:categoryName/c/:categoryId', {
                templateUrl: 'views/category.html',
                controller: 'CategoryCtrl'
            })
            .when('/style-guide', {
                templateUrl: 'views/style-guide.html',
                controller: 'PageCtrl'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'PageCtrl'
            })
            .when('/contact', {
                templateUrl: 'views/contact.html',
                controller: 'PageCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
