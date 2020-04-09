// @scripts
const mongoose = require('../connection');
const UsersSchema = require('./schema');

/**
 * Delete password from user schema, to avoid returns it to user.
 */
UsersSchema.set('toJSON', {
    transform(_, ret) {
        delete ret.password;
        return ret;
    }
});

module.exports = mongoose.model('User', UsersSchema, 'users');
