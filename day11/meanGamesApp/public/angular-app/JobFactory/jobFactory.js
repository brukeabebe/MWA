

angular.module("jobSearch").factory("JobFactory", JobFactory);

function JobFactory($http) {
    return {
        getAll: getAllJobs,
        getOne: getOneJob,
        addJob: postJob,
        deleteJob : deleteJob,
        updateJob: updateJob,
        searchJob: searchJob
    };

    function getAllJobs(count, offset) {

        console.log("get games here");
        return $http.get("/api/jobs"+"?count="+count+"&offset="+offset).then(complete).catch(failed);
    }

    function getOneJob(id) {
        return $http.get("/api/jobs/" + id).then(complete).catch(failed);
    }

    function searchJob(query)
    {
        return $http.get("/api/search/jobs?description="+query).then(complete).catch(failed);
    }


    function postJob(postData)
    {
        console.log("adding job");
      return  $http.post("/api/jobs/" , postData).then(complete).catch(failed);
    }

    function deleteJob(id)
    {
        console.log("deleting job");
        return  $http.delete("/api/jobs/"+ id).then(complete).catch(failed);
    }
    function updateJob(id, updateData)
    {
        console.log("updating job");
       return   $http.put("/api/jobs/"+id, updateData).then(complete).catch(failed);
    }

}    

    function complete(response) {
      //  console.log(response.data);
        return response.data;
    }

    function failed(error) {
        return error.status.statusText;
    }
