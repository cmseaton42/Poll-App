

const localStrategy = require('passport-local').Strategy;
const User = require('../models/users');

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    })

    passport.use('local-registration', new localStrategy(
        (username, password, done) => {
            User.find().byUsername(username).exec((err, user) => {
                if (err) return done(err);
                if (user) {
                    return done(nll, false, { message: 'User Exists Already.' })
                } else {
                    let newUser = new User();

                    if (password.length < 8) {
                        return done(nll, false, { message: 'Password Must Contain at 8 Characters.' })
                    }

                    newUser.username = username;
                    newUser.password = newUser.generateHash(password)

                    newUser.save(() => {
                        if (err) throw err;
                        return done(null, newUser);
                    });
                }
            });
        }
    ));

    passport.use('local-login', new localStrategy(
        (username, password, done) => {
            User.find().byUsername(username).exec((err, user) => {
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