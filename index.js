import express from "express";
import path from "path";
import session from "express-sessions";
import cookieParser from "cookie-parser";
import ejsLayouts from "express-ejs-layouts";
import JobController from "./src/controllers/job.controller.js";

const PORT = 3200;
const app = express();

// Jobs controller obj
const jobController = new JobController();

// parse data
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// static files
app.use(express.static('public'));

// set view engine
app.set("view engine","ejs");
app.set("views", path.join(path.resolve(), 'src', 'views'));
app.use(ejsLayouts);

app.get("/", (req,res)=>{
    res.render('home');
});

app.get("/jobs", jobController.getJobs);
app.get("/job/:id", jobController.getJobDetails);

app.listen(PORT, ()=>{
    console.log(`server listening on port ${PORT}`);
})