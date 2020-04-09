// @scripts
import {
    GET_ALL_USERS,
    UPDATE_USER
} from '../../actions';

import { config } from '../../config';
import { securityReducer } from '../../reducers/security';

test('userReducer: GET_ALL_USERS', () => {
    const action = {
        type: GET_ALL_USERS,
        payload: config.mockData.securityGetAllUsersSvcResponse
    };
    const newState = securityReducer(config.initialState.security, action);
    const expectedState = Object.assign({}, config.initialState.security, {
        allUsers: action.payload
    });
    expect(newState).toEqual(expectedState);
});

test('securityReducer: DEFAULT', () => {
    const initialState = {
        allUsers: []
    };
    const action = {
        type: 'UNLISTENED_ACTION'
    };
    const newState = securityReducer(initialState, action);
    expect(newState).toEqual(initialState);
});

test('securityReducer: UPDATE_USER', () => {
    const initialState = Object.assign({}, config.initialState.security, {
        allUsers: [{
            avatarUrl: 'http://www.celerik.com/wp-content/uploads/2017/09/andres.jpg',
            description: '...',
            email: 'aespinosa@celerik.com',
            name: 'Andrés Espinosa',
            password: '1234',
            userId: 1
        }, {
            avatarUrl: 'http://www.celerik.com/wp-content/uploads/2017/09/andres.jpg',
            description: '...',
            email: 'jdavid@celerik.com',
            name: 'Juan David',
            password: '1234',
            userId: 2
        }]
    });
    const user = {
        avatarUrl: 'http://www.celerik.com/wp-content/uploads/2017/09/andres.jpg',
        description: 'Im the profe!',
        email: 'aespinosa@celerik.com',
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
            avatarUrl: 'http://www.celerik.com/wp-content/uploads/2017/09/andres.jpg',
            description: 'Im the profe!',
            email: 'aespinosa@celerik.com',
            name: 'Andrés Espinosa',
            password: '1234',
            userId: 1
        }, {
            avatarUrl: 'http://www.celerik.com/wp-content/uploads/2017/09/andres.jpg',
            description: '...',
            email: 'jdavid@celerik.com',
            name: 'Juan David',
            password: '1234',
            userId: 2
        }]
    });
    expect(newState).toEqual(expectedState);
});
