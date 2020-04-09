// @scripts
const { globals } = require('../utils');

// @schemas
const UserSchema = require('./user/schema');

// @json
const mockData = require('../config/data');

function populateUsersCollection(databaseContext) {
    databaseContext.collection('users').insert(mockData.users);
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

            const users = await databaseContext.collection('users').countDocuments({});
            if (!users) {
                populateUsersCollection(databaseContext);
            }

            globals.log('Users collection does exists and it is populated');
        });
}

module.exports = {
    createUsersCollection,
    migrateDatabase,
    populateUsersCollection
};
