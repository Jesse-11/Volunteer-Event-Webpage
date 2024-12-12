
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



// Define user-related routes
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/user/:id', userController.getUserInfo);
router.put('/user/:id', userController.updateUserInfo);

module.exports = router;

