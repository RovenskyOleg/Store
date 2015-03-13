angular.module('authService', [])
    .factory('Authenticate', function($http) {
        return {
            login: function(loginData) {
                return $http.post('/login', loginData);
            },
            signup: function(signupData) {
                return $http.post('/signup', signupData);
            },
            changePassword: function(password) {
                return $http.post('/changepass', password);
            }
        }
    })
    .factory('Product', function($http) {
        return {
            create: function(data) {
                return $http.post('/add-product', data);
            },
            edit: function(data) {
                return $http.post('/edit-product', data);
            },
            deleteList: function(data) {
                return $http.post('/delete-products', data);
            },
            get: function(uri, data) {
                return $http.get(uri, data);
            }
        }
    })
    .factory('User', function($http) {
        return {
            update: function(data) {
                return $http.post('/update-user-info', data);
            },
            get: function(uri, data) {
                return $http.get(uri, data);
            }
        }
    })