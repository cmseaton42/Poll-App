const mongoose = require('mongoose');
const User = require('../models/users');
const checkRegistrationForm = require('../Utilities/validateRegistrationForm');

module.exports.controller = (passport, app) => {

    app.get('/register', (req, res) => {
        res.render('users/register');
    });

    app.post('/register', checkRegistrationForm, passport.authenticate('local-registration', {
        successRedirect: '/', // redirect to the secure profile section
        failureRedirect: '/register', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));
}