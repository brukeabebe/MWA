angular.module("musicApp").directive("songRating", SongRating);


function SongRating()
{
        return{
            restrict: "E",
            templateUrl: "angular-app/song-rating/rating.html",
            bindToController: true,
            controller: "SongController",
            scope: {
                stars:"@"
            },
            controllerAs: "vm",
        }
/*
        return{
            restrict: "E",
            templateUrl: "angular-app/game-rating/rating.html",
           
            scope: {
                    stars:"@"
            },
            
        }
        */
}

/*
angular.module("meanGames").component("gameRating"
, {
bindings: {
stars: "*"
},
templateUrl: "angular-app/game-rating/rating.html",
controller: "GameController",
controllerAs: "vm",
});
*/