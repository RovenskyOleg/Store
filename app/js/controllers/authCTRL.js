angular.module('authCTRL', ['directives', 'ui.bootstrap'])
    .controller('MainCTRL', function($scope, $rootScope, $http, $location) {
        $scope.user = {};
        $scope.product = {};
        $scope.products = {};
        $scope.editing = [];
        $rootScope.message = '';
        $scope.currentPage = 0;
        $scope.countProd = 3;

        $scope.hideSuccesAlert = function() {
            $rootScope.messageSuccess = false;
        };

        $scope.hideErrorAlert = function() {
            $rootScope.messageError = false;
        };

        $scope.editProduct = function(product){
            $scope.product = product;            
        } 
    })

    .controller('AccountCtrl', function($scope, $rootScope, $http, $location, User) {
        //$scope.user = {};
        $rootScope.message = '';

        User.get('/account', $scope.user)
        .success(function(user) {
            $scope.user = user;
        })
        .error(function() {
            $location.url('/');
        });

        $scope.updateUserInfo = function() {
            var userInfo = { local: $scope.user };

            User.update(userInfo)                  
            .success(function(user) {
                $scope.user = user;
            })
            .error(function() {                
                $rootScope.messageError = true;
                $rootScope.message = 'Update profile failed.';
                $location.url('/');
            });  
        };
    })

    .controller('DashboardCtrl', function($scope, $rootScope, $http, $location, Product) {
        $rootScope.message = '';
        
        Product.get('/product',$scope.user)
            .success(function(products) {
                $scope.products = products;
                $scope.countPages();
            })
            .error(function() {
                $location.url('/');
            });

        Product.get('/dashboard',$scope.user)
            .success(function(user) {
                $scope.user = user;

            })
            .error(function() {
                $location.url('/');
            });

        $scope.countPages = function() {
            return Math.ceil($scope.products.length / $scope.countProd);
        };

        $scope.openDscp = function (index) {  
            if($scope.currIndex == index){
                $scope.currIndex = 78;
            }

            $scope.currIndex = index;
        };

        $scope.hideDscp = function () {
            $scope.currIndex = -1;
        };

        $scope.deleteListProd = function() {
            $scope.refresh = [];
            
            _.map($scope.products, function(product){
            if(product.selected){
                $scope.refresh.push(product);
                console.log($scope.refresh);
            }
            });

            var tempProd = _.difference($scope.products, $scope.refresh);
            Product.deleteList(tempProd)
                .success(function(product) {
                    $scope.products = product;
                    
                })
                .error(function() {
                    $location.url('/');
                });  
        };

        $scope.$watch('products',function(newVal, oldVal) {
            $scope.showBtnDelete = false;
                _.map(newVal, function(product){
                if(product.selected){
                    $scope.showBtnDelete = true;
                }
            })
        }, true);
    })

    .controller('AddProductCtrl', function($scope, $rootScope, $http, $location, Product) {
        $scope.product = {};
        $rootScope.message = '';

        $scope.saveProduct = function() {          
            Product.create($scope.product)                 
            .success(function(product) {
                $scope.products = product;
            })
            .error(function() {                
                $rootScope.messageError = true;
                $rootScope.message = 'Update profile failed.';
                $location.url('/');
            });  
        };
        $scope.cancelProduct = function() {
        }
    })

    .controller('EditProductCtrl', function($scope, $rootScope, $http, $location, Product) {
        $scope.saveProduct = function() {          
            Product.edit($scope.product)                 
            .success(function(product) {
                $scope.products = product;
                
            })
            .error(function() { 
                $rootScope.messageError = true;
                $rootScope.message = 'Edit product failed.';
                $location.url('/');
            });  
        };
    })

    .controller('SignupCtrl', function($scope, $rootScope, $http, $location, Authenticate) {
        $scope.user = {};
        $rootScope.message = '';

        $scope.signup = function() {
            Authenticate.signup({
                email: $scope.user.email,
                password: $scope.user.password
            })
            .success(function(user) {
                $location.url('/dashboard');
            })
            .error(function() {
                $rootScope.messageError = true;
                $rootScope.message = 'Registration failed.';
                $location.url('/signup');
            });
        };
    })

    .controller('LoginCtrl', function($scope, $rootScope, $http, $location, Authenticate) {
        $scope.user = {};

        $scope.login = function() {
            Authenticate.login({
                email: $scope.user.email,
                password: $scope.user.password
            })
            .success(function(user) {
                $location.url('/dashboard');
            })
            .error(function() {
                $rootScope.messageError = true;
                $rootScope.message = 'Authentication failed.';      
                $location.url('/login');
            });
        };
    })

    .controller('ChangePassCtrl', function($scope, $rootScope, $http, $location, Authenticate) {
        $rootScope.message = '';

        $scope.changePassword = function() {
        if (($scope.user.newpas === $scope.user.confirmpas && ($scope.user.newpas !== undefined && $scope.user.confirmpas !== undefined)) ) {
            console.log('Hi');
            Authenticate.changePassword($scope.user)
                .success(function(user) {
                    $location.url('/dashboard');
                })
                .error(function() {
                    $rootScope.messageError = true;
                    $rootScope.message = 'Change password failed.';      
                    $location.url('/login');
                });
            } else {
                $rootScope.messageError = true;
                $rootScope.message = 'Password not valid';      
            }            
        };

        $scope.cancelChangePas = function() {
            $location.url('/dashboard');
        }
    })