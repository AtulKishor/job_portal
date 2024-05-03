import express from "express";
import path from "path";
import session from "express-session";
import cookieParser from "cookie-parser";
import ejsLayouts from "express-ejs-layouts";

import JobController from "./src/controllers/job.controller.js";
import UsersController from "./src/controllers/user.conroller.js";
import validationMiddleware from "./src/middlewares/validation.middleware.js";
import authMiddleware from "./src/middlewares/auth.middleware.js";
import { uploadFile } from "./src/middlewares/multer.middleware.js";
import sendMail from "./src/middlewares/email.middleware.js";
import lastVisit from "./src/middlewares/lastVisit.middleware.js";

const PORT = 3200;
const app = express();
// Set up session middleware
app.use(session({
    secret: 'jobportal_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Jobs and Users controller obj
const jobController = new JobController();
const userController = new UsersController();

// parse data
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(lastVisit);

// static files
app.use(express.static('public'));

// set view engine
app.set("view engine","ejs");
app.set("views", path.join(path.resolve(), 'src', 'views'));
app.use(ejsLayouts);

// Landing Page
app.get("/", userController.showHome);

// Job routes ==>

app.get("/jobs", jobController.getJobs);
app.get("/job/:id", jobController.getJobDetails);
// Create job route
app.get("/createjob", authMiddleware, jobController.createJob)
app.post('/job', authMiddleware, validationMiddleware, jobController.postNewJob);
// Update job route
app.get("/job/:id/update/", authMiddleware, jobController.viewEditForm)
app.post("/job/:id", authMiddleware, validationMiddleware, jobController.updateJob);
// Delete job route
app.delete('/job/:id', authMiddleware, jobController.deleteJob);
// Apply to job route
app.post("/apply/:id", uploadFile, validationMiddleware, sendMail, jobController.applyToJob);

// register route
app.get("/register", userController.showRegister);
app.post('/register', validationMiddleware, userController.registerUser);

// Login user route
app.get("/login", userController.showLogin);
app.post('/login', validationMiddleware, userController.loginUser);

// Logout user route
app.get('/logout', userController.logoutUser);

// applicant route
app.get("/job/:id/applicants/:pageNo", authMiddleware, jobController.getApplicantsForJob);
app.post("/job/:id/applicants", authMiddleware, jobController.getApplicantsForJob);
app.get("/job/:id/applicant/:applicantId", authMiddleware, jobController.getApplicantsForJob);
app.delete("/job/:id/applicant/:applicantId", authMiddleware, jobController.getApplicantsForJob);

app.get("/404", (req, res)=>{
    res.render('error404');
});

app.listen(PORT, ()=>{
    console.log(`server listening on port ${PORT}`);
})
