angular.module("musicApp").factory("SongFactory", SongFactory);

function SongFactory($http) {
    return {
        getAll: getAllSongs,
        getOne: getOneSong,
        addSong: postSong,
        deleteSong : deleteSong
    };

    function getAllSongs() {

        console.log("get songs here");
        return $http.get("/api/songs").then(complete).catch(failed);
    }

    function getOneSong(id) {
        return $http.get("/api/songs/" + id).then(complete).catch(failed);
    }

    function deleteSong(id) {
        return $http.delete("/api/songs/" + id).then(complete).catch(failed);
    }

    function postSong(postData) {
        return $http.post("/api/songs/", postData).then(complete).catch(failed);
    }

    function completeDel(response) {
        window.alert("delete successful");
        console.log(response.data);
        
        return response.data;
    }
    function failedDel(response) {
        window.alert("delete failed");
        console.log(response.data);
        return response.data;
    }

    function complete(response) {
        console.log(response.data);
        return response.data;
    }

    function failed(error) {
        return error.status.statusText;
    }
}