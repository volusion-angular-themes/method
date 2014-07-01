'use strict';

// ReSharper disable WrongExpressionStatement
describe('Filter: seoFriendly', function() {

	beforeEach(module('Volusion.filters'));

	it('trims non-alphanumeric characters from the beginning of the input', inject(function(seoFriendlyFilter) {
		expect(seoFriendlyFilter('% % - ( & )foo')).toEqual('foo');
	}));

	it('trims non-alphanumeric characters from the end of the input', inject(function(seoFriendlyFilter) {
		expect(seoFriendlyFilter('foo% % - ( & )')).toEqual('foo');
	}));

	it('replaces intermediate non-alphanumeric character groups with a single dash', inject(function(seoFriendlyFilter) {
		expect(seoFriendlyFilter('123 bar baz')).toEqual('123-bar-baz');
		expect(seoFriendlyFilter('foo/456?baz')).toEqual('foo-456-baz');
		expect(seoFriendlyFilter('foo / bar*%789')).toEqual('foo-bar-789');
	}));

	it('replaces intermediate non-alphanumeric character groups with a single dash and trims off non-alphanumeric characters', inject(function(seoFriendlyFilter) {
		expect(seoFriendlyFilter(' ! @ # foo $ % ^ 123bar & * ( baz456 ) _ + =')).toEqual('foo-123bar-baz456');
	}));

	it('returns empty string if there are no alphanumeric characters', inject(function(seoFriendlyFilter) {
		expect(seoFriendlyFilter(' %/? ')).toBe('');
	}));

});
