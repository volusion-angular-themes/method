'use strict';

module.exports = [
  '$rootScope',
  '$scope',
  function(
    $rootScope,
    $scope
  ) {

  $scope.onOptionChanged = function(option, item) {
    $scope.saveTo[option.id] = item.id;
    preserveSubOptions();
    $rootScope.$emit('VN_PRODUCT_SELECTED', angular.extend({},
      {
        product: $scope.product,
        option: option,
        item: item,
        isValid: verifyRequiredOptionsAreSelected($scope.product.options)
      },
      buildSelection()
    ));
  };

  function preserveSubOptions() {
    traverseSelectedOptions($scope.product.options, null, function(option, item) {
      option.selected = item.id;
    });
  }

  function traverseSelectedOptions(options, filter, callback) {
    if (!options) {
      return;
    }
    filter = filter || function() { return true; };
    var product = $scope.product;
    var saveTo = $scope.saveTo;
    angular.forEach(options, function(option) {
      var itemKeys = option.items;
      if (!itemKeys) {
        return;
      }
      for (var i = 0, len = itemKeys.length; i < len; i++) {
        var itemKey = itemKeys[i];
        var item = product.optionItems[itemKey];
        if (saveTo.hasOwnProperty(option.id) && saveTo[option.id] === item.id) {
          if (filter(option)) {
            callback(option, item);
          }
          if (option.options) {
            traverseSelectedOptions(option.options, filter, callback);
          }
          break;
        }
      }
    });
  }

  function buildSelection() {
    var selections = [];
    var filter = function(option) {
      return option.isComputedInSelection;
    };
    traverseSelectedOptions($scope.product.options, filter, function(option, item) {
      selections.push([option.id, item.id].join(':'));
    });
    var optionSelections = $scope.product.optionSelections;
    return angular.extend({},
      optionSelections.template,
      optionSelections[selections.join('|')]
    );
  }

  function verifyRequiredOptionsAreSelected(options) {
    if (!options) {
      return true;
    }
    for (var i = 0, len = options.length; i < len; i++) {
      var option = options[i];
      if (option.isRequired && !option.hasOwnProperty('selected')) {
        return false;
      }
      if (verifyRequiredOptionsAreSelected(option.options) === false) {
        return false;
      }
    }
    return true;
  }

  $scope.onCheckboxClicked = function(option, itemKey) {
    var saveTo = $scope.saveTo;
    var items = saveTo[option.id] = saveTo[option.id] || [];
    var idx = items.indexOf(itemKey);
    if (idx > -1) {
      items.splice(idx, 1);
    } else {
      items.push(itemKey);
    }
    if (!items.length) {
      delete saveTo[option.id];
    }
  };

}];
