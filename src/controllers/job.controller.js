import JobModel from "../models/job.model.js";

export default class JobsController {
    getJobs(req, res) {
        let jobs = JobModel.getJobs();
        res.render('jobs',{ jobs });
    }
    getJobDetails(req, res) {
        const jobId = req.params.id;
        res.render('jobDetail', {job: JobModel.getJobs().find(job=>job.id==jobId)});
    }
}