export default (req, res, next) => {
    // Check if the user is authenticated
    if (!req.session.userEmail) {
        // If not authenticated, redirect to the login page
        return res.redirect('/404');
    }
    // If authenticated, proceed to the next middleware or route handler
    next();
};
