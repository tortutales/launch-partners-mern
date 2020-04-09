// @scripts
const routes = require('./src');

/**
 * Setup application routes
  * @param {Object} app Express application instance.
 */
function setupApplicationRoutes(app) {
    app.use('/api', routes.homeRouter);
    app.use('/api/user', routes.userRouter);
}

module.exports = setupApplicationRoutes;
