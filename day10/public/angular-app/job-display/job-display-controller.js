angular.module("jobSearch").controller("JobController", JobController);
function JobController(JobFactory, $routeParams) {
const vm= this;
const id= $routeParams.id;
JobFactory.getOne(id).then(function(response) {
vm.job= response;
console.log("job controller reached");
///vm.rating= _getStarRating(response.rate);


});

vm.deleteJob = function(id) {
    JobFactory.deleteJob(id).then(function(response) {
      
        console.log("delete successful");
        window.alert("Job Deleted Succesfully");
        window.location.href="#!/";

        
        }).catch(function(error)  {
            window.alert("could not delete game");
            console.log(error);
            });
}

vm.initForm=function()
{
    console.log("initalize form")
    vm.skills=vm.job.skills
    vm.title=vm.job.title
    vm.salary=vm.job.salary
    vm.description=vm.job.description
    vm.experience=vm.job.experience
    vm.postDate=vm.job.postDate
}
vm.updateJob= function(id)
{

     //vm.isUpdating=tr
    const updateData=
    {
        skills: vm.skills,
        title: vm.title,
        salary: vm.salary,
        description: vm.description,
        experience: vm.experience,
        postDate: vm.postDate


    }
    JobFactory.updateJob(id, updateData).then(function(response)
    {
        console.log("update to job details succesfull")
    
        JobFactory.getOne(id).then(function(response) {
            vm.job= response

        })

        

        window.location.href="#!/job/"+vm.job._id;
        vm.isUpdating=false
    })

}
}

function _getStarRating(stars)  {
    return new Array(stars);
    }

