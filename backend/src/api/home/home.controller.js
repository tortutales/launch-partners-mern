// @scripts
const { responseSchema } = require('../../utils/res');

function mainController(_req, res) {
    responseSchema({
        data: {
            version: '1.0.0'
        },
        message: 'LaunchPartner API',
        res
    });
}

module.exports = {
    mainController
};
