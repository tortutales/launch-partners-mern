// @packages
const jwt = require('jsonwebtoken');

/**
 * Generate token applying private key and with the user as payload.
 * @param {Object} payload user information to generate token.
 */
const generateJWToken = ({
    expiresIn = '7days',
    payload = {}
}) => jwt.sign(
    payload,
    process.env.JWT_PRIVATE_KEY,
    { expiresIn }
);

module.exports = {
    generateJWToken
};
