
require('dotenv').config();
const chalk = require('chalk');
const express = require('express');
const path = require('path');
const fs = require('fs');
const passport = require('passport');

// Initailize app
const app = express();

// Configuration
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'app/views'));

app.use(express.static(path.join(__dirname, 'public')));


// Middleware
app.get('/', (req, res) => {
    res.render('index');
});

app.listen(process.env.PORT, () => {
    console.log(
        chalk.white('Listening on Port: ') +
        chalk.bold.green(process.env.PORT) + 
        chalk.white('...')
    );
})