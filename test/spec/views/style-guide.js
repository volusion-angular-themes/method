'use strict';

// ReSharper disable WrongExpressionStatement
describe('View: style-guide', function() {

  beforeEach(module('volusionApp'));

  var $view;

  beforeEach(inject(function($templateCache) {
    $view = $('<div/>').html($templateCache.get('views/style-guide.html'));
  }));

  it('has a jumbotron', function() {
    var $jumbotron = $view.find('.jumbotron');
    expect($jumbotron).to.exist;
    expect($jumbotron.children('h1')).to.exist;
    expect($jumbotron.children('p')).to.exist;
    expect($jumbotron.find('.btn.btn-primary.btn-lg')).to.exist;
  });

});
