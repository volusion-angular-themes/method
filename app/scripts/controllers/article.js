/**
 * @ngdoc function
 * @name methodApp.controller:ArticleCtrl
 * @description
 * # ArticleCtrl
 * Controller of the methodApp
 */

angular.module('Volusion.controllers')
	.controller('ArticleCtrl', [
		'$rootScope', '$scope', '$routeParams', 'vnApi',
		function($rootScope, $scope, $routeParams, vnApi) {

			'use strict';

			//TODO: unknown slug will return 404 ... need to figure out how to deal with it
			//vnApi.Article().get({ slug: $routeParams.slug }).$promise
			vnApi.Article().get({ slug: 'how-do-i-return-an-item' }).$promise
				.then(function(response) {
					$scope.article = response.data;
					$rootScope.seo = angular.extend($rootScope.seo || {}, $scope.article.seo);
				});
		}
	]);
