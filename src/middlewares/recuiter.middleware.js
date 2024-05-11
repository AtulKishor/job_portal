export default (req, res, next) => {
    // Check if the user is authenticated
    if (req.session.userEmail) {
        // If authenticated, redirect to the jobs page
        return res.redirect('/jobs');
    }
    // If not authenticated, proceed to the next middleware or route handler
    next();
};
