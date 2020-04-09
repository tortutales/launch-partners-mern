// @scripts
import { config } from '../../config';
import { decodeBase64String } from '../../util';

import {
    LOGIN,
    LOGOUT,
    REMEMBER_ME,
    UPDATE_LANGUAGE,
    login,
    logout,
    rememberMe,
    updateLanguage
} from '../../actions';

test('rememberMe', () => {
    const remember = true;
    const actionCreator = rememberMe(remember);
    const expectedActions = [{
        type: REMEMBER_ME,
        payload: remember
    }];
    return global.testDispatch(actionCreator, expectedActions);
});

test('login (http request success)', () => {
    const credentials = {
        email: config.settings.serviceMocker.loginEmail,
        password: decodeBase64String(
            config.settings.serviceMocker.loginPassword
        )
    };
    const actionCreator = login(credentials);
    const expectedActions = [{
        type: LOGIN,
        payload: config.mockData.securityLoginSvcResponse
    }];
    return global.testDispatch(actionCreator, expectedActions);
});

test('login (http request fails)', () => {
    const credentials = {
        email: config.settings.serviceMocker.loginUser,
        password: decodeBase64String(
            config.settings.serviceMocker.loginPassword
        )
    };
    const actionCreator = login(credentials);
    const expectedActions = [];
    return global.testDispatchWithNetworkError(actionCreator, expectedActions);
});

test('logout', () => {
    const actionCreator = logout();
    const expectedActions = [{
        type: LOGOUT
    }];
    return global.testDispatch(actionCreator, expectedActions);
});

test('updateLanguage (http request success)', () => {
    const newLanguageCode = 'en';
    const actionCreator = updateLanguage(newLanguageCode);
    const expectedActions = [{
        type: UPDATE_LANGUAGE,
        payload: newLanguageCode
    }];

    return global.testDispatch(actionCreator, expectedActions);
});

test('updateLanguage (http request fails)', () => {
    const newLanguageCode = 'en';
    const actionCreator = updateLanguage(newLanguageCode);
    const expectedActions = [];
    return global.testDispatchWithNetworkError(actionCreator, expectedActions);
});
