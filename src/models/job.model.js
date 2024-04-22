export default class JobModel {
    constructor (_id, _category, _designation, _location, _company, _salary, _deadline, _skills, _opening, _postdate, _applicants) {
        this.id = _id,
        this.category = _category,
        this.designation = _designation,
        this.location = location,
        this.company = _company,
        this.salary = _salary,
        this.deadline = _deadline,
        this.skills = _skills,
        this.opening = _opening,
        this.postdate = _postdate,
        this.applicants = _applicants
    }
    static getJobs() {
        return jobs;
    }
}

const jobs = [
    {
        id: 1,
        company: "Juspay",
        category: "Tech",
        designation: "SDE",
        location: "Bangalore IND",
        salary: "20-26lpa",
        skills: ["REACT", "NodeJs", "JS", "SQL", "MongoDB", "Express", "AWS"],
        deadline: "30 Sep 2023",
        opening: 5,
        postdate: "4/22/2024, 6:36:01 AM",
        applicants: 4,
    },
    {
        id: 2,
        company: "Coding Ninjas",
        category: "Tech",
        designation: "SDE",
        location: "Gurgaon HR IND Remote",
        salary: "14-20lpa",
        skills: ["REACT", "NodeJs", "JS", "SQL", "MongoDB", "Express", "AWS"],
        deadline: "30 Aug 2023",
        opening: 5,
        postdate: "4/22/2024, 6:36:01 AM",
        applicants: 2,
    },
    {
        id: 3,
        company: "Go Digit",
        category: "Tech",
        designation: "Angular Developer",
        location: "Pune IND On-Site",
        salary: "6-10lpa",
        skills: ["Angular", "JS", "SQL", "MongoDB", "Express", "AWS"],
        deadline: "30 Jan 2024",
        opening: 5,
        postdate: "4/22/2024, 6:36:01 AM",
        applicants: 0,
    }
]