const express=require("express");
const controllerStudents= require("../controllers/Students.controller.js");
const controllerCourses= require("../controllers/CourseController.js");
const router= express.Router();

router.route("/students").get(controllerStudents.studentsGetAll).
post(controllerStudents.studentsAddOne);

router.route("/students/:studentId")
.get(controllerStudents.studentGetOne).
put(controllerStudents.studentsFullUpdateOne)
.delete(controllerStudents.studentDeleteOne);

router.route("/students/:studentId/courses").get(controllerCourses.getCourses);

router.route("/students/:studentId/courses/:courseNo").get(controllerCourses.getCourseById);



module.exports= router;
