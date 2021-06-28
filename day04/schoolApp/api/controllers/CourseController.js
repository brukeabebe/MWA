const mongoose=require("mongoose");


const Student=mongoose.model("Student");

module.exports.getCourses= function(req,res)
{
    const studentId= req.params.studentId;
    Student.findById(studentId).select("courses").exec(function(err, courses)
    {
        res.status(200).json(courses);
    });
}

module.exports.getCourseById= function(req,res)
{

    const studentId= req.params.studentId;
    const courseNum= req.params.courseNo;
    Student.findById(studentId).select("courses").exec(function(err, courses)
    {


        console.log(courses);
        const course=courses.courses.find(c=>c.courseNo==courseNum);
        res.status(200).json(course);
    });
}