// @scripts
import { config } from '../../config';

import {
    GET_APP_SETTINGS,
    SAVE_APP_SETTINGS,
    getAppSettings,
    saveAppSettings
} from '../../actions';

test('getAppSettings (http request success)', () => {
    const actionCreator = getAppSettings();
    const expectedActions = [{
        type: GET_APP_SETTINGS,
        payload: config.mockData.appSettingGetAllSvcResponse
    }];
    return global.testDispatch(actionCreator, expectedActions);
});

test('getAppSettings (http request fails)', () => {
    const actionCreator = getAppSettings();
    const expectedActions = [];
    return global.testDispatchWithNetworkError(actionCreator, expectedActions);
});

test('saveAppSettings (http request success)', () => {
    const actionCreator = saveAppSettings(config.mockData.appSettingGetAllSvcResponse);
    const expectedActions = [{
        type: SAVE_APP_SETTINGS,
        payload: {
            settings: config.mockData.appSettingGetAllSvcResponse
        }
    }];
    return global.testDispatch(actionCreator, expectedActions);
});

test('saveAppSettings (http request fails)', () => {
    const actionCreator = saveAppSettings(config.mockData.appSettingGetAllSvcResponse);
    const expectedActions = [];
    return global.testDispatchWithNetworkError(actionCreator, expectedActions);
});
