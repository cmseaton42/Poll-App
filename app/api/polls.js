const mongoose = require('mongoose');
const Poll = require('../models/polls');
const isAuthorized = require('../utilities/validateUser');
const validateNewPoll = require('../utilities/validateNewPoll');
const slugify = require('slugify');

module.exports.api = (app) => {

    app.get('/api/polls', (req, res) => {
        Poll.find().select('title url options creator').sort('-timestamp').exec((err, polls) => {
            if (err) throw err;

            res.json(polls);
        });
    });

    app.get('/api/polls/:poll_slug', (req, res) => {
        Poll.findOne({ url: req.params.poll_slug })
            .select('title url options creator')
            .exec((err, poll) => {
                if (err) throw err;

                res.json(poll);
            });
    });
}
