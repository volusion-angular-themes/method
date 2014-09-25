'use strict';

describe('Filter: currency', function () {

  // load the filter's module
  beforeEach(module('methodApp'));

  // initialize a new instance of the filter before each test
  var currency;
  beforeEach(inject(function ($filter) {
    currency = $filter('currency');
  }));

  xit('should return the input prefixed with "currency filter:"', function () {
    var text = 'angularjs';
    expect(currency(text)).toBe('currency filter: ' + text);
  });

});
