'use strict';

// ReSharper disable WrongExpressionStatement
describe('View: home', function() {

  beforeEach(module('volusionApp'));

  var $view;

  beforeEach(inject(function($templateCache) {
    $view = $('<body/>').html($templateCache.get('views/home.html'));
  }));

});
