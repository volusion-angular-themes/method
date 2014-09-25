angular.module('Volusion.controllers')
	.controller('ArticleCtrl', [
		'$rootScope', '$scope', 'article',
		function ($rootScope, $scope,  article) {
			'use strict';

            $scope.article = article.data;
            $rootScope.seo = angular.extend($rootScope.seo || {}, $scope.article.seo);
		}
	]);
