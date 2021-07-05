angular.module('meanGames').controller('RegisterController', RegisterController);


/*
function RegisterController($http, $location) {
    const vm = this;
    vm.register = function () {
        const user = {
            name: vm.name,
            username: vm.username,
            password: vm.password
        }
        if (!vm.password && !vm.username) vm.err = "Please enter password and username"
        else if (vm.password !== vm.passwordRepeat) vm.err = "Passwords do not match"
        else $http.post('/api/users/register', user).then((res) => {
            console.log(res);
            vm.message = 'Successful registration, please login'
            $location.path('/books')
        }).catch((err) => console.log(err))
    }
}

*/


function RegisterController($http) {
    var vm = this;
    vm.register = function ($location) {
        var user = {

            name: vm.name,
            username: vm.username,
            pasword: vm.password
        };
        if (!vm.username || !vm.password) {
            vm.err = "Please add a username and password.";
            console.log("1ster")
        } else {
            if (vm.password !== vm.passwordRepeat) {
                vm.err = "Please make sure the passwords match.";
                console.log("second")
            } else {
                $http.post("/api/users/register", user).then(function (result) {
                    console.log(result);
                    vm.message = "Successful registration, please login.";
                    vm.err = "";
                    $location.path('/')
                }).catch(function (err) {
                    console.log(err);
                });
            }
        }
    }
}