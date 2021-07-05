angular.module("meanGames").controller("GamesController", GamesController);


function GamesController(GameFactory)  {
    const vm=  this;
    vm.home=  "List of Games";

    console.log("games controller reched");
    GameFactory.getAll().then(function (response)  {
    vm.games=  response;
    });

    vm.addGame= function() {

        console.log("addGame Reached");
        const postData= {
        title: vm.title,
        price: vm.price,
        rate: vm.rate,
        year: vm.year,
        minPlayers: vm.minPlayers,
        maxPlayers:  vm.maxPlayers,
        minAge: vm.minAge,
        //designers: vm.designers,
        };
     

        if (vm.gameForm.$valid)  {
            GameFactory.addGame(postData).then(function(response){
            console.log("Game saved");
            //

            window.alert("game added successfully");
            }).catch(function(error)  {

                
            window.alert("game failed to add");
            console.log(error);
            });
            } else {
                console.log("invalid form")
            vm.isSubmitted= true;
            }
    }
}