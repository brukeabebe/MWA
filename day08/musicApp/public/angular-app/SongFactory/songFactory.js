angular.module("musicApp").factory("SongFactory", SongFactory);

function SongFactory($http) {
    return {
        getAll: getAllSongs,
        getOne: getOneSong
    };

    function getAllSongs() {

        console.log("get songs here");
        return $http.get("/api/songs").then(complete).catch(failed);
    }

    function getOneSong(id) {
        return $http.get("/api/songs/" + id).then(complete).catch(failed);
    }

    function complete(response) {
        console.log(response.data);
        return response.data;
    }

    function failed(error) {
        return error.status.statusText;
    }
}