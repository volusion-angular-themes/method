'use strict';

module.exports = [
  '$scope',
  'api',

  function (
    $scope,
    api) {

    //TODO: Implement "Add to Cart" button on Featured Products below

    // TODO: REPLACE SLIDER WITH COMPONENT DATA
    $scope.interval = 4000;
    $scope.slider = [
      { imageUrl: 'http://www.volusioninnovationlab.com/snippets/images/slide1.jpg', headline: 'New Year Saleathon', subHeadline: 'Save 20% off storewide with coupon code NEWYEAR', linksTo: 'product1/p/123', htmlContent: '<a href=\"http:\/\/www.google.com\/\">Click here<\/a>' },
      { imageUrl: 'http://www.volusioninnovationlab.com/snippets/images/slide2.jpg', headline: 'New Sunrise Collection', subHeadline: 'Wake up to something good', linksTo: 'category1/c/123' },
      { imageUrl: 'http://www.volusioninnovationlab.com/snippets/images/slide3.jpg', headline: 'Miami Fashion', subHeadline: null, linksTo: 'product2/p/2' }
    ];

    // TODO: REPLACE FEATURED HOME ITEMS WITH THEME PAGE SETTINGS

    // Featured Products
    api.products.get({ filter: 'featured', pageSize: 4}).then(function (response) {
      $scope.featuredProducts = response.data;
    });
  }
];
