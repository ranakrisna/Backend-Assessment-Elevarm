require('dotenv').config()
const mongoose = require('mongoose');
// const initial = require('@elevarm/user-modules/src/config/database').initial()

connect = function () {
    const option = {
        dbName: process.env.MONGODB_DATABASE
    };
    const mongoURI = process.env.MONGODB_URI;
    mongoose.connect(mongoURI, option).then(function () {
        console.log("Successfully connect to MongoDB.");
        // initial
    }, function (err) {
        console.error("Failed connect to MongoDB.", err)
        process.exit();
    });
}

module.exports = {
    connect
}