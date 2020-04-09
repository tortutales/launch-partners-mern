// @scripts
const { httpCodes } = require('../constants');
const { responseSchema } = require('../utils');

/**
 * Verify that every field is inside the body object
 * @param {Array} requiredFields array of string which will be the requires keys of request body.
 */
function ensurePayloadForm(requiredFields) {
    return function verifyPayloadForm(req, res, next) {
        const allFieldsArePresent = requiredFields.every((field) =>
            Object.prototype.hasOwnProperty.call(req.body, field));

        if (allFieldsArePresent) {
            next();
            return;
        }

        responseSchema({
            data: { requiredFields },
            error: true,
            httpStatusCode: httpCodes.BAD_REQUEST,
            message: 'Body must have all required fields',
            res,
            success: false
        });
    };
}

module.exports = {
    ensurePayloadForm
};
