'use strict';

// ReSharper disable WrongExpressionStatement
describe('View: product', function() {

  beforeEach(module('volusionApp'));

  var $view;

  beforeEach(inject(function($templateCache) {
    $view = $('<body/>').html($templateCache.get('views/product.html'));
  }));

});
