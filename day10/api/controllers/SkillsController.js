const mongoose = require("mongoose");
const Job = mongoose.model("Job");



module.exports.skillsGetAll = function (req, res) {

    const jobId = req.params.jobId;
    Job.findById(jobId).exec(function (err, job) {
        const response = {
            status: 200,
            message: ""
        }

        if (err) {
            response.status = 500
            response.message = 'error obtaining data from database'
        } else if (!job) {

            response.status = 404;
            response.message = 'No JOb found with the given ID';
        } else if (!job.skills) {
            response.status = 404;
            response.message = 'No skills listed for the given job'
        } else {

            response.status = 200;
            response.message = job.skills;

        }

        res.status(response.status).json(response.message)
    })
}

module.exports.skillsAddOne = function (req, res) {

    const jobId = req.params.jobId;


    Job.findById(jobId).exec(function (err, job) {
        const response = {
            status: 201,
            message: ""
        }
        if (err) {
            response.status = 500;
            response.message = 'error obtainig job from database'
        } else if (!job) {
            response.status = 400;
            response.message = 'Job id is not found'
        }

        if (job) {
            if (req.query.skill) {
                skill = req.query.skill;

                job.skills.push(skill)

                job.save(function (err, job) {

                    if (err) {

                        response.message = err
                        response.status = 500;

                    } else {

                        response.message = job.skills
                        response.status = 201
                    }
                    res.status(response.status).json(response.message);
                })
            } 
            else {
                response.message = "no skill added to query parameter";
                response.status = 404;
            }
        } 
        else {
            res.status(response.status).json(response.message);
        }
    })


}