// @packages

// @scripts
const buildUserService = require('./users.service');
const { User } = require('../models');

// @constants
const userService = buildUserService({ userModel: User });

module.exports = {
    userService
};
