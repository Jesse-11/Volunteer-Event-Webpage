// authMiddleware.js
function authMiddleware(req, res, next) {
    // Placeholder for authentication logic
    // Check for a valid session or token
    if (req.session.user) {
        next();
    } else {
        res.status(401).send('Not authenticated');
    }
}

function adminMiddleware(req, res, next) {
    // Assuming admin status is marked in the session
    if (req.session.user && req.session.user.is_admin) {
        next();
    } else {
        res.status(403).send('Not authorized');
    }
}

function isAdmin(req, res, next) {
    if (req.session.user && req.session.user.is_admin) {
        next();
    } else {
        res.status(403).send('Not authorized');
    }
}

function isLoggedIn(req, res, next) {
    res.locals.isLoggesIn = !!req.session.user;
    res.locals.user = req.session.user || null;
    next();
}

module.exports = { authMiddleware, adminMiddleware , isAdmin, isLoggedIn};