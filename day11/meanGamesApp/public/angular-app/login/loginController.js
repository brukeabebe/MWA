angular.module('meanGames').controller('LoginController', LoginController);




function LoginController(UserFactory, jwtHelper, $location, $window, AuthFactory) {
    var vm = this;

    vm.isLoggedIn = function () {
        if (AuthFactory.isLoggedIn) {
            console.log("is logged in" ,AuthFactory.isLoggedIn)
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
            UserFactory.login(user).then(function (response) {
                if (response.success) {
                    $window.sessionStorage.token = response.token;
                    AuthFactory.isLoggedIn = true;
                    const token = $window.sessionStorage.token
                    const decodedToken = jwtHelper.decodeToken(token);
                     vm.loggedinUser = decodedToken.name;
                     console.log( "vm.login", vm.loggedinUser )
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