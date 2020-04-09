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
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    username: {
        required: true,
        type: String,
        unique: true
    }
});

module.exports = UsersSchema;
