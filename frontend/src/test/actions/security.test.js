// @scripts
import { config } from '../../config';
import { getMaxFromArray } from '../../util';
import { serviceMocker } from '../../core';

import {
    DELETE_ROLE,
    GET_ALL_PERMISSIONS,
    GET_ALL_ROLES,
    GET_ALL_USERS,
    INSERT_ROLE,
    INSERT_USER,
    // UPDATE_ROLE,
    UPDATE_USER,
    deleteRole,
    getAllPermissions,
    getAllRoles,
    getAllUsers,
    insertRole,
    insertUser,
    sendPasswordRecoveryCode,
    updateMyPassword,
    updatePasswordUsingRecoveryToken,
    updateRole,
    updateUser,
    verifyPasswordRecoveryCode
} from '../../actions';

test('insertRole (http request success)', () => {
    const max = getMaxFromArray({
        defaultValue: 0,
        maxKey: 'roleId',
        source: config.mockData.securityGetAllRolesSvcResponse
    });
    const role = {
        roleId: max + 1,
        description: 'new role',
        users: [],
        permissions: []
    };
    const actionCreator = insertRole(role);
    const expectedActions = [{
        type: INSERT_ROLE,
        payload: {
            success: true,
            role
        }
    }];

    return global.testDispatch(actionCreator, expectedActions);
});

test('insertRole (http request fails)', () => {
    const role = {
        description: 'new role',
        users: [],
        permissions: []
    };
    const actionCreator = insertRole(role);
    const expectedActions = [];
    return global.testDispatchWithNetworkError(actionCreator, expectedActions);
});

test('deleteRole (http request success)', () => {
    const roleId = 3;
    const actionCreator = deleteRole(roleId);
    const expectedActions = [{
        type: DELETE_ROLE,
        payload: roleId
    }];

    return global.testDispatch(actionCreator, expectedActions);
});

test('deleteRole (http request fails)', () => {
    const roleId = 3;
    const actionCreator = deleteRole(roleId);
    const expectedActions = [];
    return global.testDispatchWithNetworkError(actionCreator, expectedActions);
});

test('getAllPermissions (http request success)', () => {
    const actionCreator = getAllPermissions();
    const expectedActions = [{
        type: GET_ALL_PERMISSIONS,
        payload: config.mockData.securityGetAllPermissionsSvcResponse
    }];

    return global.testDispatch(actionCreator, expectedActions);
});

test('getAllPermissions (http request fails)', () => {
    const actionCreator = getAllPermissions();
    const expectedActions = [];
    return global.testDispatchWithNetworkError(actionCreator, expectedActions);
});

test('getAllRoles (http request success)', () => {
    const actionCreator = getAllRoles();
    const expectedActions = [{
        type: GET_ALL_ROLES,
        payload: config.mockData.securityGetAllRolesSvcResponse
    }];

    return global.testDispatch(actionCreator, expectedActions);
});

test('getAllRoles (http request fails)', () => {
    const actionCreator = getAllRoles();
    const expectedActions = [];
    return global.testDispatchWithNetworkError(actionCreator, expectedActions);
});

test('getAllUsers (http request success)', () => {
    const actionCreator = getAllUsers();
    const expectedActions = [{
        type: GET_ALL_USERS,
        payload: config.mockData.securityGetAllUsersSvcResponse
    }];

    return global.testDispatch(actionCreator, expectedActions);
});

test('getAllUsers (http request fails)', () => {
    const actionCreator = getAllUsers();
    const expectedActions = [];
    return global.testDispatchWithNetworkError(actionCreator, expectedActions);
});
/*
test('updateRole (http request success)', () => {
    const payload = {
        roleId: 1,
        description: 'Cambiado',
        users: [1, 2],
        permissions: [5, 13]
    };
    const actionCreator = updateRole(payload);
    const role = {
        roleId: 1,
        description: 'Cambiado',
        users: [
            {
                userId: 1,
                name: 'Andrés Espinosa',
                email: 'aespinosa@celerik.com',
                emailConfirmed: true,
                lockoutEnabled: false,
                lockoutEndDate: null,
                accessFailedCount: 0,
                avatarUrl: 'http://www.celerik.com/wp-content/uploads/2017/09/andres.jpg',
                languageCode: 'es',
                roles: [],
                permissions: []
            },
            {
                userId: 2,
                name: 'Juan David',
                email: 'jdavid@celerik.com',
                emailConfirmed: true,
                lockoutEnabled: false,
                lockoutEndDate: null,
                accessFailedCount: 0,
                avatarUrl: '',
                languageCode: 'es',
                roles: [],
                permissions: []
            }
        ],
        permissions: [
            { permissionId: 5, description: 'MainMenu.Home' },
            { permissionId: 13, description: 'ProfileMenu.Settings' }
        ]
    };
    const expectedActions = [{
        type: UPDATE_ROLE,
        payload: role
    }];

    return global.testDispatch(actionCreator, expectedActions);
});
*/

test('updateRole (http request fails)', () => {
    const payload = {
        roleId: 1,
        description: 'Cambiado',
        users: [1, 2],
        permissions: [5, 13]
    };
    const actionCreator = updateRole(payload);
    const expectedActions = [];
    return global.testDispatchWithNetworkError(actionCreator, expectedActions);
});

test('insertUser (http request success)', () => {
    const maxUserId = getMaxFromArray({
        defaultValue: 0,
        maxKey: 'userId',
        source: config.mockData.securityGetAllUsersSvcResponse
    });
    const user = {
        avatarUrl: null,
        email: 'abcd@celerik.com',
        languageCode: 'es',
        name: 'Abcd Perez',
        password: '1234'
    };
    const actionCreator = insertUser(user);
    const expectedActions = [{
        type: INSERT_USER,
        payload: Object.assign({}, user, {
            accessFailedCount: 0,
            emailConfirmed: false,
            lockoutEnabled: false,
            lockoutEndDate: null,
            password: null,
            permissions: [],
            roles: [],
            userId: maxUserId + 1
        })
    }];

    return global.testDispatch(actionCreator, expectedActions);
});

test('insertUser (http request fails)', () => {
    const user = {
        avatarUrl: null,
        email: 'abcd@celerik.com',
        languageCode: 'es',
        name: 'Abcd Perez',
        password: '1234'
    };
    const actionCreator = insertUser(user);
    const expectedActions = [];

    return global.testDispatchWithNetworkError(actionCreator, expectedActions);
});

test('updateUser (http request success)', () => {
    const user = {
        avatarUrl: 'http://www.celerik.com/wp-content/uploads/2017/09/andres.jpg',
        email: 'aespinosa@celerik.com',
        languageCode: 'es',
        lockoutEnabled: true,
        lockoutEndDate: '2019-01-16T17:16:40.433-05:00',
        name: 'Andrés Espinosa',
        password: '1234',
        userId: 1
    };
    const prevData = config.mockData.securityGetAllUsersSvcResponse
        .find(usr => usr.userId === user.userId);
    const actionCreator = updateUser(user);
    const expectedActions = [{
        type: UPDATE_USER,
        payload: Object.assign({}, prevData, user)
    }];

    return global.testDispatch(actionCreator, expectedActions);
});

test('updateUser (http request fails)', () => {
    const user = {
        avatarUrl: 'http://www.celerik.com/wp-content/uploads/2017/09/andres.jpg',
        email: 'aespinosa@celerik.com',
        languageCode: 'es',
        lockoutEnabled: true,
        lockoutEndDate: '2019-01-16T17:16:40.433-05:00',
        name: 'Andrés Espinosa',
        password: '1234',
        permissions: [],
        roles: [],
        userId: 1
    };
    const actionCreator = updateUser(user);
    const expectedActions = [];

    return global.testDispatchWithNetworkError(actionCreator, expectedActions);
});

test('updateMyPassword (http request success)', (done) => {
    const currentPassword = '123';
    const newPassword = 'ABC';
    serviceMocker.replyWithMockData();

    return Promise.resolve(updateMyPassword({ currentPassword, newPassword }))
        .then(() => done());
});

test('updateMyPassword (http request fails)', (done) => {
    const currentPassword = '123';
    const newPassword = 'ABC';
    serviceMocker.replyWithNetworkError();

    return Promise.resolve(updateMyPassword({ currentPassword, newPassword }))
        .catch(() => done());
});

test('sendPasswordRecoveryCode (http request success)', (done) => {
    const email = 'admin@bestwebfirms.com';
    serviceMocker.replyWithMockData();

    return Promise.resolve(sendPasswordRecoveryCode(email))
        .then(() => done());
});

test('sendPasswordRecoveryCode (http request fails)', (done) => {
    const email = 'admin@bestwebfirms.com';
    serviceMocker.replyWithNetworkError();

    return Promise.resolve(sendPasswordRecoveryCode(email))
        .catch(() => done());
});

test('verifyPasswordRecoveryCode (http request success)', () => {
    const code = '123456';
    const { recoveryToken } = config.mockData.securityVerifyPasswordRecoveryCodeSvcResponse;
    serviceMocker.replyWithMockData();

    return Promise.resolve(verifyPasswordRecoveryCode(code))
        .then(response =>
            expect(response).toEqual({ recoveryToken }));
});

test('verifyPasswordRecoveryCode (http request fails)', (done) => {
    const code = '123456';
    serviceMocker.replyWithNetworkError();

    return Promise.resolve(verifyPasswordRecoveryCode(code))
        .catch(() => done());
});

test('updatePasswordUsingRecoveryToken (http request success)', (done) => {
    const { recoveryToken } = config.mockData.securityVerifyPasswordRecoveryCodeSvcResponse;
    const params = {
        newPassword: 'abcD1234*',
        recoveryToken
    };
    serviceMocker.replyWithMockData();

    return Promise.resolve(updatePasswordUsingRecoveryToken(params))
        .then(() => done());
});

test('updatePasswordUsingRecoveryToken (http request fails)', (done) => {
    const { recoveryToken } = config.mockData.securityVerifyPasswordRecoveryCodeSvcResponse;
    const params = {
        newPassword: 'abcD1234*',
        recoveryToken
    };
    serviceMocker.replyWithNetworkError();

    return Promise.resolve(updatePasswordUsingRecoveryToken(params))
        .catch(() => done());
});
