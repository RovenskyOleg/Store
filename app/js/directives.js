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
    .directive('nav-pagination', function() {
        return {
            restrict: 'A',
            templateUrl: 'app/partials/nav-pagination.html'
        }        
    })
    .directive('pagination', function() {
        return {
            restrict: 'A',
            templateUrl: 'app/partials/pagination.html'
        }        
    })