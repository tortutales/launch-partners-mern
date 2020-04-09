// @scripts\
const buildUserService = require('./user.service');

// @constants
const userService = buildUserService();

module.exports = {
    userService
};
