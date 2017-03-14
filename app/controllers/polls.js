const mongoose = require('mongoose');
const Poll = require('../models/polls');
const isAuthorized = require('../Utilities/checkUser');
const validateNewPoll = require('../Utilities/validateNewPoll');

module.exports.controller = (passport, app) => {

    app.get('/polls', (req, res) => {
        res.send('Here are some Polls');
    });

    app.get('/polls/new', isAuthorized, (req, res) => {
        res.render('polls/new', {
            user: req.user
        });
    });

    app.post('/polls/new', isAuthorized, validateNewPoll, (req, res) => {
        console.log(req.body.title);
        console.log(req.body.options);
        res.end();
    })

}