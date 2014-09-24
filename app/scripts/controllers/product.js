angular.module('Volusion.controllers')
	.controller('ProductCtrl', ['$rootScope', '$scope', 'vnApi', '$location', '$routeParams', '$filter', '$anchorScroll', '$translate', 'vnCart', 'vnAppMessageService', 'vnProduct', 'snapRemote', 'notifications',
		function ($rootScope, $scope, vnApi, $location, $routeParams, $filter, $anchorScroll, $translate, vnCart, vnAppMessageService, vnProduct, snapRemote, notifications) {

			'use strict';

			$scope.accordionPanels = {isopen1: true};
			$scope.buttonWait = false;
			$scope.carousel = {interval: 4000};
			$scope.cartItem = {};
			$scope.itemSelectionsNotInStock = false;
			$scope.product = {};
			$scope.tabs = {
				relatedProducts: {
					active: true
				},
				accessories    : {
					active: false
				}
			};

			function modifyQuantity(amount) {
				$scope.cartItem.qty = parseInt($scope.cartItem.qty) + amount; // manual change in input stringify model
				vnProduct.setQuantityInStock(amount);
			}

			function setDefaults() {

				if (vnProduct.getProductImage() === null) {
					vnProduct.setProductNoImage(['/images/theme/tcp-no-image.jpg','/images/theme/tcp-no-image.jpg','/images/theme/tcp-no-image.jpg']);
				}

				$scope.cartItem.options = $scope.cartItem.options || [];
				$scope.itemSelectionsNotInStock = vnProduct.findAvailability();

				setPopover();
			}

			function setPopover() {
				var missedOpt = '';

				$scope.popoverText = '';
				$scope.buttonDisabled = false;

				var missedOptions = vnProduct.findRequiredOptionsAreSelected();
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

				if (!vnProduct.isSelectionAvailable()) {
					$scope.popoverText = $filter('translate')('product.addToCartNotInStock');
					$scope.buttonDisabled = true;

					return;
				}
			}

			vnApi.Product().get({slug: $routeParams.slug }).$promise
				.then(function (response) {

					// using vnProduct's setters will reflect $scope.product object
					$scope.product = vnProduct.set(response.data);

					var fullUrl = encodeURIComponent($location.absUrl()),
						pageTitle = encodeURIComponent($scope.product.name);

					$rootScope.social = {
						pageTitle : pageTitle,
						pageUrl: fullUrl,
						imageUrl: ($scope.product.imageCollections.length !== 0 && $scope.product.imageCollections[0].images.length !== 0) ? $scope.product.imageCollections[0].images[0].medium : ''
					};

					// Sharing
					vnProduct.setSocialSharing(fullUrl, pageTitle);
					vnProduct.setEditable(false);

					$scope.cartItem = vnProduct.getProductCart();

					$scope.isInDesktopMode = $rootScope.isInDesktopMode;

					angular.extend($rootScope.seo, vnProduct.getProductSEO());

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

			$rootScope.$on('VN_PRODUCT_SELECTED', function (event, selection) {
				$scope.product.optionSelection = selection;
			});

			$scope.addToCart = function() {

				if (vnProduct.findRequiredOptionsAreSelected().length > 0 ||
					!vnProduct.findOptionAvailability($scope.product.optionSelection.key)) {

					return;
				}

				// disable button and show "wait" animation
				$scope.buttonWait = true;

				vnCart.saveCart($scope.cartItem)
					.then(function (cart) {

						if ($rootScope.isInDesktopMode) {
							snapRemote.open('right');
						} else {
							snapRemote.expand('right');
						}

						$scope.cartItem.qty = 0;

						if (cart.serviceErrors.length === 0) {
							notifications.displaySuccessfulAddition();
							notifications.displayWarnings(cart.warnings); // if any
						} else {
							notifications.displayErrors(cart.serviceErrors);
						}

					})
					.finally(function () {
						modifyQuantity(1);

						// hide "wait" animation and enable button
						$scope.buttonWait = false;
					});
			};

			$scope.decrementQty = function () {
				modifyQuantity(-1);
			};

			$scope.changeQty = function () {
				if (isNaN($scope.cartItem.qty) || parseInt($scope.cartItem.qty) < 1) {
					$scope.cartItem.qty = 1;
				}
			};

			$scope.getImagePath = function (imageCollections) {
				var path = $filter('vnProductImageFilter')(imageCollections);

				if ('' === path) {
					return '/images/theme/tcp-no-image.jpg';
				}

				return path;
			};

			$scope.incrementQty = function () {
				modifyQuantity(1);
			};

			$scope.$on('$stateChangeSuccess', function () {
				$location.hash('top');
				$anchorScroll();
				$location.hash('');
			});

			$scope.$watch('product.optionSelection', function (currentSelection) {

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

				if (currentSelection === undefined) {
					return;
				}

				setProductCodeAndId();
				setQuantity();

				vnProduct.setProductImage(currentSelection.option.selected);

				setPopover();

				$scope.isAddToCartButtonEnabled = currentSelection.isValid && $scope.cartItem.qty > 0;
			});
        }]);

