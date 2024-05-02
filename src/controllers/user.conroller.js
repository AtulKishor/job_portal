import userModel from "../models/user.model.js";

export default class UsersController {
    showHome (req, res) {
        res.redirect("/jobs");
    }

    showRegister (req, res) {
        res.render("register");
    }

    registerUser (req, res) {
        const { name, email, password } = req.body;
        const existingUser = userModel.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).render('login', { message: 'User already exists' });
        }
        const newUser = { name, email, password, role: req.body.recruiter?'recruiter':'seeker' };
        userModel.addUser(newUser);
        res.status(201).redirect("/login");
    }

    showLogin (req, res) {
        res.render("login");
    }

    loginUser (req, res) {
        const { email, password } = req.body;
        const userExists = userModel.userExists(email, password);
        if (userExists) {
            if (userModel.findUserByEmail(email).role==='recruiter') 
                req.session.userEmail = email;
            return res.redirect("/jobs");
        } else {
            return res.status(401).render('login', { message: 'Invalid credentials!' });
        }
    }

    logoutUser (req, res) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: 'Logout failed' });
            }
            res.clearCookie('connect.sid');
            return res.redirect("/login");
        });
    }
};
