// @packages
const mongoose = require('mongoose');

// @scripts
const { databaseConnection } = require('../config');

// @constants
const DATABASE_URL = `mongodb://${databaseConnection.host}:${databaseConnection.port}/${databaseConnection.database}`;

// execute database connection
mongoose.connect(DATABASE_URL, { useNewUrlParser: true });

module.exports = mongoose;
