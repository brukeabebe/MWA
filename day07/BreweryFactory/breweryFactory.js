angular.module("myBreweryApp").factory("BreweryFactory",  BreweryFactory);
function BreweryFactory($http) {
return {
getBreweriesByState: getBreweriesByState,
getOneBreweryById: getOneBreweryById
};
function getBreweriesByState(state) {
return $http.get("https://api.openbrewerydb.org/breweries/?by_state="+state).then(complete).catch(failed);
}
function getOneBreweryById(bId) {
return $http.get("https://api.openbrewerydb.org/breweries/"+bId).then(complete).catch(failed);
}
function complete(response) {
return response.data;
}
function failed(error)  {
return error.statusText;
}
}