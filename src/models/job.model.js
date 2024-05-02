const jobs = [
    {
        id: '1',
        company: "Juspay",
        category: "Tech",
        title: "SDE",
        location: "Bangalore IND",
        package: "20-26lpa",
        skillsRequired: "REACT NodeJs JS SQL MongoDB Express AWS",
        applyBy: "2023-05-12",
        openings: 5,
        creationDate: "2024-04-07",
        applicants: [],
        postedBy: "atul@gmail.com",
    },
    {
        id: '2',
        company: "Coding Ninjas",
        category: "Tech",
        title: "SDE",
        location: "Gurgaon HR IND Remote",
        package: "14-20lpa",
        skillsRequired: "REACT NodeJs JS SQL MongoDB Express AWS",
        applyBy: "2023-08-08",
        openings: 5,
        creationDate: "2024-12-13",
        applicants: [],
        postedBy: "atul@gmail.com",
    },
    {
        id: '3',
        company: "Go Digit",
        category: "Tech",
        title: "Angular Developer",
        location: "Pune IND On-Site",
        package: "6-10lpa",
        skillsRequired: "Angular JS SQL MongoDB Express AWS",
        applyBy: "2024-01-01",
        openings: 5,
        creationDate: "2024-04-22",
        applicants: [],
        postedBy: "atul@gmail.com",
    }
]

export default class JobModel {
    static getJobs() {
        return jobs;
    }
    // Get a job by ID
    static getJobById (id) {
        const job = jobs.find(job => job.id === id);
        return job;
    }
    // Add a new job
    static addJob (job, recruiter) {
        jobs.push({...job, id: crypto.randomUUID(), applicants: [], postedBy: recruiter});
    }
    // Update a job by ID
    static updateJobById (id, updatedJob) {
        const index = jobs.findIndex(job => job.id === id);
        if (index !== -1) {
            jobs[index] = { ...jobs[index], ...updatedJob };
        }
    }
    // Delete a job by ID
    static deleteJobById (id){
        const index = jobs.findIndex(job => job.id === id);
        if (index !== -1) {
            jobs.splice(index, 1);
        }
    }
    // Add applicant to a job
    static addApplicant (jobId, applicant) {
        const job = jobs.find(job => job.id === jobId);
        if (job) {
            applicant.id = crypto.randomUUID();
            job.applicants.push(applicant);
        } else {
            throw new Error('Job not found');
        }
    }

    // Get applicants for a job by ID
    static getApplicantsForJob (id) {
        const job = jobs.find(job => job.id === id);
        if (job) {
            return job.applicants;
        } else {
            throw new Error('Job not found');
        }
    }
}
