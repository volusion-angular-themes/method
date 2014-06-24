'use strict';

angular.module('volusion.controllers').controller('ArticleCtrl', [
  '$rootScope',
  '$scope',
  'article',
  function(
    $rootScope,
    $scope,
    article
  ) {
    $scope.article = article.data;
    $rootScope.seo = angular.extend($rootScope.seo || {}, $scope.article.seo);
  }
]);
