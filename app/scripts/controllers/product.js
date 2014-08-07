'use strict';

angular.module('Volusion.controllers')
	.controller('ProductCtrl', ['$rootScope', '$scope', 'vnApi', '$location', '$routeParams', '$filter', '$anchorScroll', 'Cart',
		function ($rootScope, $scope, vnApi, $location, $routeParams, $filter, $anchorScroll, Cart) {

			$scope.product = {};
			$scope.cartItem = {};

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
				$scope.popoverText = '';
				$scope.buttonDisabled = false;

				var missedOptions = findRequiredOptionsAreSelected($scope.product.options);
				if (missedOptions.length > 0) {
					for (var idx = 0; idx < missedOptions.length; idx++) {
						$scope.popoverText += $filter('uppercase')(missedOptions[idx]);

						if (idx !== missedOptions.length - 1) {
							$scope.popoverText += ' and ';
						}
					}

					$scope.popoverText = 'Please select ' + $scope.popoverText + ' to add this to your cart';
					$scope.buttonDisabled = true;
				}
			}

			function setDefaults() {
				var product = $scope.product;
				product.optionSelection = { images: 'default' };

				if (product.imageCollections.length > 0 && product.imageCollections[0].images.length > 0) {
					product.image = product.imageCollections[0].images[0];
				} else {
					product.image = {};
					product.image.medium = '/images/theme/tcp-no-image.jpg';
					product.image.large = '/images/theme/tcp-no-image.jpg';
					product.image.small = '/images/theme/tcp-no-image.jpg';
				}

				$scope.cartItem.options = $scope.cartItem.options || [];
				var options = product.options;
				if (!options || !options.length) {
					product.optionSelection = angular.extend(product.optionSelection, {
						available: 9999,
						isValid: true,
						product: product,
						state: 'available'
					});

					return;
				}

				setPopover();
			}

			vnApi.Product().get({slug: $routeParams.slug }).$promise
				.then(function (response) {
					$scope.product = response.data;

					var fullUrl = $location.absUrl(),
						pageTitle = $scope.seo.metaTagTitle;

					// Sharing
					$scope.product.sharing = {
						facebook  : 'http://www.facebook.com/sharer.php?u=' + fullUrl + '/',
						twitter   : 'http://twitter.com/share?url=' + fullUrl + '&amp;text=' + pageTitle,
						tumblr    : 'http://www.tumblr.com/share/link?url=' + fullUrl + '&amp;name=' + pageTitle,
						googlePlus: 'https://plus.google.com/share?url=' + fullUrl
					};

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
				selection.product.optionSelection = selection;
			});

			$scope.$watch('product.optionSelection', function (selection, oldSelection) {

				// TODO: Remove SKU if not needed
				//function setSKU() {
				//	var sku = selection.sku;
				//	if (sku !== null && sku !== undefined) {
				//		cartItem.sku = sku;
				//	}
				//}

				function setProductCodeAndId() {
					$scope.cartItem.code = $scope.product.code;
					$scope.cartItem.id = $scope.product.id;
				}

				function setQuantity() {
					if (!selection.isValid) {
						$scope.cartItem.qty = 1;
						selection.available = 0;
						$scope.product.optionSelection.available = 0;

						return;
					}

					if ($scope.cartItem.qty === undefined || $scope.cartItem.qty === 0) {
						$scope.cartItem.qty = 1;
					}

					selection.available -= $scope.cartItem.qty;
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

					if (oldSelection === undefined || selection.images !== oldSelection.images) {
						$scope.product.image = $scope.product.imageCollections[0].images[0];
					}

					$scope.currentImageCollection = {};
					angular.forEach($scope.product.imageCollections, function (collection) {
						if (collection.key === selection.images) {
							$scope.currentImageCollection = collection.images;
						}
					});
				}

				if (selection === undefined) {
					return;
				}

				setProductCodeAndId();
				setQuantity();
				setImages();
				setPopover();

				$scope.isAddToCartButtonEnabled = selection.isValid && $scope.cartItem.qty > 0;
			});

			function modifyQuantity(amount) {
				$scope.cartItem.qty = parseInt($scope.cartItem.qty) + amount; // manual change in input stringify model
				var selection = $scope.product.optionSelection;
				if (selection && (selection.available - amount) >= 0) {
					selection.available -= amount;
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

			function safeApply(scope, fn) {
				return (scope.$$phase || scope.$root.$$phase) ? fn() : scope.$apply(fn);
			}

			$scope.getImagePath = function (imageCollections) {
				// This gets the default:medium image for the product
				var path = $filter('vnProductImageFilter')(imageCollections);

				if ('' === path) {
					return '/images/theme/tcp-no-image.jpg';
				}

				return path;
			};

			$scope.addToCart = function() {

				if (findRequiredOptionsAreSelected($scope.product.options).length > 0) {
					return;
				}

				Cart.saveCart($scope.cartItem)
					.then(function () {
						safeApply($scope, function() {
							$scope.cartItem.qty = 0;
						});
					}, function () {
//						$rootScope.$emit('VN_ADD_TO_CART_FAIL', {
//							status: status,
//							data  : cartItem
//						});
					})
					.finally(function () {
						safeApply($scope, function() {
							modifyQuantity($scope.product.optionSelection.available && 1);
						});
					});
			};
		}]);
