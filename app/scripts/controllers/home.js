'use strict';

module.exports = [
  '$scope',
  'api',

  function (
    $scope,
    api) {

    // TODO: Replace this with theme settings
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

    // TODO: REPLACE SLIDER WITH COMPONENT DATA
    $scope.interval = 4000;
    $scope.slider = [
      { imageUrl: 'http://design16.volusion.com/v/theme-engine/method/slide1.jpg', headline: 'New Year Saleathon', subHeadline: 'Save 20% off storewide with coupon code NEWYEAR', linksTo: 'Board-Shorts/p/MW-BShorts', htmlContent: '<a href=\"http:\/\/www.google.com\/\">Click here<\/a>' },
      { imageUrl: 'http://design16.volusion.com/v/theme-engine/method/slide2.jpg', headline: 'New Sunrise Collection', subHeadline: 'Wake up to something good', linksTo: 'Patent-Dress-Shoe/p/ms-patent%20leather%20shoe' },
      { imageUrl: 'http://design16.volusion.com/v/theme-engine/method/slide3.jpg', headline: 'Miami Fashion', subHeadline: null, linksTo: 'Peasant-Blouse/p/WT-Peasant' },
      { imageUrl: 'http://design16.volusion.com/v/theme-engine/method/slide4.jpg', headline: 'Miami Fashion', subHeadline: null, linksTo: 'Snake-Skin-Purse/p/WA-SSPurse' }
    ];

    // TODO: REPLACE FEATURED HOME ITEMS WITH THEME PAGE SETTINGS

    // Featured Products
    api.products.get({ filter: 'featured', pageSize: 4}).then(function (response) {
      $scope.featuredProducts = response.data;
    });
  }
];
