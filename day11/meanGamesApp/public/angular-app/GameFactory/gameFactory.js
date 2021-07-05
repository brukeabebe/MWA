angular.module("meanGames").factory("GameFactory", GameFactory);

function GameFactory($http) {
    return {
        getAll: getAllGames,
        getOne: getOneGame,
        addGame: postGame,
        deleteGame : deleteGame
    };

    function getAllGames() {

        console.log("get games here");
        return $http.get("/api/games").then(complete).catch(failed);
    }

    function getOneGame(id) {
        return $http.get("/api/games/" + id).then(complete).catch(failed);
    }


    function postGame(postData)
    {
        console.log("adding game");
        $http.post("/api/games/" , postData).then(complete).catch(failed);
    }

    function deleteGame(id)
    {
        console.log("adding game");
         $http.delete("/api/games/" + id).then(complete).catch(failed);
    }

    

   

    function complete(response) {
        console.log(response.data);
        return response.data;
    }

    function failed(error) {
        return error.status.statusText;
    }
}