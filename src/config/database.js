require('dotenv').config()
const mongoose = require('mongoose');
const Role = require('../application/model/role');

connect = function () {
    const option = {
        dbName: process.env.MONGODB_DATABASE
    };
    const mongoURI = process.env.MONGODB_URI;
    mongoose.connect(mongoURI, option).then(function () {
        console.log("Successfully connect to MongoDB.");
        initial();
    }, function (err) {
        console.error("Failed connect to MongoDB.", err)
        process.exit();
    });
}

initial = async () => {
    const constant = require('./constant');
    const Role = require('./../application/model/role')
    const estimate = await Role.estimatedDocumentCount();
    if (estimate === 0) {
        const roles = constant.ROLES.map((role) => {
            return {name: role};
        })
        await Role.create(roles);
    }
}

module.exports = {
    connect
}