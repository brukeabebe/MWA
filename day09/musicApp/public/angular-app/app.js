
angular.module("musicApp", ['ngRoute']).config(config);
function config($routeProvider) {
$routeProvider.
when("/",  {
    templateUrl:  "angular-app/song-list/song.html",
    controller:"SongsController",
    controllerAs:  "vm"
    })
.when("/song/:id",  {
    templateUrl:  "angular-app/song-display/song-display.html",
    controller: "SongController",
    controllerAs:  "vm"
    })
    
.otherwise({redirectTo: "/"});
}
