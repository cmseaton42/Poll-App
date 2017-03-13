require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = Promise;

const userSchema = Schema({
    fName: { type: String, required: true},
    lName: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    username: { type: String, required: true, unique: true}
});