// routes/admin.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { isAdmin } = require('../controllers/authMiddleware');



// Admin route to add a new admin
router.post('/admins',  adminController.addAdmin);

// Admin route to update an existing admin
// router.put('/admins/:id',  adminController.updateAdmin);

// Admin route to delete an admin
// router.delete('/admins/:id',  adminController.deleteAdmin);

// Admin route to view all users
router.get('/users', adminController.listUsers); // add isAdmin middleware to protect this route, removed for testing pruposes

// Admin route to update a user's details
router.put('/users/:id', adminController.updateUser); // add isAdmin middleware to protect this route, removed for testing pruposes

// Admin route to delete a user
router.delete('/users/:id', adminController.deleteUser); // add isAdmin middleware to protect this route, removed for testing pruposes

// Admin route to add a user
router.post('/users', adminController.addUser); // add isAdmin middleware to protect this route, removed for testing pruposes




module.exports = router;
