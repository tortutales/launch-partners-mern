// @packages
import { combineReducers } from 'redux';

// @scripts
import { config } from '../config';

import {
    DELETE_ROLE,
    GET_ALL_PERMISSIONS,
    GET_ALL_ROLES,
    GET_ALL_USERS,
    INSERT_ROLE,
    INSERT_USER,
    UPDATE_ROLE,
    UPDATE_USER
} from '../actions';

const allPermissionsReducer = (
    state = config.initialState.security.allPermissions, action
) => {
    switch (action.type) {
        case GET_ALL_PERMISSIONS:
            return action.payload;
        default:
            return state;
    }
};

const allRolesReducer = (
    state = config.initialState.security.allRoles, action
) => {
    switch (action.type) {
        case INSERT_ROLE:
            return [...state, action.payload.role];
        case DELETE_ROLE:
            return state.filter(row => row.roleId !== action.payload);
        case UPDATE_ROLE:
            return state.map((row) => {
                if (row.roleId === action.payload.roleId) {
                    return action.payload;
                }
                return row;
            });
        case GET_ALL_ROLES:
            return action.payload;
        default:
            return state;
    }
};

const allUsersReducer = (
    state = config.initialState.security.allUsers, action
) => {
    switch (action.type) {
        case INSERT_USER:
            return [...state, action.payload];
        case GET_ALL_USERS:
            return action.payload;
        case UPDATE_USER:
            const user = action.payload;
            return state.map(row =>
                row.userId === user.userId ? user : row);
        default:
            return state;
    }
};

export const securityReducer = combineReducers({
    allPermissions: allPermissionsReducer,
    allRoles: allRolesReducer,
    allUsers: allUsersReducer
});
