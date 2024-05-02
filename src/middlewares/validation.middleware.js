import { body, validationResult } from "express-validator";

export default async (req, res, next ) => {
    // 1 setup rules
    const rules = [body('name').notEmpty().withMessage("Name field can't be empty!"),
    body('email').isEmail().withMessage("Email is invalid!"),
    body('contact').isMobilePhone().withMessage("Phone is invalid!"),
    body('resume').custom((value, {req}) => {
        if(req.file.mimetype === 'application/pdf'){
            // console.log("Accepted");
            return '.pdf'; // return "non-falsy" value to indicate valid data"
        }else{
            return false; // return "falsy" value to indicate invalid data
        }
    }).withMessage('Please only submit pdf documents.'), // custom error message that will be send back if the file in not a pdf. 
];

    // run rules
    await Promise.all(rules.map(rule=>rule.run(req)));

    // check for errors
    var validationErrors = validationResult(req);

    // if errors, return errors
    if (!validationErrors.isEmpty()){
        return res.status(400).render('job-detail', {errorMessage: validationErrors.array()[0].msg});
    }
    next();
}