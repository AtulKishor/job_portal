import { body, validationResult } from "express-validator";

export default async (req, res, next ) => {
    // 1 setup rules
    let rules;
    if (req.path.startsWith('/apply')) {
        rules = [body('name').notEmpty().withMessage("Name field can't be empty!"),
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
    ]
    } else if (req.path.startsWith('/register')) {
        rules = [body('name').notEmpty().withMessage("Name field can't be empty!"),
        body('email').isEmail().withMessage("Email is invalid!"),        
        body('password').isLength({min: 4}).withMessage("Password too short!"),
        body('role').notEmpty().withMessage("Please select a role!")
    ]
    } else if (req.path.startsWith('/login')) {
        rules = [body('password').isLength({min: 4}).withMessage("Password too short!"),
        body('email').isEmail().withMessage("Email is invalid!")
    ]
    } else if (req.path.startsWith('/job')) {
        rules = [body('title').notEmpty().withMessage("Job Designation field can't be empty!"),
        body('category').notEmpty().withMessage("Job Category field can't be empty!"),
        body('location').notEmpty().withMessage("Location field can't be empty!"),
        body('company').notEmpty().withMessage("Company field can't be empty!"),
        body('package').notEmpty().withMessage("Package field can't be empty!"),

        body('creationDate').notEmpty().withMessage('Created On date is required')
        .isDate().withMessage('Invalid date format'),
        body('applyBy').notEmpty().withMessage('Apply By date is required')
        .isDate().withMessage('Invalid date format')
        .isAfter(body('createdOn').toString()).withMessage('Apply By date must be after Created On date'),

        body('skillsRequired').notEmpty().withMessage("Job skillsRequired field can't be empty!")
        .isString().withMessage('Skills must be a string'),
        body('openings').notEmpty().withMessage('Number of Openings is required')
        .isNumeric().withMessage('Number of Openings must be a number')];
    } else {
        console.log('Invalid route');
        throw new Error("Form body invalid");
    }


    // run rules
    await Promise.all(rules.map(rule=>rule.run(req)));

    // check for errors
    var validationErrors = validationResult(req);

    // if errors, return errors
    if (!validationErrors.isEmpty()){
        return res.status(400).json({errorMessage: validationErrors.array()[0].msg});
    }
    next();
}