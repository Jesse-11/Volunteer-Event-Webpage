const db = require('../databases/db.js');

exports.createOrganization = async (req, res) => {
    const { org_name, description } = req.body;
    try {
        await db.query('INSERT INTO Organizations (org_name, description, created_at) VALUES (?, ?, NOW())', [org_name, description]);
        res.status(201).send('Organization created');
    } catch (error) {
        res.status(500).send('Error creating organization');
    }
};

exports.getOrganization = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM Organizations WHERE org_id = ?', [id]);
        res.send(result[0]);
    } catch (error) {
        res.status(500).send('Error retrieving organization');
    }
};

exports.addMember = async (req, res) => {
    const { id } = req.params; // org_id
    const { user_id } = req.body;
    try {
        await db.query('INSERT INTO Memberships (user_id, org_id, joined_at) VALUES (?, ?, NOW())', [user_id, id]);
        res.send('Member added to organization');
    } catch (error) {
        res.status(500).send('Error adding member');
    }
};

exports.getMembers = async (req, res) => {
    const { id } = req.params; // org_id
    try {
        const result = await db.query('SELECT Users.username, Users.email FROM Memberships JOIN Users ON Memberships.user_id = Users.user_id WHERE Memberships.org_id = ?', [id]);
        res.send(result);
    } catch (error) {
        res.status(500).send('Error retrieving members');
    }
};

exports.postUpdate = async (req, res) => {
    const { id } = req.params; // org_id
    const { content, is_private } = req.body;
    try {
        await db.query('INSERT INTO Posts (org_id, author_id, content, is_private, posted_at) VALUES (?, ?, ?, ?, NOW())', [id, req.session.user.user_id, content, is_private]);
        res.send('Post created');
    } catch (error) {
        res.status(500).send('Error creating post');
    }
};