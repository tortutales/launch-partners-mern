// @packages
import axios from 'axios';

// @scripts
import { config } from '../config';

// @constants
export const GET_ALL_USERS = 'GET_ALL_USERS';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const UPDATE_USER = 'UPDATE_USER';

export const defaultPermissions = [
    'MainMenu.Home',
    'MainMenu.Users',
    'ProfileMenu.Settings',
    'TopBar.Alerts',
    'TopBar.Profile'
];

export const getAllUsers = () =>
    dispatch => axios
        .get(config.services.security.getAllUsers)
        .then((response) => {
            dispatch({
                type: GET_ALL_USERS,
                payload: response
            });
            return response;
        })
        .catch(error => Promise.reject(error));

/**
 * @param {string} email
 * @param {string} password
 */
export const login = ({ email, password }) =>
    dispatch => axios
        .post(config.services.security.login, {
            email,
            password
        })
        .then((response) => {
            dispatch({
                type: LOGIN,
                payload: Object.assign(response, {
                    permissions: defaultPermissions
                })
            });
        })
        .catch(error => Promise.reject(error));

export const logout = () =>
    ({
        type: LOGOUT
    });

/**
 * @param {{
 *  avatarUrl: string,
 *  description: string,
 *  email: string,
 *  name: string,
 *  password: string,
 *  userId: number
 * }} user
 */
export const updateUser = user =>
    dispatch => axios
        .patch(config.services.security.updateUser, user)
        .then((response) => {
            dispatch({
                type: UPDATE_USER,
                payload: response
            });
        })
        .catch(error => Promise.reject(error));
