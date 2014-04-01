'use strict';

// ReSharper disable WrongExpressionStatement
describe('Provider: translate', function () {

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

  });

  function config(options, callback) {
    module('volusionApp', function(translateProvider) {
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
