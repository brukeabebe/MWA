angular.module("jobSearch").controller("JobsController", JobsController);


function JobsController(JobFactory)  {
    const vm=  this;
    vm.home=  "List of Jobs";
     vm.count=4
     vm.offset=0
        console.log("vm", vm.searchResults);

     vm.next= function()
     {
        
         vm.offset=vm.offset+4;
            console.log(vm.count, vm.offset)
         JobFactory.getAll(vm.count, vm.offset).then(function (response)  {
            vm.jobs=  response;
            });
     }

     vm.prev= function()
     {
         if(vm.offset>0 && vm.count+vm.offset>0)
         {
    
         vm.offset=vm.offset-4;
         }
            console.log(vm.count, vm.offset)
         JobFactory.getAll(vm.count, vm.offset).then(function (response)  {
            vm.jobs=  response;
            });
     }
    console.log("jobs controller reched");
    JobFactory.getAll(vm.count, vm.offset).then(function (response)  {
    vm.jobs=  response;
    });


    /*
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

    */


    vm.search=function()
    {

        vm.searchResults=true;
        vm.home=  "List of  found Jobsss";
        
        
            query= vm.query;
            JobFactory.searchJob(query).then(function(response)
            {           
                    vm.jobs=response;
                

                    console.log("inside callback" + vm.jobs[0].title)
                    if(vm.jobs)
                    {
                    console.log("some jobs are found based on entery")
                    console.log(vm.jobs)
                   
                    }
                    else
                    {
                        console.log("no jobs found based on entery")
                    }
                   // $location.url("/findJobs");
                    
       
                    
            }).catch(function(err)
            {
                console.log("error with server");
            })
    }
    console.log("vm" ,vm.searchResults)
}
   
