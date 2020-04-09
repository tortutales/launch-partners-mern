// @packages
import axios from 'axios';

// @scripts
import { config } from '../config';

// @constants
export const DELETE_ROLE = 'DELETE_ROLE';
export const GET_ALL_PERMISSIONS = 'GET_ALL_PERMISSIONS';
export const GET_ALL_ROLES = 'GET_ALL_ROLES';
export const GET_ALL_USERS = 'GET_ALL_USERS';
export const INSERT_ROLE = 'INSERT_ROLE';
export const INSERT_USER = 'INSERT_USER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REMEMBER_ME = 'REMEMBER_ME';
export const UPDATE_LANGUAGE = 'UPDATE_LANGUAGE';
export const UPDATE_ROLE = 'UPDATE_ROLE';
export const UPDATE_USER = 'UPDATE_USER';

/**
 * @param {{
 *  description: string,
 *  users: string[],
 *  permissions: string[]
 * }} role
 */
export const insertRole = role =>
    dispatch => axios
        .put(config.services.security.insertRole, role)
        .then((response) => {
            dispatch({
                type: INSERT_ROLE,
                payload: response
            });
            return response;
        })
        .catch(error => Promise.reject(error));

/**
 * @param {number} roleId
 */
export const deleteRole = roleId =>
    dispatch => axios
        .delete(config.services.security.deleteRole, {
            params: {
                roleId
            }
        })
        .then((response) => {
            dispatch({
                type: DELETE_ROLE,
                payload: roleId
            });
            return response;
        })
        .catch(error => Promise.reject(error));

export const getAllPermissions = () =>
    dispatch => axios
        .get(config.services.security.getAllPermissions)
        .then((response) => {
            dispatch({
                type: GET_ALL_PERMISSIONS,
                payload: response
            });
            return response;
        })
        .catch(error => Promise.reject(error));

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

export const getAllRoles = () =>
    dispatch => axios
        .get(config.services.security.getAllRoles)
        .then((response) => {
            dispatch({
                type: GET_ALL_ROLES,
                payload: response
            });
            return response;
        })
        .catch(error => Promise.reject(error));

/**
 * @param {boolean} rememberMe
 */
export const rememberMe = rememberMe =>
    ({
        type: REMEMBER_ME,
        payload: rememberMe
    });

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
                payload: response
            });
        })
        .catch(error => Promise.reject(error));

export const logout = () =>
    ({
        type: LOGOUT
    });

/**
 * @param {string} languageCode - E.g: 'en', 'es'.
 */
export const updateLanguage = languageCode =>
    dispatch => axios
        .post(config.services.security.updateLanguage, {
            params: { languageCode }
        })
        .then((response) => {
            dispatch({
                type: UPDATE_LANGUAGE,
                payload: response
            });
        })
        .catch(error => Promise.reject(error));

/**
 * @param {{
 *  roleId: number,
 *  description: string,
 *  users: string[],
 *  permissions: string[]
 * }} role
 */
export const updateRole = role =>
    dispatch => axios
        .patch(config.services.security.updateRole, role)
        .then((response) => {
            dispatch({
                type: UPDATE_ROLE,
                payload: response
            });
            return response;
        })
        .catch(error => Promise.reject(error));

/**
 * @param {string} email
 */
export const sendPasswordRecoveryCode = email =>
    axios
        .post(config.services.security.sendPasswordRecoveryCode, { email })
        .catch(error => Promise.reject(error));

/**
 * @param {string} code
 */
export const verifyPasswordRecoveryCode = code =>
    axios
        .post(config.services.security.verifyPasswordRecoveryCode, { code })
        .catch(error => Promise.reject(error));

/**
 * @param {string} newPassword
 * @param {string} recoveryToken
 */
export const updatePasswordUsingRecoveryToken = ({ newPassword, recoveryToken }) =>
    axios
        .patch(config.services.security.updatePasswordUsingRecoveryToken, {
            newPassword,
            recoveryToken
        })
        .catch(error => Promise.reject(error));

/**
 * @param {{
 *  avatarUrl: string,
 *  email: string,
 *  languageCode: string,
 *  name: string,
 *  password: string
 * }} user
 */
export const insertUser = user =>
    dispatch => axios
        .put(config.services.security.insertUser, user)
        .then((response) => {
            dispatch({
                type: INSERT_USER,
                payload: response
            });
        })
        .catch(error => Promise.reject(error));

/**
 * @param {{
 *  avatarUrl: string,
 *  email: string,
 *  languageCode: string,
 *  lockoutEnabled: boolean,
 *  lockoutEndDate: string,
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

/*
 * @param {string} currentPassword
 * @param {string} newPassword
 */
export const updateMyPassword = ({
    currentPassword,
    newPassword
}) => axios
    .patch(config.services.security.updateMyPassword, {
        currentPassword,
        newPassword
    })
    .catch(error => Promise.reject(error));
