'use strict';

module.exports = [
  function() {

    function generateClasses(base, modifiers) {
      var result = [base];
      angular.forEach(splitModifiers(modifiers), function(modifier) {
        result.push(base + '--' + modifier);
      });
      return result;
    }

    function splitModifiers(modifiers) {
      modifiers = modifiers && modifiers.replace(/^\s+|\s+$/g, '');
      if (!modifiers) {
        return [];
      }
      return modifiers.split(/\s+/);
    }

    return {
      addClasses: function($elem, options) {

        options = options || {};

        var block = options.block;
        if (!block) {
          return;
        }

        var blockClasses = generateClasses(block, options.blockModifiers);

        var element = options.element;

        if (!element) {
          angular.forEach(blockClasses, function(blockClass) {
            $elem.addClass(blockClass);
          });
          return;
        }

        var elementClasses = generateClasses('__' + element, options.elementModifiers);
        angular.forEach(blockClasses, function(blockClass) {
          angular.forEach(elementClasses, function(elementClass) {
            $elem.addClass(blockClass + elementClass);
          });
        });

      }
    };
  }
];
