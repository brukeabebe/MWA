const express=require("express");
const controllerJobs= require("../controllers/JobsController.js");
//const controllerLocation= require("../controllers/LocationController.js");

const controllerSkills= require("../controllers/SkillsController.js");
const router= express.Router();

router.route("/jobs").get(controllerJobs.jobsGetAll).post(controllerJobs.jobsAddOne);

router.route("/jobs/:jobId")
.get(controllerJobs.jobsGetOne)
.put(controllerJobs.jobsFullUpdateOne)
.patch(controllerJobs.jobsPartialUpdateOne)
.delete(controllerJobs.JobsDeleteOne);


router.route("/search/jobs")
.get(controllerJobs.jobsSearchBy)


router.route("/jobs/:jobId/skills")
.get(controllerSkills.skillsGetAll)
.post(controllerSkills.skillsAddOne);



//user routes



module.exports= router;
