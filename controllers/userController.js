
const db = require('../databases/db'); // Assuming this is the proper db module path in our final repository
const bcrypt = require('bcrypt');


exports.signup = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        // Removed bcrypt hashing and using plain password (not recommended for production)
        await db.query('INSERT INTO Users (username, password, email, is_admin, created_at) VALUES (?, ?, ?, false, NOW())', [username, password, email]);
        res.status(201).send('User registered');
    } catch (error) {
        res.status(500).send('Error registering user');
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await db.query('SELECT * FROM Users WHERE username = ? AND password = ?', [username, password]);
        if (result.length > 0) {
            req.session.user = result[0]; // Set user in session
            res.send('Logged in successfully');
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        res.status(500).send('Error logging in');
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(500).send('Error logging out');
        }
        res.redirect('/');
    })
}

exports.getUserInfo = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT username, email, created_at FROM Users WHERE user_id = ?', [id]);
        res.send(result[0]);
    } catch (error) {
        res.status(500).send('Error retrieving user information');
    }
};

exports.updateUserInfo = async (req, res) => {
    const { id } = req.params;
    const { email } = req.body;
    try {
        await db.query('UPDATE Users SET email = ? WHERE user_id = ?', [email, id]);
        res.send('User information updated');
    } catch (error) {
        res.status(500).send('Error updating user information');
    }
};

