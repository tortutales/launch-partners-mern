// @scripts
const mongoose = require('mongoose');

// @constants
const { Schema } = mongoose;

// @schemas

/**
 * User mongo schema
 */
const UsersSchema = new Schema({
    avatarUrl: {
        required: false,
        type: String
    },
    description: {
        required: false,
        type: String
    },
    email: {
        required: false,
        type: String,
        unique: true
    },
    password: {
        required: false,
        type: String
    },
    name: {
        required: false,
        type: String
    },
    username: {
        required: false,
        type: String,
        unique: true
    }
});

module.exports = UsersSchema;
