// @packages
const express = require('express');

// @scripts
const { ensurePayloadForm } = require('../../middlewares');
const user = require('./user.controller');

// @constants
const router = express.Router();

// @middlewares
const verifyLoginFields = ensurePayloadForm(['email', 'password']);
const verityUpdateField = ensurePayloadForm(['description', 'id', 'name']);

// @routes
router.get('/', user.getAllUsersController);
router.post('/', verityUpdateField, user.updateUserController);
router.post('/login', verifyLoginFields, user.loginController);

module.exports = router;
