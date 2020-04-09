// @scripts
const { httpCodes } = require('../constants');

/**
 *
 * @param {{
 *  data: {},
 *  error: boolean,
 *  httpStatusCode: number,
 *  message: string,
 *  res: object,
 *  success: boolean
 * }}
 */
const responseSchema = ({
    data = {},
    error = false,
    httpStatusCode = httpCodes.OK,
    message = '',
    res,
    success = true
}) => res.status(httpStatusCode)
    .json({
        data,
        error,
        message,
        success
    });

module.exports = {
    responseSchema
};
