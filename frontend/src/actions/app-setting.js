// @packages
import axios from 'axios';

// @scripts
import { config } from '../config';

// @constants
export const GET_APP_SETTINGS = 'GET_APP_SETTINGS';
export const SAVE_APP_SETTINGS = 'SAVE_APP_SETTINGS';

export const getAppSettings = () =>
    dispatch => axios
        .get(config.services.setting.getAll)
        .then((response) => {
            dispatch({
                type: GET_APP_SETTINGS,
                payload: response
            });
            return response;
        })
        .catch(error => Promise.reject(error));

/**
 * @param {{
 *  allowedValues: ?string
 *  category: string,
 *  decimals: ?number,
 *  key: string,
 *  max: ?number,
 *  min: ?number,
 *  permissionId: number,
 *  regex: ?string,
 *  required: boolean,
 *  settingId: number,
 *  type: string,
 *  value: ?string,
 * }}[] appSettings
 */
export const saveAppSettings = appSettings =>
    dispatch => axios
        .patch(config.services.setting.save, {
            settings: appSettings
        })
        .then((response) => {
            dispatch({
                type: SAVE_APP_SETTINGS,
                payload: response
            });
        })
        .catch(error => Promise.reject(error));
