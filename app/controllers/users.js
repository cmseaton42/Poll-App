const mongoose = require('mongoose');
const User = require('../models/users'
)
module.exports.controller = (app) => {


    app.get('/register', (req, res) => {
        res.render('users/register');
    });



}