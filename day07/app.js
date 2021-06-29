
angular.module("myBreweryApp", ['ngRoute']).config(config);
function config($routeProvider) {
$routeProvider.when("/", {
templateUrl: "main/main.html"
,controller: "MainController"
,controllerAs: "MainCtrl"})
.when("/Brewery/:bId", {
    templateUrl: "Brewery/BreweryById.html",
    controller: "BreweryByIdController",
    controllerAs: "BreweryIdCtrl"})
.when("/Brewery_state/:state", {
    templateUrl: "Brewery/BreweryByState.html",
    controller: "BreweryByStateController",
    controllerAs: "BreweryStateCtrl"})
    
.otherwise({redirectTo: "/"});
}
