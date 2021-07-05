angular.module("meanGames").controller("GameController", GameController);
function GameController(GameFactory, $routeParams) {
const vm= this;
const id= $routeParams.id;
GameFactory.getOne(id).then(function(response) {
vm.game= response;
console.log("game controller reached");
vm.rating= _getStarRating(response.rate);


});

vm.deleteGame = function(id) {
    GameFactory.deleteGame(id).then(function(response) {
      
        console.log("delete successful");
        window.alert("game Deleted Succesfully");
  
        
        }).catch(function(error)  {
            window.alert("could not delete game");
            console.log(error);
            });
}
}

function _getStarRating(stars)  {
    return new Array(stars);
    }

