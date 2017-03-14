

const localStrategy = require('passport-local').Strategy;
const User = require('../models/users');

module.exports = (passport) => {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use('local-registration', new localStrategy({
            passReqToCallback: true
        },
        (req, username, password, done) => {
            User.findOne({ 'username': username }, (err, user) => {
                if (err) return done(err);

                if (user) {
                    return done(null, false, { errors: 'User Already Exists'});
                } else {
                   newUser = new User({
                       f_name: req.body.f_name,
                       l_name: req.body.l_name,
                       email: req.body.email,
                       username: req.body.username
                   });

                   newUser.password = newUser.generateHash(req.body.password);

                   newUser.save((err) => {
                        if (err) throw err;

                        return done(null, newUser);
                   });
                }
            });
        }
    ));

    passport.use('local-login', new localStrategy(
        (username, password, done) => {
            User.findOne({ 'username': username }, (err, user) => {
                if (err) return done(err);

                if (!user) {
                    return done(null, false, { message: 'No User <' + username + '> was Found.' })
                }

                if (!user.validPassword(password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }

                return done(null, user);
            });
        }
    ));
}