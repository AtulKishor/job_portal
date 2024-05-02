import JobModel from "../models/job.model.js";

export default class JobsController {
    getJobs(req, res) {
        let jobs = JobModel.getJobs();
        if (req.query.filter) {
            const query = req.query.filter.trim().toLowerCase();
            jobs = jobs.filter(job=>job.company.toLowerCase().includes(query));
        } 
        res.render('jobs',{ jobs, userEmail: req.session.userEmail });
    }

    getJobDetails(req, res) {
        const jobId = req.params.id;
        res.render('job-detail', { job: JobModel.getJobById(jobId), userEmail: req.session.userEmail });
    }

    createJob (req, res) {
        res.render("createJob", { userEmail: req.session.userEmail });
    }

    postNewJob (req, res) {
        const newJob = req.body;
        JobModel.addJob(newJob, req.session.userEmail);
        res.redirect("/jobs");
    }

    viewEditForm (req, res) {
        const jobId = req.params.id;
        const job = JobModel.getJobById(jobId);
        if (job.postedBy===req.session.userEmail)
            res.render("editJob", {job, userEmail: req.session.userEmail});
        else
            return res.status(400).json({message: 'Please login as the creator of this job'});
    }

    updateJob (req, res) {
        const jobId = req.params.id;
        const updatedJob = req.body;
        JobModel.updateJobById(jobId, updatedJob);
        res.redirect(`/job/${jobId}`);
    }

    deleteJob (req, res) {
        const jobId = req.params.id;
        if (JobModel.getJobById(jobId).postedBy!==req.session.userEmail)
            return res.status(400).json({message: 'Please login as the creator of this job'});
        JobModel.deleteJobById(jobId);
        res.status(200).json({ message: 'Job deleted successfully', jobId });
    }

    applyToJob (req, res) {
        const jobId = req.params.id;         
        // File upload successful, proceed with applicant creation
        const applicant = req.body;
        const resumePath = req.file ? req.file.path.substring("public".length) : null;
        
        if (!resumePath) {
            // Handle missing file error
            return res.status(400).json({ message: 'Resume file is required' });
        }

        applicant.resume = resumePath;
        JobModel.addApplicant(jobId, applicant);
        res.redirect(`/job/${jobId}`);
    }

    getApplicantsForJob (req, res) {
        const jobId = req.params.id;
        const pageNo = req.params.pageNo;
        const applicants = JobModel.getApplicantsForJob(jobId);
        res.render("applicants", {applicants, userEmail: req.session.userEmail, jobId, pageNo});
    }
};
