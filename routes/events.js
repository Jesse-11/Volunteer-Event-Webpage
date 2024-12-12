const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Define event-related routes

router.get('/events', eventController.listEvents);
router.post('/events', eventController.createEvent);
router.put('/event/:id', eventController.updateEvent);
router.get('/event/:id', eventController.getEvent);
router.delete('/event/:id', eventController.deleteEvent);
router.post('/event/:id/rsvp', eventController.rsvpEvent);
router.get('/event/:id/rsvps', eventController.getEventRSVPs);

module.exports = router;