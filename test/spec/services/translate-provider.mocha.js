'use strict';

// ReSharper disable WrongExpressionStatement
describe.skip('Provider: translate', function() {

	describe('config method', function() {

		it('configures region', function() {
			var options = { region: 'foo' };
			config(options);
			inject(function(translate) {
				expect(translate.getConfig().region).to.eq('foo');
			});
		});

		it('configures language', function() {
			var options = { lang: 'foo' };
			config(options);
			inject(function(translate) {
				expect(translate.getConfig().lang).to.eq('foo');
			});
		});

		it('configures country', function() {
			var options = { country: 'foo' };
			config(options);
			inject(function(translate) {
				expect(translate.getConfig().country).to.eq('foo');
			});
		});

		it('configures region, language and country in one shot', function() {
			var options = {
				region: 'foo',
				lang: 'bar',
				country: 'baz'
			};
			config(options);
			inject(function(translate) {
				expect(translate.getConfig()).to.deep.eq(options);
			});
		});

		it('does not initialize the translateProvider when Translations are disabled', function() {
			var options = {
				disableTranslations: true
			};

			config(options, function(translateProvider) {
				var initTranslateProvider =
					sinon.spy(translateProvider, 'initTranslateProvider');
				expect(initTranslateProvider).not.to.have.been.called; // jshint ignore:line
				translateProvider.initTranslateProvider.restore();
			});
		});

	});

	it('returns true when adding parts with translations disabled', function() {
		var options = {
			disableTranslations: true
		};
		config(options);
		inject(function(translate) {
			var result = translate.addParts('foo');
			expect(result).to.be.true; // jshint ignore:line
		});
	});

	function config(options, callback) {
		module('pascalprecht.translate', 'Volusion.services', function(translateProvider) {
			if (Object.keys(options).length) {
				localStorage.clear();
				translateProvider.configure(options);
			}
			if (typeof callback === 'function') {
				callback(translateProvider);
			}
		});
	}

});
