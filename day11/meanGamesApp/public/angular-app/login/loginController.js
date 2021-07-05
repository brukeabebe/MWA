angular.module('meanGames').controller('LoginController', LoginController);




function LoginController($http, $location, $window, AuthFactory) {
    var vm = this;

    vm.isLoggedIn = function () {
        if (AuthFactory.auth.isLoggedIn) {
            return true
        } else {
            return false;
        }
    };
    vm.login = function () {
        if (vm.username && vm.password) {
            var user = {
                username: vm.username,
                password: vm.password
            };
            $http.post("/api/users/login", user).then(function (response) {
                if (response.data.success) {
                    $window.sessionStorage.token = response.data.token;
                    AuthFactory.isLoggedIn = true;
                    console.log( $window.sessionStorage.token)
                }
            }).catch(function (err) {
                console.log(err);
            });
        }
    }
    vm.logout = function () {
        AuthFactory.isLoggedIn = false;
        delete $window.sessionStorage.token;
        $location.path("/");
    }
}