const express = require('express');
const router = express.Router();
const { default: mongoose } = require('mongoose');
let mongoConnection = "mongodb+srv://admin:admin@myapp.51n0kvh.mongodb.net/MyAppDB";
let db = mongoose.connection;


module.exports = router;