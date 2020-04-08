// @packages
const express = require('express');

// @scripts
const home = require('./home.controller');

// @constants
const router = express.Router();

// @routes
router.get('/', home.mainController);

module.exports = router;
