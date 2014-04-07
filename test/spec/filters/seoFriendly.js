'use strict';

// ReSharper disable WrongExpressionStatement
describe('Filter: seoFriendly', function() {
  beforeEach(module('volusionApp'));

  it('trims non-alphanumeric characters from the beginning of the input', inject(function(seoFriendlyFilter) {
    expect(seoFriendlyFilter('% % - ( & )foo')).to.eq('foo');
  }));

  it('trims non-alphanumeric characters from the end of the input', inject(function(seoFriendlyFilter) {
    expect(seoFriendlyFilter('foo% % - ( & )')).to.eq('foo');
  }));

  it('replaces intermediate non-alphanumeric character groups with a single dash', inject(function(seoFriendlyFilter) {
    expect(seoFriendlyFilter('123 bar baz')).to.eq('123-bar-baz');
    expect(seoFriendlyFilter('foo/456?baz')).to.eq('foo-456-baz');
    expect(seoFriendlyFilter('foo / bar*%789')).to.eq('foo-bar-789');
  }));

  it('replaces intermediate non-alphanumeric character groups with a single dash and trims off non-alphanumeric characters', inject(function(seoFriendlyFilter) {
    expect(seoFriendlyFilter(' ! @ # foo $ % ^ 123bar & * ( baz456 ) _ + =')).to.eq('foo-123bar-baz456');
  }));

  it('returns empty string if there are no alphanumeric characters', inject(function(seoFriendlyFilter) {
    expect(seoFriendlyFilter(' %/? ')).to.be.empty;
  }));

});
