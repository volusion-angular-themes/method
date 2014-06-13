'use strict';

module.exports = function($scope) {

  $scope.onOptionChanged = function(option, item) {
    $scope.cartItem.options[option.id] = item.id;
    preserveSubOptions([], $scope.product.options);
  };

  function preserveSubOptions(selections, options) {
    if (!options) {
      return;
    }
    var saveOptions = $scope.cartItem.options;
    var product = $scope.product;
    var productSelections = product.selections;
    angular.forEach(options, function(option) {
      var itemKeys = option.items;
      for (var i = 0, len = itemKeys.length; i < len; i++) {
        var itemKey = itemKeys[i];
        var item = product.optionItems[itemKey];
        if (saveOptions.hasOwnProperty(option.id) && saveOptions[option.id] === item.id) {
          selections.push([option.id, item.id].join(':'));
          var selectionKey = selections.join('|');
          option.selected = itemKey;
          product.selection = angular.extend(
            {},
            productSelections.template,
            productSelections[selectionKey]
          );
          options = option.options;
          if (options) {
            preserveSubOptions(selections, options);
          }
          break;
        }
      }
    });
  }

  $scope.onCheckboxClicked = function(option, itemKey) {
    var options = $scope.cartItem.options;
    var items = options[option.id] = options[option.id] || [];
    var idx = items.indexOf(itemKey);
    if (idx > -1) {
      items.splice(idx, 1);
    } else {
      items.push(itemKey);
    }
    if (!items.length) {
      delete options[option.id];
    }
  };

};
