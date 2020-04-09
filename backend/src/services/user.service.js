// @packages
const bcrypt = require('bcrypt');

// @scripts
const { auth } = require('../utils');

// @models
const { User } = require('../models');

function buildUserService() {
    return {
        async login(userLoggingIn) {
            const user = await User.findOne({ email: userLoggingIn.email });

            if (!user) {
                throw new Error('Invalid email or password!');
            }

            const hasSamePassword = await bcrypt.compareSync(userLoggingIn.password, user.password);

            if (!hasSamePassword) {
                throw new Error('Invalid email or password!');
            }

            const authToken = auth.generateJWToken(user.toJSON());

            return {
                authToken,
                ...user.toJSON()
            };
        },
        async getAll() {
            const users = await User.find({});

            if (!users.length) {
                throw new Error('Not users found');
            }

            return users;
        }
    };
}

module.exports = buildUserService;
