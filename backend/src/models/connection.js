// @packages
const mongoose = require('mongoose');

if (process.env.DEBUG) {
    mongoose.set('debug', true);
}

// @scripts
const { databaseConnection } = require('../config');
const { globals } = require('../utils');

// @constants
const DATABASE_URL = `mongodb://${databaseConnection.host}:${databaseConnection.port}/${databaseConnection.database}`;

// Execute database connection.
mongoose.connect(DATABASE_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Handle possible connection errors.
mongoose.connection.on('error', () => {
    globals.log('Error in MongoDB connection');
});

// Check once we're connected to MongoDB.
mongoose.connection.once('open', () => {
    globals.log('Connected to MongoDB');
});

module.exports = mongoose;
