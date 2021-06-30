angular.module("musicApp").controller("SongsController", SongsController);


function SongsController(SongFactory)  {
    const vm=  this;
    vm.title=  "List of Songs";

    console.log("songs controller reched");
    SongFactory.getAll().then(function (response)  {
    vm.songs=  response;
    });
    }