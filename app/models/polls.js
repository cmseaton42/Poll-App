require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = Promise;

let pollSchema = Schema({
    title: { type: String, unique: true },
    url: { type: String, unique: true },
    options: [{
        text: String,
        count: { type: Number, default: 0 }
    }],
    user_votes: [String],
    latest_timestamp: { type: Date, default: Date.now },
    timestamp: { type: Date, default: Date.now },
});



module.exports = mongoose.model('Poll', pollSchema);