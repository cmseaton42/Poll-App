
const fs = require('fs');
const users = require('./users');

module.exports = (app) => {
    // fs.readdirSync('./controllers').forEach(function (file) {
    //     if (file.substr(-3) == '.js') {
    //         route = require('./controllers/' + file);
    //         route.controller(app);
    //     }
    // });

    users.controller(app);

}