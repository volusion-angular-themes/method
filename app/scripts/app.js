'use strict';

angular.module('volusionApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'seo'
  ])
  .config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {

      $locationProvider.html5Mode(true);

      $routeProvider
        .when('/', {
          templateUrl: 'views/home.html',
          controller: 'HomeCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    }
  ]);
