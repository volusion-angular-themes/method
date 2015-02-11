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
});
