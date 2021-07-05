

angular.module("jobSearch").controller("JobAddController", JobAddController);

function JobAddController($window, JobFactory)
{
    let vm = this;
    vm.home= "Add A Job";


    


    vm.addJob= function(){
        console.log("add a job function called")
        const postData={
            title: vm.title,
            salary: vm.salary,
            description: vm.description,
            experience: vm.experience,
            skills: vm.skills,
            postDate: vm.postDate

        }
    

    if(vm.jobForm.$valid)
        {
            JobFactory.addJob(postData).then(function(response)
            {
                console.log("Job is created");
                console.log(postData);
                $window.location.href = "#!/"; 
                console.log("the window given is", $window);
                window.alert("Job Added Succesfully");

            });
        }
    else{
        console.log("invalid form");
        vm.isSubmitted=true;
    }
}
};