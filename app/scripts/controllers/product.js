angular.module('Volusion.controllers')
	.controller('ProductCtrl', ['$rootScope', '$scope', 'vnApi', '$location', '$routeParams', '$filter', '$anchorScroll', '$translate', 'Cart', 'vnImagePreloader',
		function ($rootScope, $scope, vnApi, $location, $routeParams, $filter, $anchorScroll, $translate, Cart, vnImagePreloader) {

			'use strict';

			$scope.product = {};
			$scope.cartItem = {};
			$scope.itemSelectionsNotInStock = false;

			var optionsAndSKU;

			// carousel
			$scope.carousel = {
				interval: 4000
			};

			// accordion panels
			$scope.accordionPanels = {
				isopen1: true
			};

			// tabs
			$scope.tabs = {
				relatedProducts: {
					active: true
				},
				accessories    : {
					active: false
				}
			};

			function findOptionsAndOptionSKU(options) {
				var optionsToSKU = [];

				if (!options) {
					return optionsToSKU;
				}

				for (var i = 0; i < options.length; i++) {
					var option = options[i];

					if (option.isRequired && option.derivesToSKU) {
						optionsToSKU.push(option.label);
					}
				}

				return optionsToSKU;
			}

			function findOptionAvailability(key) {
                if (typeof key === 'undefined') {
                    return true;
                }

				var qty = 0,
					option,
					takeOptionInConsideration = (optionsAndSKU === 1);

				option = $scope.product.optionSKUs.filter(function (option) {
					return option.key === key;
				});

				// filter self option from complex one and take them in considerations only one option derives SKU
				// if it's a complex option - check always
				if (option.length > 0 && (takeOptionInConsideration || option[0].key.indexOf('|') > -1)) {
					qty = option[0].quantityInStock;
				} else {
					if (option.length === 0) {
						return ($scope.product.availability.allowBackOrders ||
								$scope.product.availability.quantityInStock === null ||
								$scope.product.availability.quantityInStock > 0);
					}
					return false;
				}

				return (qty === null || qty > 0);
			}

			function findRequiredOptionsAreSelected(options) {
				var missedOptions = [];

				if (!options) {
					return missedOptions;
				}

				for (var i = 0; i < options.length; i++) {
					var option = options[i];

					if (option.isRequired && !option.hasOwnProperty('selected')) {
						missedOptions.push(option.label);
					}

					if (option.options.length > 0) {
						var subOptions = findRequiredOptionsAreSelected(option.options);
						for (var j = 0; j < subOptions.length; j++) {
							missedOptions.push(subOptions[j].label);
						}
					}
				}

				return missedOptions;
			}

			function setPopover () {
				var missedOpt = '';

				$scope.popoverText = '';
				$scope.buttonDisabled = false;

				var missedOptions = findRequiredOptionsAreSelected($scope.product.options);
				if (missedOptions.length > 0) {
					for (var idx = 0; idx < missedOptions.length; idx++) {
						missedOpt += $filter('uppercase')(missedOptions[idx]);

						if (idx !== missedOptions.length - 1) {
							missedOpt += $filter('translate')('common.and');
						}
					}

					$translate('product.addToCartMissing', { missingOptions: missedOpt })
						.then(function (result) {
							$scope.popoverText = result;
						});

					$scope.buttonDisabled = true;

					return;
				}

				var selectionAvailable = false;

				if (0 === $scope.product.options.length) {
					selectionAvailable = ($scope.product.availability.allowBackOrders ||
										  $scope.product.availability.quantityInStock === null ||
										  $scope.product.availability.quantityInStock > 0);
				} else {
					// For some reason when having only one option 'optionSelection.key' is missing :(
					var selectedOption = (1 === $scope.product.options.length) ?
						$scope.product.optionSelection.option.key + ':' + $scope.product.optionSelection.option.selected :
						$scope.product.optionSelection.key;

					selectionAvailable = findOptionAvailability(selectedOption);
				}

				if (!selectionAvailable) {
					$scope.popoverText = $filter('translate')('product.addToCartNotInStock');
					$scope.buttonDisabled = true;

					return;
				}
			}

			function findAvailability () {
				var available = 0;

                if ($scope.product.options.length > 0 &&
                	$scope.product.optionSKUs.length > 0) {

                    for (var idx = 0; idx < $scope.product.optionSKUs.length; idx++) {


                        available |= findOptionAvailability($scope.product.optionSKUs[idx].key);  // jshint ignore:line
                    }
                    $scope.itemSelectionsNotInStock = (available === 0);
                } else {
                    $scope.itemSelectionsNotInStock = (!$scope.product.availability.allowBackOrders &&
                        $scope.product.availability.quantityInStock !== null &&
                        $scope.product.availability.quantityInStock <= 0);
                }

			}

			function fetchProductImages () {
				var imagesToPreload  = [];

				angular.forEach($scope.product.imageCollections, function (collection) {
					angular.forEach(collection.images, function (imageCollection) {
						imagesToPreload.push(imageCollection.large);
						imagesToPreload.push(imageCollection.medium);
						imagesToPreload.push(imageCollection.small);
					});
				});

				vnImagePreloader.preloadImages(imagesToPreload);
			}

			function setDefaults() {
				var product = $scope.product;
				product.optionSelection = { option: {selected: 'default'} };

				if (product.imageCollections.length > 0 && product.imageCollections[0].images.length > 0) {
					product.image = product.imageCollections[0].images[0];
				} else {
					product.image = {};
					product.image.medium = '/images/theme/tcp-no-image.jpg';
					product.image.large = '/images/theme/tcp-no-image.jpg';
					product.image.small = '/images/theme/tcp-no-image.jpg';
				}

				$scope.cartItem.options = $scope.cartItem.options || [];

				optionsAndSKU = findOptionsAndOptionSKU($scope.product.options).length;
				findAvailability();
				setPopover();
				fetchProductImages();
			}

			vnApi.Product().get({slug: $routeParams.slug }).$promise
				.then(function (response) {
					$scope.product = response.data;

					var fullUrl = encodeURIComponent($location.absUrl()),
							pageTitle = encodeURIComponent($scope.product.name);

					// Sharing
					$scope.product.sharing = {
						facebook  : 'http://www.facebook.com/sharer.php?u=' + fullUrl + '&t=' + pageTitle,
						twitter   : 'http://twitter.com/share?url=' + fullUrl + '&text=' + pageTitle,
						tumblr    : 'http://www.tumblr.com/share/link?url=' +  fullUrl + '&name=' + pageTitle,
						googlePlus: 'https://plus.google.com/share?url=' + fullUrl
					};

					$scope.product.isEditable = false;

					$scope.cartItem = $scope.product.cartItem;

					$scope.isInDesktopMode = $rootScope.isInDesktopMode;

					angular.extend($scope.seo, $scope.product.seo);

					setDefaults();

				})
				.then(function () {

					//TODO: Fix the html related to no reviews
					// reviews
					if ($scope.product.code) {
						vnApi.Review().get({ code: $scope.product.code }).$promise
							.then(function (response) {
								$scope.ratingsAndReviews = response;
							});
					}

					// According to Kevin we should query only the top category
					var categoryIds = $scope.product.categories[0].id;

					// related products
					vnApi.Product().get({ categoryIds: categoryIds, pageNumber: 1, pageSize: 4 }).$promise
						.then(function (response) {
							$scope.relatedProducts = response.data;
						});

					// accessories
					vnApi.Product().get({ accessoriesOf: $scope.product.code, pageNumber: 1, pageSize: 4 }).$promise
						.then(function (response) {
							$scope.accessories = response.data;
						});
				});

			$scope.$on('$stateChangeSuccess', function () {
				$location.hash('top');
				$anchorScroll();
				$location.hash('');
			});

			//$scope.sceDescriptions = angular.copy(product.descriptions);  // TODO: ???

			$rootScope.$on('VN_PRODUCT_SELECTED', function (event, selection) {
				$scope.product.optionSelection = selection;
			});

			$scope.$watch('product.optionSelection', function (currentSelection) {

				// TODO: Remove SKU if not needed
				//function setSKU() {
				//	var sku = currentSelection.sku;
				//	if (sku !== null && sku !== undefined) {
				//		cartItem.sku = sku;
				//	}
				//}

				function setProductCodeAndId() {
					$scope.cartItem.code = $scope.product.code;
					$scope.cartItem.id = $scope.product.id;
				}

				function setQuantity() {
					if (!currentSelection.isValid) {
						$scope.cartItem.qty = 1;
						currentSelection.quantityInStock = 0;
						$scope.product.optionSelection.quantityInStock = 0;

						return;
					}

					if ($scope.cartItem.qty === undefined || $scope.cartItem.qty === 0) {
						$scope.cartItem.qty = 1;
					}

					currentSelection.quantityInStock -= $scope.cartItem.qty;
				}

				function setImages() {

					if ($scope.product.imageCollections.length === 0 ||
						$scope.product.imageCollections[0].images.length === 0) {

						$scope.product.image = {};
						$scope.product.image.medium = '/images/theme/tcp-no-image.jpg';
						$scope.product.image.large = '/images/theme/tcp-no-image.jpg';
						$scope.product.image.small = '/images/theme/tcp-no-image.jpg';

						return;
					}

					angular.forEach($scope.product.imageCollections, function (collection) {
						if (collection.key === currentSelection.option.selected) {
							$scope.currentImageCollection = collection.images;
							$scope.product.image = $scope.currentImageCollection[0];
						}
					});
				}

				if (currentSelection === undefined) {
					return;
				}

				setProductCodeAndId();
				setQuantity();
				setImages();
				setPopover();

				$scope.isAddToCartButtonEnabled = currentSelection.isValid && $scope.cartItem.qty > 0;
			});

			function modifyQuantity(amount) {
				$scope.cartItem.qty = parseInt($scope.cartItem.qty) + amount; // manual change in input stringify model

				if ($scope.product.optionSelection && ($scope.product.optionSelection.quantityInStock - amount) >= 0) {
					$scope.product.optionSelection.quantityInStock -= amount;
				}
			}

			$scope.decrementQty = function () {
				modifyQuantity(-1);
			};

			$scope.incrementQty = function () {
				modifyQuantity(1);
			};

			$scope.changeQty = function () {
				if (isNaN($scope.cartItem.qty) || parseInt($scope.cartItem.qty) < 1) {
					$scope.cartItem.qty = 1;
				}
			};

			$scope.getImagePath = function (imageCollections) {
				// This gets the default:medium image for the product
				var path = $filter('vnProductImageFilter')(imageCollections);

				if ('' === path) {
					return '/images/theme/tcp-no-image.jpg';
				}

				return path;
			};

            function displayCartMessages(res) {
                var vnMsg;
                var translateFilter = $filter('translate');

                if (res.serviceErrors && res.serviceErrors.length > 0) {
                    angular.forEach(res.serviceErrors, function(error) {
                        vnMsg = translateFilter(error.Code);
                        vnMsg = (vnMsg === error.Code) ? error.Message : vnMsg;
                        vnMsg = vnMsg || translateFilter('message.CART_UNKNOWN');
                        $rootScope.$emit('vnNotification.show', { type: 'danger', msg: vnMsg });
                    });
                }
                else if (res.warnings && res.warnings.length > 0 ) {
                    angular.forEach(res.warnings, function(warning) {
                        vnMsg = translateFilter(warning.Code);
                        vnMsg = (vnMsg === warning.Code) ? warning.Message : vnMsg;
                        $rootScope.$emit('vnNotification.show', { type: 'warning', msg: vnMsg });
                    });
                } else {
                    vnMsg = translateFilter('message.addToCartSuccess');
                    $rootScope.$emit('vnNotification.show', { type: 'success', msg: vnMsg });
                }
            }

            $scope.addToCart = function() {

                if (findRequiredOptionsAreSelected($scope.product.options).length > 0 ||
                    !findOptionAvailability($scope.product.optionSelection.key)) {

                    return;
                }

                Cart.saveCart($scope.cartItem)
                    .then(function (response) {
                        $scope.cartItem.qty = 0;
                        displayCartMessages(response.data);

                    }, function (response) {
                        $scope.cartItem.qty = 0;
                        displayCartMessages(response.data);
                    })
                    .finally(function () {
                        modifyQuantity(1);
                    });
            };
        }]);
