const mongoose = require('mongoose');
const User = require('../models/users');
const checkRegistrationForm = require('../utilities/validateRegistrationForm');

module.exports.controller = (passport, app) => {

    app.get('/register', (req, res) => {
        res.render('users/register', {
            user: req.user
        });
    });

    app.post('/register', checkRegistrationForm, passport.authenticate('local-registration', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/register', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    app.get('/login', (req, res) => {
        res.render('users/login', {
            user: req.user
        });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    app.get('/profile', (req, res) => {
        res.render('users/profile', {
            user: req.user
        });
    });

    app.get('/logout', function (req, res) {
        req.logout();

        req.flash('success_messages', 'You are logged out');
        res.redirect('/login');
    });
}