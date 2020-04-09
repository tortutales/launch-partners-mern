// @packages
const bcrypt = require('bcrypt');

// @scripts
const { globals } = require('../utils');

// @schemas
const UserSchema = require('./user/schema');

// @json
const mockData = require('../config/data');

function populateUsersCollection(databaseContext) {
    const commonUsers = mockData.users.filter((user) => user.userId > 0);
    let adminUser = mockData.users.find((user) => user.userId === 0);
    adminUser = Object.assign(adminUser, {
        password: bcrypt.hashSync(Buffer.from(adminUser.password, 'base64').toString(), bcrypt.genSaltSync(8), null)
    });
    databaseContext.collection('users').insertMany([...commonUsers, adminUser]);
}

function createUsersCollection(databaseContext) {
    databaseContext.createCollection('users', UserSchema, (err, users) => {
        if (!err && users) {
            populateUsersCollection(databaseContext);
        }
    });
}

function migrateDatabase(databaseContext) {
    databaseContext.listCollections({ name: 'users' })
        .next(async (_err, collInfo) => {
            if (!collInfo) {
                globals.log('Users collection does not exists');
                createUsersCollection(databaseContext);
            }

            globals.log('Users collection created and populated successfully');
        });
}

module.exports = {
    createUsersCollection,
    migrateDatabase,
    populateUsersCollection
};
