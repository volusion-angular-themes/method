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

        spyOn(vnCart, 'updateCart').and.returnValue({
            then: function(cb) {
                cb();
            }
        });
    }));

    it('should exist', function() {
        expect(ShoppingCartCtrl).toBeDefined();
    });
    it('should add coupon to cart', function() {
        mockCart = {
            discounts: [],
            warnings: {},
            serviceErrors: {}
        };
        spyOn(vnCart, 'getCart').and.returnValue(mockCart);

        $scope.cart = vnCart.getCart();
        $scope.coupon.code = 'DSC-3';
        $scope.applyCoupon();
        
        expect($scope.cart.discounts.length).toEqual(1);
    });
    it('should delete coupon from cart', function() {
        mockCart = {
            discounts: [
                {
                    couponCode: "123",
                    discountType: 3,
                    id: "DSC-5",
                    name: "August Promotion - $10 off coupon ",
                    value: -10
                }
            ],
            warnings: {},
            serviceErrors: {}
        };
        spyOn(vnCart, 'getCart').and.returnValue(mockCart);

        $scope.cart = vnCart.getCart();
        $scope.deleteCoupon('DSC-5');
        
        expect($scope.cart.discounts.length).toEqual(0);
    });
});
