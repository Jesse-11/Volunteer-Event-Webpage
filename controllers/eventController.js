const db = require('../databases/db'); // Ensure the path to db.js is correct based on your project structure

exports.createEvent = async (req, res) => {
    const { org_id, title, description, event_date } = req.body;
    try {
        await db.query('INSERT INTO Events (org_id, title, description, event_date, created_at) VALUES (?, ?, ?, ?, NOW())', [org_id, title, description, event_date]);
        res.status(201).send('Event created successfully');
    } catch (error) {
        console.error('Failed to create event:', error);
        res.status(500).send('Error creating event');
    }
};

exports.updateEvent = async (req, res) => {
    const { id } = req.params; // Event ID from URL
    const { title, description, event_date } = req.body;
    try {
        await db.query('UPDATE Events SET title = ?, description = ?, event_date = ? WHERE event_id = ?', [title, description, event_date, id]);
        res.send('Event updated successfully');
    } catch (error) {
        console.error('Failed to update event:', error);
        res.status(500).send('Error updating event');
    }
};

exports.getEvent = async (req, res) => {
    const { id } = req.params; // Event ID from URL
    try {
        const result = await db.query('SELECT * FROM Events WHERE event_id = ?', [id]);
        if (result.length > 0) {
            res.send(result[0]);
        } else {
            res.status(404).send('Event not found');
        }
    } catch (error) {
        console.error('Failed to retrieve event:', error);
        res.status(500).send('Error retrieving event');
    }
};

exports.deleteEvent = async (req, res) => {
    const { id } = req.params; // Event ID from URL
    try {
        await db.query('DELETE FROM Events WHERE event_id = ?', [id]);
        res.send('Event deleted successfully');
    } catch (error) {
        console.error('Failed to delete event:', error);
        res.status(500).send('Error deleting event');
    }
};

exports.rsvpEvent = async (req, res) => {
    const { id } = req.params; // Event ID from URL
    const { user_id, status } = req.body; // User ID and RSVP status from request body
    try {
        await db.query('INSERT INTO RSVPs (event_id, user_id, status, rsvp_date) VALUES (?, ?, ?, NOW())', [id, user_id, status]);
        res.send('RSVP recorded successfully');
    } catch (error) {
        console.error('Failed to record RSVP:', error);
        res.status(500).send('Error recording RSVP');
    }
};

exports.getEventRSVPs = async (req, res) => {
    const { id } = req.params; // Event ID from URL
    try {
        const result = await db.query('SELECT Users.username, RSVPs.status FROM RSVPs JOIN Users ON RSVPs.user_id = Users.user_id WHERE RSVPs.event_id = ?', [id]);
        res.send(result);
    } catch (error) {
        console.error('Failed to retrieve RSVPs:', error);
        res.status(500).send('Error retrieving RSVPs');
    }
};

exports.listEvents = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM Events');
        res.send(result);
    } catch (error) {
        console.error('Failed to retrieve events:', error);
        res.status(500).send('Error retrieving events');
    }
}