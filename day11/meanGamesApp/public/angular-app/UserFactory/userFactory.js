
angular.module('meanGames').factory('UserFactory', UserFactory);

function UserFactory($http) {
    return {
        login: login,
        register : register
    }




function register (user)
    {
        return $http.post('/api/users/register', user).then(complete).catch(failed);
    }

 function login (user) {
    return $http.post('/api/users/login', user).then(complete).catch(failed);
}

function complete(response) {
    return response.data;
}

function failed(error) {
    return error.status.statusText;
}

}