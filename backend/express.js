// @packages
const cookieParser = require('cookie-parser');
const cors = require('cors');
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const multer = require('multer');

// @scripts
const setupApplicationRoutes = require('./routes');

/**
 * Setup express server
 * @param {Object} app Express application instance
 */
function setupExpressApplication(app) {
    // Application middlewares
    app.use(cookieParser());
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(logger('dev'));
    app.use(multer().none());

    // Init express application routes
    setupApplicationRoutes(app);

    // Catch 404 and forward to error handler
    app.use((_req, _res, next) => {
        next(createError(404));
    });

    // Error handler
    app.use((err, req, res) => {
        // Set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development'
            ? err
            : {};

        // Render the error page
        res.status(err.status || 500);
        res.render('error');
    });
}

module.exports = setupExpressApplication;
