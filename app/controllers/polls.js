const mongoose = require('mongoose');
const Poll = require('../models/polls');
const isAuthorized = require('../Utilities/checkUser');
const validateNewPoll = require('../Utilities/validateNewPoll');
const slugify = require('slugify');

module.exports.controller = (passport, app) => {

    app.get('/polls', (req, res) => {
        Poll.find({}, (err, polls) => {
            if (err) throw err;


            res.render('polls/polls', {
                user: req.user,
                polls: polls
            });

        });
    });

    app.get('/polls/new', isAuthorized, (req, res) => {
        res.render('polls/new', {
            user: req.user
        });
    });

    app.post('/polls/new', isAuthorized, validateNewPoll, (req, res) => {
        Poll.findOne({ title: req.body.title }, (err, poll) => {
            if (err) throw err;

            if (poll) {
                req.flash('error_messages', 'This Poll Already Exists');
                res.redirect('/polls/new');
            } else {
                let newPoll = new Poll();

                newPoll.title = req.body.title
                newPoll.url = slugify(req.body.title);

                for (let option of req.body.options) {
                    let opt = {}
                    opt.text = option;
                    opt.count = 0;

                    newPoll.options.push(opt);
                }

                newPoll.save((err) => {
                    if (err) throw err;

                    req.flash('success_messages', 'New Poll <' + req.body.title + '> Created');
                    res.redirect('/profile');
                });
            }
        });
    });

    app.get('/polls/:poll_slug', (req, res) => {
        Poll.findOne({ url: req.params.poll_slug }, (err, poll) => {
            if (err) throw err;

            res.render('polls/poll', {
                user: req.user,
                poll: poll
            })
        });
        
    })

}