angular.module("musicApp").controller("SongsController", SongsController);


function SongsController(SongFactory)  {
    const vm=  this;
    vm.home=  "List of Songs";
    
    console.log("songs controller reched");
    SongFactory.getAll().then(function (response)  {
    vm.songs=  response;
    });


    vm.addSong= function() {

        console.log("addSong Reached");
        const postData= {
        title: vm.title,
        length: vm.length,
        rate: vm.rate,
        year: vm.year,
        genre: vm.genre,
        };
     

        if (vm.songForm.$valid)  {
            SongFactory.addSong(postData).then(function(response){
            console.log("Song is added");
            window.alert("song Succesfully added");
          
            }).catch(function(error)  {

                window.alert("song  deleted Succesfully");
            console.log(error);
            });
            } else {
                console.log("invalid form")
            vm.isSubmitted= true;
            }
    }
    }