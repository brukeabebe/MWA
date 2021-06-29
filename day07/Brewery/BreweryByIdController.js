angular.module("myBreweryApp").controller("BreweryByIdController", BreweryByIdController);
function BreweryByIdController(BreweryFactory, $routeParams) {
const vm= this;
const bid= $routeParams.bId;
const state= $routeParams.state;




    BreweryFactory.getOneBreweryById(bid).then(function(response)  {
        vm.brewery=  response;

        console.log(response);
        });
    
}