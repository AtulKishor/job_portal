const jobs = [
    {
        id: 1,
        company: "Juspay",
        category: "Tech",
        title: "SDE",
        location: "Bangalore IND",
        package: "20-26lpa",
        skillsRequired: ["REACT", "NodeJs", "JS", "SQL", "MongoDB", "Express", "AWS"],
        applyBy: "30 Sep 2023",
        openings: 5,
        creationDate: "4/22/2024, 6:36:01 AM",
        applicants: [],
        postedBy: "Atul",
    },
    {
        id: 2,
        company: "Coding Ninjas",
        category: "Tech",
        title: "SDE",
        location: "Gurgaon HR IND Remote",
        package: "14-20lpa",
        skillsRequired: ["REACT", "NodeJs", "JS", "SQL", "MongoDB", "Express", "AWS"],
        applyBy: "30 Aug 2023",
        openings: 5,
        creationDate: "4/22/2024, 6:36:01 AM",
        applicants: [],
        postedBy: "Atul",
    },
    {
        id: 3,
        company: "Go Digit",
        category: "Tech",
        title: "Angular Developer",
        location: "Pune IND On-Site",
        package: "6-10lpa",
        skillsRequired: ["Angular", "JS", "SQL", "MongoDB", "Express", "AWS"],
        applyBy: "30 Jan 2024",
        openings: 5,
        creationDate: "4/22/2024, 6:36:01 AM",
        applicants: [],
        postedBy: "Atul",
    }
]

export default class JobModel {
    getJobs() {
        return jobs;
    }
    // Get a job by ID
    getJobById (id) {
        const job = jobs.find(job => job.id === id);
        return job;
    }
    // Add a new job
    addJob (job, recruiter) {
        jobs.push({...job, id: crypto.randomUUID(), applicants: [], postedBy: recruiter});
    }
    // Update a job by ID
    updateJobById (id, updatedJob) {
        const index = jobs.findIndex(job => job.id === id);
        if (index !== -1) {
            jobs[index] = { ...jobs[index], ...updatedJob };
        }
    }
    // Delete a job by ID
    deleteJobById (id){
        const index = jobs.findIndex(job => job.id === id);
        if (index !== -1) {
            jobs.splice(index, 1);
        }
    }
    // Add applicant to a job
    addApplicant (jobId, applicant) {
        const job = jobs.find(job => job.id === jobId);
        if (job) {
            applicant.id = crypto.randomUUID();
            job.applicants.push(applicant);
        } else {
            throw new Error('Job not found');
        }
    }

    // Get applicants for a job by ID
    getApplicantsForJob (id) {
        const job = jobs.find(job => job.id === id);
        if (job) {
            return job.applicants;
        } else {
            throw new Error('Job not found');
        }
    }
}
