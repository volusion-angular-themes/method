'use strict';

// ReSharper disable WrongExpressionStatement
describe.skip('Service: storage', function() {

	// beforeEach(module('pascalprecht.translate', 'volusion.services', 'ngCookies'));
	beforeEach(module('methodApp'));

	var storage;

	// ReSharper disable once InconsistentNaming
	beforeEach(inject(function(_storage_) {
		storage = _storage_;
	}));

	it('exists', function() {
		expect(storage).to.exist; // jshint ignore:line
	});

	it('is an object', function() {
		expect(storage).to.be.an('object');
	});

	it('has get, set and remove methods', function() {
		expect(storage).to.respondTo('get');
		expect(storage).to.respondTo('set');
		expect(storage).to.respondTo('remove');
	});

	it('sets foo to bar', function() {
		storage.set('foo', 'bar');
		expect(storage.get('foo')).to.eq('bar');
	});

	it('removes foo', function() {
		storage.set('foo', 'bar');
		expect(storage.get('foo')).to.eq('bar');
		storage.remove('foo');
		expect(storage.get('foo')).to.be.null; // jshint ignore:line
	});

	it('returns null for keys that don\'t exist', function() {
		expect(storage.get('bar')).to.be.null; // jshint ignore:line
	});

	it('gets value from cookie storage if value retrieved from local storage is null',
		inject(function($cookieStore) {
			$cookieStore.put('foo', 'baz');
			expect(storage.get('foo')).to.eq('baz');
		})
	);

});
