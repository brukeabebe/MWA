angular.module("meanGames").controller("GamesController", GamesController);


function GamesController(GameFactory)  {
    const vm=  this;
    vm.title=  "List of Games";

    console.log("games controller reched");
    GameFactory.getAll().then(function (response)  {
    vm.games=  response;
    });
    }