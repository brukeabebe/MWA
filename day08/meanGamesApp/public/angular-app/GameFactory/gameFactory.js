angular.module("meanGames").factory("GameFactory", GameFactory);

function GameFactory($http) {
    return {
        getAll: getAllGames,
        getOne: getOneGame
    };

    function getAllGames() {

        console.log("get games here");
        return $http.get("/api/games").then(complete).catch(failed);
    }

    function getOneGame(id) {
        return $http.get("/api/games/" + id).then(complete).catch(failed);
    }

    function complete(response) {
        console.log(response.data);
        return response.data;
    }

    function failed(error) {
        return error.status.statusText;
    }
}