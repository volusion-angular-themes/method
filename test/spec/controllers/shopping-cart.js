'use strict';

describe('Controller: ShoppingCartCtrl', function () {

    // load the controller's module
    beforeEach(module('methodApp'));

    var ShoppingCartCtrl,
        $scope,
        vnCart,
        mockCart;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, _vnCart_) {
        $scope = $rootScope.$new();

        ShoppingCartCtrl = $controller('ShoppingCartCtrl', {
            $scope: $scope
        });

        vnCart = _vnCart_;
        vnCart.init();

        mockCart = {
            items: [],
            discounts: [],
            warnings: {},
            serviceErrors: {}
        };

        spyOn(vnCart, 'updateCart').and.returnValue({
            then: function(cb) {
                cb();
            }
        });
        spyOn(vnCart, 'getCart').and.returnValue(mockCart);
        $scope.cart = vnCart.getCart();
    }));

    it('should exist', function() {
        expect(ShoppingCartCtrl).toBeDefined();
    });
    it('should add coupon to cart', function() {
        $scope.coupon.code = '123';
        $scope.applyCoupon();
        expect($scope.cart.discounts.length).toEqual(1);
    });
    it('should delete coupon from cart', function() {
        $scope.coupon.code = '123';
        $scope.applyCoupon();
        $scope.cart.discounts[0].id = 'DSC-5';
        $scope.deleteCoupon('DSC-5');
        expect($scope.cart.discounts.length).toEqual(0);
    });
    it('should change product quantity in cart', function() {
        var product = {
            code: 'ah-decorpillows',
            id: 37350,
            qty: 1
        };
        $scope.cart.items.push(product);
        $scope.changeQty(product, 2);
        expect($scope.cart.items[0].qty).toEqual(2);
    });
});