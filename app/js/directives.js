'use strict';

angular.module('directives',[])
    .directive('alertInfo', function() {
        return {
            restrict: 'A',
            templateUrl: 'app/partials/alert-info.html'
        }        
    })
    .directive('userInfo', function() {
        return {
            restrict: 'A',
            templateUrl: 'app/partials/user-info.html'
        }        
    })
    .directive('products', function() {
        return {
            restrict: 'A',
            templateUrl: 'app/partials/products.html'
        }        
    })