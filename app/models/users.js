require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require ('bcryptjs');
const Schema = mongoose.Schema;

mongoose.Promise = Promise;

let userSchema = Schema({
    f_name: String,
    l_name: String,
    email: { type: String, unique: true},
    username: { type: String, unique: true},
    password: String
});

userSchema.query.byUsername = (username) => {
    return this.findOne({ 'username': username });
};

userSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null); 
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);