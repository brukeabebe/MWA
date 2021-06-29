angular.module("myBreweryApp").controller("BreweryByStateController", BreweryByStateController);
function BreweryByStateController(BreweryFactory, $routeParams) {
const vm= this;

const state= $routeParams.state;




BreweryFactory.getBreweriesByState(state).then(function(response)  {
    vm.breweries=  response;

    
    });




}