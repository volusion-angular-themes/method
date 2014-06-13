'use strict';

module.exports = [
  'bem',
  function(bem) {
    return {
      restrict: 'A',
      controller: 'BlockCtrl',
      compile: function() {
        return {
          pre: function(scope, iElement, iAttrs, controller) {
            var block = iAttrs.vnBlock;
            var modifiers = iAttrs.vnModifiers;
            bem.addClasses(iElement, {
              block: block,
              blockModifiers: modifiers
            });
            controller.block = block;
            controller.modifiers = modifiers;
          }
        };
      }
    };
  }
];
