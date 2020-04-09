// @scripts
import {
    DELETE_ROLE,
    GET_ALL_PERMISSIONS,
    GET_ALL_ROLES,
    GET_ALL_USERS,
    INSERT_ROLE,
    INSERT_USER,
    UPDATE_ROLE,
    UPDATE_USER
} from '../../actions';

import { config } from '../../config';
import { securityReducer } from '../../reducers/security';

test('userReducer: INSERT_ROLE', () => {
    const initialState = Object.assign({}, config.initialState.security, {
        allRoles: [{
            roleId: 1,
            description: 'Administrator',
            users: ['Andrés Espinosa', 'Juan David', 'Juan Pablo', 'Daniel Gonzalez'],
            permissions: [
                'MainMenu.AppSettings',
                'MainMenu.Home',
                'MainMenu.LogViewer',
                'MainMenu.MasterData',
                'MainMenu.Roles',
                'ProfileMenu.Settings',
                'TopBar.Alerts',
                'TopBar.Profile'
            ]
        }, {
            roleId: 2,
            description: 'Customer',
            users: ['Carlos', 'Alejandra', 'Natalia'],
            permissions: [
                'MainMenu.Home'
            ]
        }]
    });
    const role = {
        roleId: 3,
        description: 'new role',
        users: [],
        permissions: []
    };

    const action = {
        type: INSERT_ROLE,
        payload: {
            role,
            success: true
        }
    };
    const newState = securityReducer(initialState, action);
    const expectedState = Object.assign({}, config.initialState.security, {
        allRoles: [{
            roleId: 1,
            description: 'Administrator',
            users: ['Andrés Espinosa', 'Juan David', 'Juan Pablo', 'Daniel Gonzalez'],
            permissions: [
                'MainMenu.AppSettings',
                'MainMenu.Home',
                'MainMenu.LogViewer',
                'MainMenu.MasterData',
                'MainMenu.Roles',
                'ProfileMenu.Settings',
                'TopBar.Alerts',
                'TopBar.Profile'
            ]
        }, {
            roleId: 2,
            description: 'Customer',
            users: ['Carlos', 'Alejandra', 'Natalia'],
            permissions: [
                'MainMenu.Home'
            ]
        }, {
            roleId: 3,
            description: 'new role',
            users: [],
            permissions: []
        }]
    });
    expect(newState).toEqual(expectedState);
});

test('userReducer: DELETE_ROLE', () => {
    const initialState = Object.assign({}, config.initialState.security, {
        allRoles: [{
            roleId: 1,
            description: 'Administrator',
            users: ['Andrés Espinosa', 'Juan David', 'Juan Pablo', 'Daniel Gonzalez'],
            permissions: [
                'MainMenu.AppSettings',
                'MainMenu.Home',
                'MainMenu.LogViewer',
                'MainMenu.MasterData',
                'MainMenu.Roles',
                'ProfileMenu.Settings',
                'TopBar.Alerts',
                'TopBar.Profile'
            ]
        }, {
            roleId: 2,
            description: 'Customer',
            users: ['Carlos', 'Alejandra', 'Natalia'],
            permissions: [
                'MainMenu.Home'
            ]
        }]
    });

    const roleId = 1;
    const action = {
        type: DELETE_ROLE,
        payload: roleId
    };
    const newState = securityReducer(initialState, action);
    const expectedState = Object.assign({}, config.initialState.security, {
        allRoles: [{
            roleId: 2,
            description: 'Customer',
            users: ['Carlos', 'Alejandra', 'Natalia'],
            permissions: [
                'MainMenu.Home'
            ]
        }]
    });
    expect(newState).toEqual(expectedState);
});

test('securityReducer: GET_ALL_PERMISSIONS', () => {
    const action = {
        type: GET_ALL_PERMISSIONS,
        payload: config.mockData.securityGetAllPermissionsSvcResponse
    };
    const newState = securityReducer(config.initialState.security, action);
    const expectedState = Object.assign({}, config.initialState.security, {
        allPermissions: action.payload
    });
    expect(newState).toEqual(expectedState);
});

test('securityReducer: GET_ALL_ROLES', () => {
    const action = {
        type: GET_ALL_ROLES,
        payload: config.mockData.securityGetAllRolesSvcResponse
    };
    const newState = securityReducer(config.initialState.security, action);
    const expectedState = Object.assign({}, config.initialState.security, {
        allRoles: action.payload
    });
    expect(newState).toEqual(expectedState);
});

test('userReducer: GET_ALL_USERS', () => {
    const action = {
        type: GET_ALL_USERS,
        payload: config.mockData.securityGetAllRolesSvcResponse
    };
    const newState = securityReducer(config.initialState.security, action);
    const expectedState = Object.assign({}, config.initialState.security, {
        allUsers: action.payload
    });
    expect(newState).toEqual(expectedState);
});

test('securityReducer: UPDATE_ROLE', () => {
    const initialState = Object.assign({}, config.initialState.security, {
        allRoles: [{
            roleId: 1,
            description: 'Administrator',
            users: ['Andrés Espinosa', 'Juan David', 'Juan Pablo', 'Daniel Gonzalez'],
            permissions: [
                'MainMenu.AppSettings',
                'MainMenu.Home',
                'MainMenu.LogViewer',
                'MainMenu.MasterData',
                'MainMenu.Roles',
                'ProfileMenu.Settings',
                'TopBar.Alerts',
                'TopBar.Profile'
            ]
        }, {
            roleId: 2,
            description: 'Customer',
            users: ['Carlos', 'Alejandra', 'Natalia'],
            permissions: [
                'MainMenu.Home'
            ]
        }]
    });

    const payload = {
        roleId: 1,
        description: 'Cambiado',
        users: ['Andrés Espinosa', 'Juan David', 'Juan Pablo', 'Daniel Gonzalez'],
        permissions: [
            'MainMenu.AppSettings',
            'MainMenu.Home',
            'MainMenu.LogViewer',
            'MainMenu.MasterData',
            'MainMenu.Roles',
            'ProfileMenu.Settings',
            'TopBar.Alerts',
            'TopBar.Profile'
        ]
    };
    const action = {
        type: UPDATE_ROLE,
        payload
    };
    const newState = securityReducer(initialState, action);
    const expectedState = Object.assign({}, config.initialState.security, {
        allRoles: [{
            roleId: 1,
            description: 'Cambiado',
            users: ['Andrés Espinosa', 'Juan David', 'Juan Pablo', 'Daniel Gonzalez'],
            permissions: [
                'MainMenu.AppSettings',
                'MainMenu.Home',
                'MainMenu.LogViewer',
                'MainMenu.MasterData',
                'MainMenu.Roles',
                'ProfileMenu.Settings',
                'TopBar.Alerts',
                'TopBar.Profile'
            ]
        }, {
            roleId: 2,
            description: 'Customer',
            users: ['Carlos', 'Alejandra', 'Natalia'],
            permissions: [
                'MainMenu.Home'
            ]
        }]
    });
    expect(newState).toEqual(expectedState);
});

test('securityReducer: DEFAULT', () => {
    const initialState = {
        allPermissions: [],
        allUsers: [],
        allRoles: []
    };
    const action = {
        type: 'UNLISTENED_ACTION'
    };
    const newState = securityReducer(initialState, action);
    expect(newState).toEqual(initialState);
});

test('userReducer: INSERT_USER', () => {
    const initialState = Object.assign({}, config.initialState.security, {
        allUsers: [{
            accessFailedCount: 0,
            avatarUrl: null,
            email: 'abcd@celerik.com',
            emailConfirmed: false,
            languageCode: 'es',
            lockoutEnabled: false,
            lockoutEndDate: null,
            name: 'Abcd Perez',
            userId: 1
        }]
    });
    const user = {
        accessFailedCount: 0,
        avatarUrl: null,
        email: 'abcdz@celerik.com',
        emailConfirmed: false,
        languageCode: 'es',
        lockoutEnabled: false,
        lockoutEndDate: null,
        name: 'Abcd zapata',
        userId: 2
    };
    const action = {
        type: INSERT_USER,
        payload: user
    };
    const newState = securityReducer(initialState, action);
    const expectedState = Object.assign({}, config.initialState.security, {
        allUsers: [{
            accessFailedCount: 0,
            avatarUrl: null,
            email: 'abcd@celerik.com',
            emailConfirmed: false,
            languageCode: 'es',
            lockoutEnabled: false,
            lockoutEndDate: null,
            name: 'Abcd Perez',
            userId: 1
        }, {
            accessFailedCount: 0,
            avatarUrl: null,
            email: 'abcdz@celerik.com',
            emailConfirmed: false,
            languageCode: 'es',
            lockoutEnabled: false,
            lockoutEndDate: null,
            name: 'Abcd zapata',
            userId: 2
        }]
    });

    expect(newState).toEqual(expectedState);
});

test('securityReducer: UPDATE_USER', () => {
    const initialState = Object.assign({}, config.initialState.security, {
        allUsers: [{
            accessFailedCount: 0,
            avatarUrl: 'http://www.celerik.com/wp-content/uploads/2017/09/andres.jpg',
            email: 'aespinosa@celerik.com',
            emailConfirmed: true,
            languageCode: 'es',
            lockoutEnabled: false,
            lockoutEndDate: null,
            name: 'Andrés Espinosa',
            password: '1234',
            userId: 1
        }, {
            accessFailedCount: 1,
            avatarUrl: 'http://www.celerik.com/wp-content/uploads/2017/09/andres.jpg',
            email: 'jdavid@celerik.com',
            emailConfirmed: true,
            languageCode: 'es',
            lockoutEnabled: false,
            lockoutEndDate: null,
            name: 'Juan David',
            password: '1234',
            userId: 2
        }]
    });
    const user = {
        accessFailedCount: 0,
        avatarUrl: 'http://www.celerik.com/wp-content/uploads/2017/09/andres.jpg',
        email: 'aespinosa@celerik.com',
        emailConfirmed: true,
        languageCode: 'es',
        lockoutEnabled: true,
        lockoutEndDate: '2019-01-16T17:16:40.433-05:00',
        name: 'Andrés Espinosa',
        password: '1234',
        userId: 1
    };
    const action = {
        type: UPDATE_USER,
        payload: user
    };
    const newState = securityReducer(initialState, action);
    const expectedState = Object.assign({}, config.initialState.security, {
        allUsers: [{
            accessFailedCount: 0,
            avatarUrl: 'http://www.celerik.com/wp-content/uploads/2017/09/andres.jpg',
            email: 'aespinosa@celerik.com',
            emailConfirmed: true,
            languageCode: 'es',
            lockoutEnabled: true,
            lockoutEndDate: '2019-01-16T17:16:40.433-05:00',
            name: 'Andrés Espinosa',
            password: '1234',
            userId: 1
        }, {
            accessFailedCount: 1,
            avatarUrl: 'http://www.celerik.com/wp-content/uploads/2017/09/andres.jpg',
            email: 'jdavid@celerik.com',
            emailConfirmed: true,
            languageCode: 'es',
            lockoutEnabled: false,
            lockoutEndDate: null,
            name: 'Juan David',
            password: '1234',
            userId: 2
        }]
    });
    expect(newState).toEqual(expectedState);
});
