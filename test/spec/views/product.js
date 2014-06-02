'use strict';

// ReSharper disable WrongExpressionStatement
describe('View: product', function() {

  beforeEach(module('volusionApp'));

  describe('validate schema.org snippets', function () {

    var $view;

    beforeEach(inject(function($templateCache) {
      $view = $('<body/>').html($templateCache.get('views/product.html'));
    }));

    it('has the itemscope and itemtype attributes on the container div', function () {
      var $container = $view.find('.container');
      expect($container).to.have.attr('itemscope');
      expect($container).to.have.attr('itemtype', 'http://schema.org/Product');
    });

    it('has the product name itemprop', function () {
      var $productName = $view.find('.th-product-name-lg span');
      expect($productName).to.have.attr('itemprop', 'name');
      var $productTitle = $view.find('.th-product-details__title a span');
      expect($productTitle).to.have.attr('itemprop', 'name');
    });

    it('has the product image itemprop', function () {
      var $productImage = $view.find('.th-product img');
      expect($productImage).to.have.attr('itemprop', 'image');
    });

    it('has the product price itemprop', function () {
      var $productPrice = $view.find('.th-reg-price>span>span');
      expect($productPrice).to.have.attr('itemprop', 'price');
    });

    it('has the offer itemscope & itemtype', function () {
      var $nowPrice = $view.find('.th-now-price');
      expect($nowPrice).to.have.attr('itemscope');
      expect($nowPrice).to.have.attr('itemtype', 'http://schema.org/Offer');
      var $nowPriceAmount = $view.find('.th-now-price>span>span');
      expect($nowPriceAmount).to.have.attr('itemprop', 'price');
    });

    it('has the product description itemprop', function () {
      var $productDescription = $view.find('.th-product-info span[itemprop="description"]');
      expect($productDescription).to.exist;
    });

    it('has the product aggregate rating itemscope, itemtype & itemprops', function () {
      var $aggregateRating = $view.find('.th-reviews__totals .th-totals-left>div');
      expect($aggregateRating).to.have.attr('itemscope');
      expect($aggregateRating).to.have.attr('itemtype', 'http://schema.org/AggregateRating');
      expect($aggregateRating.find('span[itemprop="ratingValue"]')).to.exist;
      expect($aggregateRating.find('span[itemprop="bestRating"]')).to.exist;
      expect($aggregateRating.find('span[itemprop="reviewCount"]')).to.exist;
      expect($aggregateRating.find('meta[itemprop="worstRating"]')).to.have.attr('content', '1');
    });

    it('has the product review itemscope, itemtype & itemprops', function () {
      var $productReview = $view.find('.th-review');
      expect($productReview).to.have.attr('itemscope');
      expect($productReview).to.have.attr('itemtype', 'http://schema.org/Review');
      expect($productReview.find('span[itemprop="ratingValue"]')).to.exist;
      expect($productReview.find('span[itemprop="bestRating"]')).to.exist;
      expect($productReview.find('meta[itemprop="worstRating"]')).to.have.attr('content', '1');
      expect($productReview.find('span[itemprop="author"]')).to.exist;
      expect($productReview.find('div[itemprop="name"]')).to.exist;
      expect($productReview.find('div[itemprop="description"]')).to.exist;
      expect($productReview.find('div[itemprop="datePublished"]')).to.exist;
    });

  });


});
