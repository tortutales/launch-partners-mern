// @scripts
import { config } from '../../config';

import {
    GET_ALL_USERS,
    UPDATE_USER,
    getAllUsers,
    updateUser
} from '../../actions';

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

test('updateUser (http request success)', () => {
    const user = {
        avatarUrl: 'http://www.celerik.com/wp-content/uploads/2017/09/andres.jpg',
        description: 'Im the profe!',
        email: 'aespinosa@celerik.com',
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
        description: 'Im the profe!',
        email: 'aespinosa@celerik.com',
        name: 'Andrés Espinosa',
        password: '1234',
        userId: 1
    };
    const actionCreator = updateUser(user);
    const expectedActions = [];

    return global.testDispatchWithNetworkError(actionCreator, expectedActions);
});
