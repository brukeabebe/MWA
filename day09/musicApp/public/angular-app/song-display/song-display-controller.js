angular.module("musicApp").controller("SongController", SongController);
function SongController(SongFactory, $routeParams) {
const vm= this;
const id= $routeParams.id;

vm.isDeleted="false";
SongFactory.getOne(id).then(function(response) {
vm.song= response;
console.log("song controller reached");
vm.rating= _getStarRating(response.rate);
});

vm.deleteSong= function(id) {
    SongFactory.deleteSong(id).then(function(response) {
      
        console.log("delete successful");
        
        vm.isDeleted="true"
        window.alert("delete successful");
        
        }).catch(function(error)  {

            window.alert("delete failed");
            console.log(error);
            });;
}
}


function _getStarRating(stars)  {
    return new Array(stars);
    }


