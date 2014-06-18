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
    .success(function(data) {
        console.log('themeSettings: ', data);
        $rootScope.themeSettings = data;

        // TODO: REPLACE SLIDER WITH COMPONENT DATA
        $scope.interval = 4000;
        $scope.slider = $rootScope.themeSettings.slider.slides;

      });

    // TODO: REPLACE FEATURED HOME ITEMS WITH THEME PAGE SETTINGS
    $scope.featuredHomeItems = {
      tile1: {
        linkTo: 'Board-Shorts/p/MW-BShorts'
      },
      tile2: {
        linkTo: 'Men/c/1816'
      },
      tile3: {
        linkTo: 'Peasant-Blouse/p/WT-Peasant'
      },
      tile4: {
        linkTo: 'Women/c/1815'
      },
      tile5: {
        linkTo: 'Furniture/c/1516'
      }
    };

    // Featured Products
    api.products.get({ filter: 'featured', pageSize: 4}).then(function (response) {
      $scope.featuredProducts = response.data;
    });
  }
]);
