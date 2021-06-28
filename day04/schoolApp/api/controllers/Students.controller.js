//const studentsData= require("../data/students.json");
//const dbConnection=  require("../data/dbconnection.js");
const mongoose = require("mongoose");

const Student = mongoose.model("Student");


module.exports.studentsGetAll = function (req, res) {


    console.log("GET students");
    


    Student.find().exec(function (err, Students) {
        console.log("found students", Students);
        res.status(200).json(Students);
    });
}

module.exports.studentGetOne = function (req, res) {




    console.log("get student with ID", req.params.studentId)
    const studentId= req.params.studentId;
    Student.findById(studentId).exec(function(err,  student) {
    res.status(200).json(student);
});
}





module.exports.studentsAddOne= function(req, res)
{
    console.log("POST new studnets)");
    console.log(req.body);
        const newStudent={
            name: req.body.name,
            gpa: parseFloat(req.body.gpa),
           // designers: req.body.designers,
           courses: []

        };

        Student.create(newStudent, function(err, student)
        {
           if(err)
           {
               console.log("Error creating students");
               res.status(400).json(err);
           } 
           else{
               console.log("student Created", student);
                res.status(201).json(student);          }
        });
}


module.exports.studentsFullUpdateOne = function (req, res) {
    
    const  studentId=  req.params.studentId;
    console.log("full update", req.params.studentId)
   
    Student.findById(studentId).exec(function(err,  student) {

        const response={
            status: 204,  
            message: student
        };
        
        if(err){
            console.log("error finding student");
            response.status=500;
            response.message=err;
            
        }
        else if(!student)
        {
            response.status=404;
            response.message= {"message"  : "student ID not found"};
        }


        if(response.status!==204){
            console.log("response" , response.message);
            res.status(response.status).json(response.message);
    }

    else{
       

        student.name=req.body.name;
        student.gpa=parseFloat(req.body.gpa);
    
        

        student.save(function(err, updatedStudent)
        {
            if(err)
            {
                response.status=500;
                response.message=err;
            }
            else{
               
                response.message=updatedStudent;
        }
        console.log("fully updated", updatedStudent);

        
        res.status(response.status).json(response.message);
    });

    }
    

           
});
}

module.exports.studentDeleteOne = function (req, res) {
    const  studentId=  req.params.studentId;
    console.log("get student with ID", req.params.studentId)
   
    Student.findByIdAndRemove(studentId).exec(function(err,  deletedstudent) {

        const response={
            status: 200,
            message: "student deleted"
        };
        
        if(err){
            console.log("error finding student");
            response.status=500;
            response.message=err;
            
        }
        else if(!deletedstudent)
        {
            response.status=404;
            response.message= {"message"  : "student ID not found"};
        }

            console.log("response" , response.message)
            res.status(response.status).json(response.message);
});
}
