'use strict';

// ReSharper disable WrongExpressionStatement
describe('View: category', function() {

  beforeEach(module('volusionApp'));

  var $view;

  beforeEach(inject(function($templateCache) {
    $view = $('<body/>').html($templateCache.get('views/category.html'));
  }));

  it('has a category heading', function() {
    var $ = $view.find('.page-header');
    expect($).to.exist;
    expect($).to.have('h1');
  });

});
