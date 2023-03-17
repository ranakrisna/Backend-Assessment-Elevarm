'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Role Schema
 */
var RoleSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    }
}, { versionKey: false });

const Role = mongoose.model('Role', RoleSchema);
module.exports = Role;

