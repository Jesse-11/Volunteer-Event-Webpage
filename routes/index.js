var express = require('express');
var router = express.Router();
const path = require('path');
const userController = require('../controllers/userController');
const authMiddleware = require('../controllers/authMiddleware');





/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* server login page */

router.get('/login', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

/* server settings page */
router.get('/settings', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/settings.html'));

});

//router.post('/signup', userController.signup);
//router.use('/admin', authMiddleware.adminMiddleware);



module.exports = router;