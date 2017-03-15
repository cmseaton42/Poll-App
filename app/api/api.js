const polls = require('./polls');

module.exports = (app) => {
    polls.api(app);
}