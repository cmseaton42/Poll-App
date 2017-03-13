// Load Environmental Variables
require('dotenv').config();

// Load NPM Modules
const chalk = require('chalk');
const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

// Load User Modules
const loadControllers = require('./app/controllers/controllers')

// Initailize app
const app = express();

// Configuration
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'app/views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'Shhhhhhhh, Its a Secret Bro', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Include All Route Controllers
loadControllers(app);

// Send Landing/Home Page
app.get('/', (req, res) => {
    res.render('index');
})

app.listen(process.env.PORT, () => {
    console.log(
        chalk.white('Listening on Port: ') +
        chalk.bold.green(process.env.PORT) +
        chalk.white('...')
    );
})