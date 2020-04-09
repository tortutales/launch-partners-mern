// @scripts
const { httpCodes } = require('../../constants');
const { responseSchema } = require('../../utils/res');
const { userService } = require('../../services');

// @models
const { User } = require('../../models');

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

async function updateUserController(req, res) {
    const user = await User.findOne({ _id: req.body.id });

    user.avatarUrl = req.body.avatarUrl;
    user.description = req.body.description;
    user.name = req.body.name;

    if (user.save()) {
        responseSchema({
            data: { user },
            message: 'User updated succesfully',
            res
        });
        return;
    }

    responseSchema({
        data: { user },
        error: true,
        httpStatusCode: httpCodes.NOT_CONTENT,
        message: 'There was an error updating the user',
        res,
        success: false
    });
}

module.exports = {
    getAllUsersController,
    loginController,
    updateUserController
};
