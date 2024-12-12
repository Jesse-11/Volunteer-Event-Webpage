const express = require('express');
const userController = require('./controllers/userController');
const orgController = require('./controllers/orgController');
const eventController = require('./controllers/eventController');
const adminController = require('./controllers/adminController');
const { authMiddleware, adminMiddleware } = require('./middleware/authMiddleware');

module.exports = function(app) {
    // User routes
    app.post('/signup', userController.signup);
    app.post('/login', userController.login);
    app.get('/user/:id', authMiddleware, userController.getUserInfo);
    app.put('/user/:id', authMiddleware, userController.updateUserInfo);

    // Organization routes
    app.post('/organization', authMiddleware, orgController.createOrganization);
    app.get('/organization/:id', orgController.getOrganization);
    app.post('/organization/:id/member', authMiddleware, orgController.addMember);
    app.get('/organization/:id/members', authMiddleware, orgController.getMembers);
    app.post('/organization/:id/post', authMiddleware, orgController.postUpdate);

    // Event routes
    app.post('/event', authMiddleware, eventController.createEvent);
    app.put('/event/:id', authMiddleware, eventController.updateEvent);
    app.get('/event/:id', eventController.getEvent);
    app.delete('/event/:id', authMiddleware, eventController.deleteEvent);
    app.post('/event/:id/rsvp', authMiddleware, eventController.rsvpEvent);
    app.get('/event/:id/rsvps', authMiddleware, eventController.getEventRSVPs);

};