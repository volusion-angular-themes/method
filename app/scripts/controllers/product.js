'use strict';

angular.module('Volusion.controllers')
	.controller('ProductCtrl', ['$rootScope', '$scope', 'vnApi', '$location', '$routeParams', '$anchorScroll', 'Cart',
		function ($rootScope, $scope, vnApi, $location, $routeParams, $anchorScroll, Cart) {

			$scope.product = {};
			$scope.cartItem = {};
			//cart = Cart.getCart(),
			//cartId;

			//cartId = cart && cart.id;
			//if (cartId === undefined) {
			//	cartId = $scope.config.checkout.cartId;
			//	cartId = Config.getCheckoutCartId();
			//}

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

			function setDefaults() {
				$scope.product.optionSelection = { images: 'default' };
				$scope.product.image = $scope.product.images.default[0];
				$scope.cartItem.options = $scope.cartItem.options || {};
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

					//product = $scope.product;
					//cartItem = $scope.cartItem = product.cartItem;
					$scope.cartItem = $scope.product.cartItem;

					$scope.isInDesktopMode = $rootScope.isInDesktopMode;

					angular.extend($scope.seo, $scope.product.seo);

					setDefaults();

				})
				.then(function () {

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

			//TODO: Fix the html related to no reviews
			$scope.$watch('product', function () {
				if ($scope.product.code) {
					vnApi.Review().get({ code: $scope.product.code }).$promise
						.then(function (response) {
							$scope.ratingsAndReviews = response;
						});
				}
			});

			$scope.$watch('product.optionSelection', function (selection, oldSelection) {

				function setAvailabilityMessage() {
					//var message = product.optionAvailabilityMessages[selection.state];
					//if (message) {
					//	$scope.availabilityMessage = message.replace('{{available}}', selection.available);
					//} else {
					//	delete $scope.availabilityMessage;
					//}
				}

				// TODO: Remove SKU if not needed
				//function setSKU() {
				//	var sku = selection.sku;
				//	if (sku !== null && sku !== undefined) {
				//		cartItem.sku = sku;
				//	}
				//}

				function setProductCode() {
					$scope.cartItem.code = $scope.product.code;
				}

				function setQuantity() {
					if (!selection.isValid) {
						$scope.cartItem.qty = 0;
						selection.available = 0;
						return;
					}
					if (selection.available < $scope.cartItem.qty) {
						$scope.cartItem.qty = selection.available;
					}
					if ($scope.cartItem.qty === 0 && selection.available > 0) {
						$scope.cartItem.qty = 1;
					}
					selection.available -= $scope.cartItem.qty;
				}

				function setImage() {
					if (oldSelection === undefined || selection.images !== oldSelection.images) {
						$scope.product.image = $scope.product.images[selection.images][0];
					}
				}

				if (selection === undefined) {
					return;
				}

				setAvailabilityMessage();
				//setSKU();
				setProductCode();
				setQuantity();
				setImage();

				$scope.isAddToCartButtonEnabled = selection.isValid && $scope.cartItem.qty > 0;
			});

			// Reviews //TODO: replace hardcoded 'ah-chairbamboo' with $scope.product.code after it's resolved
			//vnApi.Review().get({ code: 'ah-chairbamboo' }).$promise
			//vnApi.Review().get({ code: product.code }).$promise
			//	.then(function(response) {
			//		console.log('what is our product? ', product);
			//		$scope.ratingsAndReviews = response;
			//	});

			function modifyQuantity(amount) {
				$scope.cartItem.qty += amount;
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

			function safeApply(scope, fn) {
				return (scope.$$phase || scope.$root.$$phase) ? fn() : scope.$apply(fn);
			}

			// Add to Cart
			$scope.addToCart = function () {
				//$rootScope.$emit('ADD_TO_CART', $scope.cartItem);
				Cart.saveCart($scope.cartItem)
					.then(function () {
						safeApply($scope, function () {
							$scope.cartItem.qty = 0;
							modifyQuantity($scope.product.optionSelection.available && 1);
						});
					});
			};

			//$rootScope.$on('ITEM_ADDED_TO_CART', function () {
			//	var selection = product.optionSelection;
			//	modifyQuantity(selection.available && 1);
			//});
		}]);
