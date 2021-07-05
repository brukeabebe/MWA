

const mongoose = require("mongoose");

const Job = mongoose.model("Job");




module.exports.jobsSearchBy = function (req, res) {

    var offset = 0;
    var count = 19;
    const maxCount = 28;

    console.log("GET jobs");
    console.log(req.query);

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);

    }

    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);

    }
    console.log(count);

    if (isNaN(offset) || isNaN(count)) {
        res.status(400).json({
            "message": "QueryString  Offset and Count should be numbers"
        });
        return;
    }

    if (count > maxCount) {
        res.status(400).json({
            "message": "Cannot exceed count of " + maxCount
        });
        return;
    }

    console.log("print query params", req.query.description);
    Job.find(req.query).skip(offset).limit(count).exec(function (err, jobs) {
        if (err) {
            console.log("Error  finding jobs");
            res.status(500).json(err);
        } else {
            if(jobs.length===0)
            {

                res.status(200).json();
                console.log("enter here")

            }
            else{
            console.log("Found jobs");
            res.status(200).json(jobs);
            console.log(jobs);
            }
        }

        // console.log("found games", games);
        // res.status(200).json(games);
    });
    }

module.exports.jobsGetAll = function (req, res) {

    var offset= 0;
    var count=10;
    //const maxCount= 28;

    console.log("GET jobs");
    console.log(req.query);

    if (req.query && req.query.offset)  {
        offset= parseInt(req.query.offset,  10);

        }

        if (req.query && req.query.count)  {
            count= parseInt(req.query.count,  10);
            
         }
    console.log(count);

    if (isNaN(offset)  || isNaN(count))  {
        res.status(400).json({"message":  "QueryString  Offset and Count should be numbers"});
        return;
        }

        


  if (count > maxCount) {
         res.status(400).json({"message":  "Cannot exceed count of "+   maxCount});
        return;
          }

    Job.find().skip(offset).limit(count).exec(function (err, jobs) {
        if (err)  {
            console.log("Error  finding jobs");
            res.status(500).json(err);
            } else {
            console.log("Found jobs");
            res.status(200).json(jobs);
            }

       // console.log("found games", games);
       // res.status(200).json(games);
    });
}


module.exports.jobsGetOne = function (req, res) {
    const  jobId=  req.params.jobId;
    console.log("get Job with ID", req.params.jobId)
   
    Job.findById(jobId).exec(function(err,  job) {


        console.log(job);
        const response={
            status: 200,
            message: job
        };
        
        if(err){
            console.log("error finding job");
            response.status=500;
            response.message=err;
            
        }
        else if(!job)
        {
            response.status=404;
            response.message= {"message"  : "job ID not found"};
        }
        
            console.log("response" , response.message)
            res.status(response.status).json(response.message);
});
}

module.exports.jobsFullUpdateOne = function (req, res) {
    const  jobId=  req.params.jobId;
    console.log("full update", req.params.jobId)
   
    Job.findById(jobId).exec(function(err,  job) {

        const response={
            status: 200,  
            message: job
        };
        
        if(err){
            console.log("error finding job");
            response.status=500;
            response.message=err;
            
        }
        else if(!job)
        {
            response.status=404;
            response.message= {"message"  : "job ID not found"};
        }


        if(response.status!==200){
            console.log("response" , response.message);
            res.status(response.status).json(response.message);
    }

    else{

        console.log("body for update", req.body);

        const sk=req.body.skills;
        let skillsArray=[];
        if(sk.includes(","))// if multiple skills added
        {
            skillsArray=sk.split(',');
        }
        else if(sk) //if one skill added
        {
             skillsArray.push(sk);
        }

       

        job.title= req.body.title;
        job.salary=parseFloat(req.body.salary);
        job.description= req.body.description;
        job.experience= req.body.experience;
        job.postDate=req.body.postDate;
        job.skills=skillsArray;
       
        job.location= {address:"", coordinates:""};

        job.save(function(err, updatedJob)
        {
            if(err)
            {
                response.status=500;
                response.message=err;
            }
            else{
               
                response.message=updatedJob;
        }
        console.log("fully updated", updatedJob);

        res.status(response.status).json(response.message);
        console.log(response.message);
       
    });
  
    }
    

           
});


}

module.exports.jobsPartialUpdateOne = function (req, res) {
    const  jobId=  req.params.jobId;
    console.log("fully update", req.params.jobId)
   
    Job.findById(jobId).exec(function(err,  job) {

        const response={
            status: 200,  
            message: job
        };
        
        if(err){
            console.log("error finding job");
            response.status=500;
            response.message=err;
            
        }
        else if(!job)
        {
            response.status=404;
            response.message= {"message"  : "Job ID not found"};
        }


        if(response.status!==200){
            console.log("response" , response.message);
            res.status(response.status).json(response.message);
    }

    else{
        if (req.body.title) {
             job.title = req.body.title;
        }

        if (req.body.salary) {
            job.salary = parseFloat(req.body.salary);
        }

        if (req.body.description) {
            job.description = req.body.description;
        }

        if(req.body.postDate)
        {
            job.postDate=req.body.postDate;
        }


        if (req.body.experience) {
            job.experience = req.body.experience;
        }

        if(req.body.skills)
        {
            sk= req.body.skills;
            let skillsArray=[];

            if(sk.includes(","))
            {
                skillsArray= sk.split(',');
            }

            else if(sk)
            {
                skillsArray.push(sk);
            }
        
            job.skills=skillsArray;
            

        }

        job.save(function(err, updatedJob)
        {
            if(err)
            {
                response.status=500;
                response.message=err;
            }
            else{
               
                response.message=updatedJob;
        }
        console.log(response.message);
        console.log("updated Job");
        res.status(response.status).json(response.message);
    });

    }
    

           
});

}


module.exports.jobsAddOne= function(req, res)
{
    console.log("POST new JOb)");
    console.log(req.body);

        const sk=req.body.skills;
        let skillsArray=[];
        if(sk.includes(","))// if multiple skills added
        {
            skillsArray=sk.split(',');
        }
        else if(sk) //if one skill added
        {
             skillsArray.push(sk);
        }
        const newJob={
            title: req.body.title,
            salary: parseFloat(req.body.salary),
            description: req.body.description,
            experience: req.body.experience,    
            postDate: req.body.postDate,
           // designers: req.body.designers,
           location: {address:"",coordinates: ""},
            skills: skillsArray

        };

        Job.create(newJob, function(err, job)
        {
           if(err)
           {
               console.log("Error creating jobs");
               res.status(400).json(err);
           } 
           else{
               console.log("Job Created", job);
                res.status(201).json(job);          }
        });
}

module.exports.JobsDeleteOne = function (req, res) {
    const  jobId=  req.params.jobId;
    console.log("get job with ID", req.params.jobId)
   
    Job.findByIdAndRemove(jobId).exec(function(err,  deletedjob) {

        const response={
            status: 200,
            message: "job deleted"
        };
        
        if(err){
            console.log("error finding job");
            response.status=500;
            response.message=err;
            
        }
        else if(!deletedjob)
        {
            response.status=404;
            response.message= {"message"  : "Job ID not found"};
        }

            console.log("response" , response.message)
            res.status(response.status).json(response.message);
});
}
