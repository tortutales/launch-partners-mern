// @packages
const dotenv = require('dotenv');
const express = require('express');

/**
 * Initialize enviroment variables, we initialize them here because
 * they are neccesary in the entire application
 */
if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: '.env' });
}

// @scripts
const setupExpressApplication = require('./express');

// @constants
const app = express();

// Init express application middlewares
setupExpressApplication(app);

module.exports = app;
