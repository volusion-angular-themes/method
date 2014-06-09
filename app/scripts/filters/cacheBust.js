'use strict';

function appendTokenToUrl(url, token) {
  var separator = (url.indexOf('?') > -1) ? '&' : '?';
  return url + separator + '_=' + token;
}

angular.module('volusion.filters').filter('cacheBust', [
  'tokenGenerator',
  function(tokenGenerator) {
    return  function(url) {
      if (!url || !url.trim()) {
        return url;
      }
      return appendTokenToUrl(url, tokenGenerator.getCacheBustingToken()._);
    };
  }
]);
