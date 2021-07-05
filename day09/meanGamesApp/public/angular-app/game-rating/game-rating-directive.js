angular.module("meanGames").directive("gameRating", GameRating);


function GameRating()
{
        return{
            restrict: "E",
            templateUrl: "angular-app/game-rating/rating.html",
            bindToController: true,
            controller: "GameController",
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