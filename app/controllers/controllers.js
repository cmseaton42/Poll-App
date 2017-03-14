
const fs = require('fs');
const users = require('./users');
const polls = require('./polls');

module.exports = (passport, app) => {
    // fs.readdirSync('./controllers').forEach(function (file) {
    //     if (file.substr(-3) == '.js') {
    //         route = require('./controllers/' + file);
    //         route.controller(app);
    //     }
    // });

    users.controller(passport, app);
    polls.controller(passport, app);

}
