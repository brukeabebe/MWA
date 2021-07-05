
angular.module("meanGames", ['ngRoute','angular-jwt']).config(config).run(run);
function config($routeProvider) {
$routeProvider.
when("/",  {
    templateUrl:  "angular-app/welcome-page/welcome.html",
   
    })
.when("/game/:id",  {
    templateUrl:  "angular-app/game-display/game-display.html",
    controller: "GameController",
    controllerAs:  "vm"
    }).
    when('/register', {
        templateUrl: 'angular-app/register/register.html',
        controller: 'RegisterController',
        controllerAs: 'vm',
        access: { restricted: false }
    }).when('/login', {
        templateUrl: 'angular-app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm',
        access: { restricted: false }
    }).
    when('/games', {
        templateUrl: 'angular-app/game-list/game.html',
        controller: 'GamesController',
        controllerAs: 'vm',
        access: { restricted: false }
    }).when('/profile', {
        templateUrl: 'angular-app/profile/profile.html',
        access: { restricted: true }
    })
    
.otherwise({redirectTo: "/"});
}


function run($rootScope, $location, AuthFactory, $window) {
    $rootScope.$on("$routeChangeStart", (event, nextRoute, currentRoute) => {
        if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn) {
            event.preventDefault();
            $location.path('/')
        }
    })
}