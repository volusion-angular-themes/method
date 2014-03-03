'use strict';

module.exports = [
  '$scope',
  '$translatePartialLoader',

  function($scope, $translatePartialLoader) {
    $translatePartialLoader.addPart('product');

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.product = {
      'name': 'Method Limited Edition Screen Printed Tee',
      'price': 36.00,
      'msrp': 48.00,
      'avgReview': 4,
      'mainImageUrl': '/images/demo/product-main.jpg',
      'images': [
        {'thumbnailUrl': '/images/demo/product-main.jpg'},
        {'thumbnailUrl': '/images/demo/product-main.jpg'},
        {'thumbnailUrl': '/images/demo/product-main.jpg'},
        {'thumbnailUrl': '/images/demo/product-main.jpg'},
        {'thumbnailUrl': '/images/demo/product-main.jpg'}
      ],
      'options': [
        {
          'label': 'choose a size',
          'choices': [
            {
              'id': 1,
              'label': 'Small'
            },
            {
              'id': 2,
              'label': 'Medium'
            },
            {
              'id': 3,
              'label': 'Large'
            },
            {
              'id': 1,
              'label': 'X-Large'
            },
            {
              'id': 2,
              'label': 'XX-Large'
            },
            {
              'id': 3,
              'label': 'XXX-Large'
            }
          ]
        }
      ],
      'description': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.'
    };

    $scope.language = {
      'writeReview': 'Write A Review',
      'addToFavorites': 'Add to Favorites',
      'price': 'Now',
      'msrp': 'Reg',
      'addToCart': 'Add to Bag',
      'description': 'Description',
      'relatedProducts': 'Similar Items',
      'reviews': 'Customer Reviews',
      'readAllReviews': 'Read All Reviews'
    };

    $scope.htmlReady();

];
