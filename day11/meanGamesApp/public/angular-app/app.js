
angular.module("jobSearch", ['ngRoute']).config(config);
function config($routeProvider) {
$routeProvider.
when("/",  {
    templateUrl:  "angular-app/job-list/jobs.html",
    controller:"JobsController",
    controllerAs:  "vm"
    }).
    
when("/job/:id",  {
    templateUrl:  "angular-app/job-display/job-display.html",
    controller: "JobController",
    controllerAs:  "vm"
    })
    .when("/addJob", {
        templateUrl: "angular-app/add-job/add-job.html",
        controller: "JobAddController",
        controllerAs: "vm"

    })
    .otherwise({redirectTo: "/"});
}
