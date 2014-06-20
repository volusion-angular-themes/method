'use strict';

angular.module('volusion.controllers').controller('HomeCtrl', [
  '$scope',
  '$rootScope',
  'api',
  '$http',
  'cacheBustFilter',
  function (
    $scope,
    $rootScope,
    api,
    $http,
    cacheBustFilter) {

    $http.get(cacheBustFilter('/settings/themeSettings.json'))
    .success(function (data) {
      console.log('themeSettings: ', data);
      $rootScope.themeSettings = data;

      $scope.slider = {
        interval: $rootScope.themeSettings.slider.interval,
        slides: $rootScope.themeSettings.slider.slides
      };

      $scope.tiles = {
        tile1: {
          imageUrl: $rootScope.themeSettings.tiles.tile1.imageUrl,
          linkTo: $rootScope.themeSettings.tiles.tile1.linkTo
        },
        tile2: {
          imageUrl: $rootScope.themeSettings.tiles.tile2.imageUrl,
          linkTo: $rootScope.themeSettings.tiles.tile2.linkTo
        },
        tile3: {
          imageUrl: $rootScope.themeSettings.tiles.tile3.imageUrl,
          linkTo: $rootScope.themeSettings.tiles.tile3.linkTo
        },
        tile4: {
          imageUrl: $rootScope.themeSettings.tiles.tile4.imageUrl,
          linkTo: $rootScope.themeSettings.tiles.tile4.linkTo
        },
        tile5: {
          imageUrl: $rootScope.themeSettings.tiles.tile5.imageUrl,
          linkTo: $rootScope.themeSettings.tiles.tile5.linkTo
        },
        tile6: {
          imageUrl: $rootScope.themeSettings.tiles.tile6.imageUrl,
          linkTo: $rootScope.themeSettings.tiles.tile6.linkTo
        }
      };
    });

    // Featured Products
    api.products.get({ filter: 'featured', pageSize: 4 }).then(function (response) {
      $scope.featuredProducts = response.data;
    });
  }
]);
