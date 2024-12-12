var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bcrypt = require('bcrypt');
var session = require('express-session');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var userRoutes = require('./routes/users');
var eventRoutes = require('./routes/events');
var orgRoutes = require('./routes/organisation');
var adminRoutes = require('./routes/admin');




var app = express();
const port = 3000;



app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.use('/', indexRouter);

app.use('/api', userRoutes);
app.use('/api', eventRoutes);
app.use('/api', orgRoutes);
app.use('/api', adminRoutes);


module.exports = app;