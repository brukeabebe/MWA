angular.module('meanGames').factory('UserFactory', UserFactory);

function UserFactory($http) {
    return {
        login: function (user) {
            return $http.post('/api/auth', user).then(complete).catch(failed);
        }
    }
}

function complete(response) {
    return response.data;
}

function failed(error) {
    return error.status.statusText;
}