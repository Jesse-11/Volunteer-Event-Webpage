const express = require('express');
const router = express.Router();
const orgController = require('../controllers/orgController');

// Define organization-related routes
router.post('/organization', orgController.createOrganization);
router.get('/organization/:id', orgController.getOrganization);
router.post('/organization/:id/member', orgController.addMember);
router.get('/organization/:id/members', orgController.getMembers);
router.post('/organization/:id/post', orgController.postUpdate);

module.exports = router;