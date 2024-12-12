const db = require('../databases/db'); // Database connection

// Function to add a new admin
exports.addAdmin = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        // Assuming admin status is set directly in this function
        await db.query('INSERT INTO Users (username, password, email, is_admin, created_at) VALUES (?, ?, ?, true, NOW())', [username, password, email]);
        res.status(201).send('Admin added successfully');
    } catch (error) {
        console.error('Failed to add admin:', error);
        res.status(500).send('Error adding admin');
    }
};

// Function to add a new user
exports.addUser = async (req, res) => {
    const { username, email, password, is_admin } = req.body;
    try {
        await db.query('INSERT INTO Users (username, email, password, is_admin, created_at) VALUES (?, ?, ?, ?, NOW())', [username, email, password, is_admin]);
        res.status(201).send('User added successfully');
    } catch (error) {
        console.error('Failed to add user:', error);
        res.status(500).send('Error adding user');
    }
};

// Function to update user information by admin
exports.updateUser = async (req, res) => {
    const { id } = req.params; // User ID from URL
    const { username, email, is_admin } = req.body; // New username and email
    try {
        await db.query('UPDATE Users SET username = ?, email = ?, is_admin = ? WHERE user_id = ?', [username, email, is_admin, id]);
        res.send('User information updated successfully');
    } catch (error) {
        console.error('Failed to update user:', error);
        res.status(500).send('Error updating user information');
    }
};

// Function to delete a user
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM Users WHERE user_id = ?', [id]);
        res.send('User deleted successfully');
    } catch (error) {
        console.error('Failed to delete user:', error);
        res.status(500).send('Error deleting user');
    }
};

// Function to manage (add/update/delete) organizations by admin
exports.manageOrganization = async (req, res) => {
    const { action } = req.body; // Action could be 'add', 'update', or 'delete'
    try {
        switch (action) {
            case 'add':
                const { org_name, description } = req.body;
                await db.query('INSERT INTO Organizations (org_name, description, created_at) VALUES (?, ?, NOW())', [org_name, description]);
                res.send('Organization added successfully');
                break;
            case 'update':
                const { org_id, new_org_name, new_description } = req.body;
                await db.query('UPDATE Organizations SET org_name = ?, description = ? WHERE org_id = ?', [new_org_name, new_description, org_id]);
                res.send('Organization updated successfully');
                break;
            case 'delete':
                const { org_id: delete_org_id } = req.body;
                await db.query('DELETE FROM Organizations WHERE org_id = ?', [delete_org_id]);
                res.send('Organization deleted successfully');
                break;
            default:
                res.status(400).send('Invalid action');
        }
    } catch (error) {
        console.error('Failed to manage organization:', error);
        res.status(500).send('Error managing organization');
    }
};

// Function to list all users (admin view)
exports.listUsers = async (req, res) => {
    try {
        const result = await db.query('SELECT user_id, username, email, password, is_admin FROM Users');
        console.log('Users retrived:', result);
        res.json(result);
    } catch (error) {
        console.error('Failed to list users:', error);
        res.status(500).send('Error listing users');
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM Users WHERE user_id = ?', [id]);
        res.send('User deleted successfully');
    } catch (error) {
        console.error('Failed to delete user:', error);
        res.status(500).send('Error deleting user');
    }
}