// @packages
const express = require('express');

// @scripts
const { ensurePayloadForm } = require('../../middlewares');
const user = require('./user.controller');

// @constants
const router = express.Router();

// @middlewares
const verifyLoginFields = ensurePayloadForm(['email', 'password']);

// @routes
router.get('/', user.mainController);
router.post('/login', verifyLoginFields, user.loginController);

module.exports = router;
