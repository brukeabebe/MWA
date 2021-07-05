angular.module("meanGames").controller("GamesController", GamesController);


function GamesController(GameFactory)  {
    const vm=  this;
    vm.home=  "List of Games";

    console.log("games controller reched");
    GameFactory.getAll().then(function (response)  {
    vm.games=  response;
    });

    vm.search=function()
    {

        vm.searchResults=true;
        vm.home=  "List of  found gamesss";
        
        
            query= vm.query;
            GameFactory.searchGame(query).then(function(response)
            {           
                    vm.games=response;
                

                    console.log("inside callback" + vm.games[0].title)
                    if(vm.games)
                    {
                    console.log("some games are found based on entery")
                    console.log(vm.games)
                   
                    }
                    else
                    {
                        console.log("no games found based on entery")
                    }
                   // $location.url("/findgames");
                    
       
                    
            }).catch(function(err)
            {
                console.log("error with server");
            })
    
    console.log("vm" ,vm.searchResults)
        }

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
     
        vm.isLoggedIn= function()  {
            if (AuthFactory.auth.isLoggedIn)  {return  true;}
            else {return  false;}
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