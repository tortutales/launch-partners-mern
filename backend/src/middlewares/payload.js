// @scripts
const { httpCodes } = require('../constants');

/**
 * Verify that every field is inside the body object
 * @param {Array} requiredFields array of string which will be the requires keys of request body.
 */
function ensurePayloadForm(requiredFields) {
    return function verifyPayloadForm(req, res, next) {
        const { body } = req;
        const allFieldsArePresent = requiredFields.every((field) => body[field]);

        if (allFieldsArePresent) {
            next();
            return;
        }

        res.status(httpCodes.BAD_REQUEST).send({ message: 'Body must have all required fields' });
    };
}

module.exports = {
    ensurePayloadForm
};
