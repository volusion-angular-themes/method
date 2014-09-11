angular.module('Volusion.controllers')
	.controller('ArticleCtrl', [
		'$rootScope', '$scope', '$routeParams', 'vnApi',
		function ($rootScope, $scope, $routeParams, vnApi) {

			'use strict';

			vnApi.Article().get({ slug: 'how-do-i-return-an-item' }).$promise
				.then(function (response) {
					$scope.article = response.data;
					$rootScope.seo = angular.extend($rootScope.seo || {}, $scope.article.seo);
				});
		}
	]);
