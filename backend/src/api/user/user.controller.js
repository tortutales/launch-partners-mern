// @scripts
const { httpCodes } = require('../../constants');
const { userService } = require('../../services');

function mainController(_req, res) {
    return res.status(httpCodes.OK).json({ message: 'User endpoints' });
}

async function loginController(req, res) {
    try {
        const user = await userService.login(req.body);
        res.status(httpCodes.OK).json({ message: 'User succesfully loggued', user });
    } catch (error) {
        res.status(httpCodes.SERVER_ERROR).send({ message: error.message });
    }
}

module.exports = {
    loginController,
    mainController
};
