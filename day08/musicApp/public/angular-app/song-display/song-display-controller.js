angular.module("musicApp").controller("SongController", SongController);
function SongController(SongFactory, $routeParams) {
const vm= this;
const id= $routeParams.id;
SongFactory.getOne(id).then(function(response) {
vm.song= response;
console.log("song controller reached");
vm.rating= _getStarRating(response.rate);
});
}

function _getStarRating(stars)  {
    return new Array(stars);
    }


