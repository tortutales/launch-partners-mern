// @scripts
const { httpCodes } = require('../../constants');

function mainController(req, res) {
    return res.status(httpCodes.OK).json({
        message: 'LaunchPartners API',
        version: '1.0.0'
    });
}

module.exports = {
    mainController
};
