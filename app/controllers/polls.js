const mongoose = require('mongoose');
const Poll = require('../models/polls');
const isAuthorized = require('../utilities/validateUser');
const validateNewPoll = require('../utilities/validateNewPoll');
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
                newPoll.creator = req.user.username;

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

    app.post('/polls/:poll_slug', (req, res) => {
        const choice = req.body.selection;
        const userIP = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

        Poll.findOne({ url: req.params.poll_slug }, (err, poll) => {
            if (err) throw err;
            let newUser = true;
            console.log(req.user);

            for (let voted of poll.user_votes) {
                if (req.user) {
                    if (req.user.username === voted) {
                        newUser = false;
                    }
                } else if (userIP === voted) {
                    newUser = false;
                }
            }

            console.log(newUser);

            if (newUser) {
                for (let option of poll.options) {
                    if (option.text == choice) {
                        option.count += 1;
                        break;
                    }
                }

                if (req.user) {
                    poll.user_votes.push(req.user.username);
                } else {
                    poll.user_votes.push(userIP);
                }


                poll.save((err) => {
                    req.flash('success_messages', 'You have Successfully Cast your Vote =]');
                    res.redirect('/polls/' + req.params.poll_slug);
                });
            } else {
                req.flash('error_messages', 'You Have Already Voted on this Poll !!!')
                res.redirect('/polls/' + req.params.poll_slug);
            }

        });
    });

    app.get('/polls/:poll_slug', (req, res) => {
        Poll.findOne({ url: req.params.poll_slug }, (err, poll) => {
            if (err) throw err;

            res.render('polls/poll', {
                user: req.user,
                poll: poll
            });
        });
    });

}