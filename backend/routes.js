// @scripts
const routes = require('./src');

/**
 * Setup application routes
  * @param {Object} app Express application instance.
 */
function setupApplicationRoutes(app) {
    app.use('/', routes.homeRouter);
    app.use('/user', routes.userRouter);
}

module.exports = setupApplicationRoutes;
