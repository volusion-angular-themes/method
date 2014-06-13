'use strict';

module.exports = [
  function() {

    this.getBlock = function() {
      return this.block;
    };

    this.getModifiers = function() {
      return this.modifiers;
    };

  }
];
