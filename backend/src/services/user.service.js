// @packages
const bcrypt = require('bcrypt');

// @scripts
const { auth } = require('../utils');

// @models
const { User } = require('../models');

function buildUserService() {
    return {
        async login(user) {
            const userInDB = await User.findOne({ email: user.email });

            if (!userInDB) {
                throw new Error("Either email or password doesn't exists");
            }

            const hasSamePassword = await bcrypt.compare(user.password, userInDB.password);

            if (!hasSamePassword) {
                throw new Error("Either email or password doesn't exists");
            }

            const token = auth.generateJWToken(userInDB.toJSON());

            return {
                user: userInDB,
                token
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
