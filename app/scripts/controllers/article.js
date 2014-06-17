'use strict';

angular.module('volusion.controllers').controller('ArticleCtrl', [
  '$rootScope',
  '$scope',
  'article',
  '$templateCache',
  function(
    $rootScope,
    $scope,
    article,
    $templateCache
  ) {
    article = $scope.article = article.data;
    $rootScope.seo = angular.extend($rootScope.seo || {}, article.seo);
    $templateCache.put('article', article.body);
    $scope.templateUrl = 'article';
  }
]);
