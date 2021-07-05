angular.module("meanGames").controller("RegisterController", RegisterController);




function RegisterController(UserFactory) {
    const vm = this;
    vm.register = function () {
        const user = {
            name: vm.name,
            username: vm.username,
            password: vm.password
        }
        if (!vm.password && !vm.username) vm.err = "Please enter password and username"
        else if (vm.password !== vm.passwordRepeat) vm.err = "Passwords do not match"
        else UserFactory.register(user).then(function(result) {
            console.log("register", user);
            vm.message = "successfull registration, please login";
            vm.err = "";
        }).catch(function(error) {
            console.log("error", error);
            vm.err = error;
        })
            
    
    }
}