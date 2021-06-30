angular.module("meanGames").controller("GameController", GameController);
function GameController(GameFactory, $routeParams) {
const vm= this;
const id= $routeParams.id;
GameFactory.getOne(id).then(function(response) {
vm.game= response;
console.log("game controller reached");
vm.rating= _getStarRating(response.rate);
});
}

function _getStarRating(stars)  {
    return new Array(stars);
    }