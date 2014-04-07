'use strict';

module.exports = [function seoFriendly() {
  return function(input) {

    var words = input.match(/[0-9a-z]+/gi);
    return words ? words.join('-') : '';
  };
}];
