// @scripts
const { httpCodes } = require('../../constants');
const { responseSchema } = require('../../utils/res');
const { userService } = require('../../services');

async function getAllUsersController(_req, res) {
    try {
        const users = await userService.getAll();
        responseSchema({
            data: { users },
            message: 'Users found succesfully',
            res
        });
    } catch (error) {
        responseSchema({
            data: { users: [] },
            error: true,
            httpStatusCode: httpCodes.NOT_FOUND,
            message: error.message,
            res,
            success: false
        });
    }
}

async function loginController(req, res) {
    try {
        const user = await userService.login(req.body);
        responseSchema({
            data: { user },
            message: 'Users succesfully loggued',
            res
        });
    } catch (error) {
        responseSchema({
            data: { user: null },
            error: true,
            httpStatusCode: httpCodes.UNAUTHORIZED,
            message: error.message,
            res,
            success: false
        });
    }
}

module.exports = {
    getAllUsersController,
    loginController
};
