// @scripts
const mongoose = require('../connection');

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

/**
 * Delete password from user schema, to avoid returns it to user.
 */
UsersSchema.set('toJSON', {
    transform(_, ret) {
        delete ret.password;
        return ret;
    }
});

module.exports = mongoose.model('User', UsersSchema);
