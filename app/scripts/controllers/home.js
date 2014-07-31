angular.module('Volusion.controllers')
	.controller('HomeCtrl', ['$scope', 'vnApi',
		function($scope, vnApi) {

			'use strict';

			vnApi.Product().get({ filter: 'featured', pageSize: 4 }).$promise
				.then(function(response) {
					$scope.featuredProducts = response.data;
				});

		}
	]);
