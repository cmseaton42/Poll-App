// Load Environmental Variables
require('dotenv').config();

// Load NPM Modules
const chalk = require('chalk');
const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

// Load User Modules
const loadControllers = require('./app/controllers/controllers');
const buildPassport = require('./app/config/authorization');
const initializeApis = require('./app/api/api');

// Initailize app
const app = express();


// Configuration
mongoose.connect(process.env.DB_URI);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'app/views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(validator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
app.use(session({ secret: 'Shhhhhhhh, Its a Secret Bro', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function(req, res, next){
    res.locals.success_messages = req.flash('success_messages');
    res.locals.error_messages = req.flash('error_messages');
    next();
});

// Send to Landing/Home Page
app.get('/', (req, res) => {
    res.render('index', {
        user: req.user
    });
})

// Dynamic Initializations
buildPassport(passport);
loadControllers(passport, app);
initializeApis(app);

app.listen(process.env.PORT, () => {
    console.log(
        chalk.white('Listening on Port: ') +
        chalk.bold.green(process.env.PORT) +
        chalk.white('...')
    );
})