// @packages
const bcrypt = require('bcrypt');

// @scripts
const { auth } = require('../utils');

/**
 * Get object which will represent user interface to make database operations.
 * @param {Object} userModel
 */
function buildUserService({ userModel } = {}) {
    return {
        async login(user) {
            const userInDB = await userModel.findOne({ email: user.email });

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
        }
    };
}

module.exports = buildUserService;
