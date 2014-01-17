'use strict';

angular.module('volusionApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {

      $locationProvider.html5Mode(true);

      $routeProvider
        .when('/', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    }
  ]);
