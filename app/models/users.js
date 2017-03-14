require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require ('bcryptjs');
const Schema = mongoose.Schema;

mongoose.Promise = Promise;

let userSchema = Schema({
    f_name: String,
    l_name: String,
    email: String,
    username: { type: String, unique: true},
    password: String,
    polls: [String],
    timestamp: { type: Date, default: Date.now }
});

userSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null); 
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);