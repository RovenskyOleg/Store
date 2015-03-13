angular.module('auth', ['ngResource', 'ngRoute', 'authCTRL', 'authService'])
  .config(function($routeProvider, $locationProvider, $httpProvider) {
    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user){
        if (user !== '0')
          deferred.resolve();
        else {
          $rootScope.messageError = true;
          $rootScope.message = 'You need to log in.';
          deferred.reject();
          $location.url('/login');
        }
      });

      return deferred.promise;
    };

    $routeProvider
      .when('/', {
        templateUrl: '/app/views/main.html'
      })
      .when('/signup', {
        templateUrl: '/app/views/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/login', {
        templateUrl: '/app/views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/change-pass', {
        templateUrl: '/app/views/changepass.html',
        controller: 'ChangePassCtrl',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .when('/dashboard', {
        templateUrl: '/app/views/dashboard.html',
        controller: 'DashboardCtrl',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .when('/account', {
        templateUrl: '/app/views/account.html',
        controller: 'AccountCtrl',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .when('/products', {
        templateUrl: '/app/views/product.html',
        controller: 'AddProductCtrl',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .when('/edit-product', {
        templateUrl: '/app/views/product.html',
        controller: 'EditProductCtrl',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .otherwise({
        redirectTo: '/' //===== set 404 ==== 
      });    
  }) 
  .run(function($rootScope, $http){
    $rootScope.message = '';

    $rootScope.logout = function(){
      $rootScope.message = 'Logged out.';
      $http.post('/logout');
    };
  })
  .filter('pagination', function() {
      return function(input, start) {
        start = +start;
          return input.slice(start);
      };
    });