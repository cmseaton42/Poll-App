const users = require('./users');
const polls = require('./polls');

module.exports = (passport, app) => {
    users.controller(passport, app);
    polls.controller(passport, app);

}
