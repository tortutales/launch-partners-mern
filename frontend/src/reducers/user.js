// @packages
import { combineReducers } from 'redux';

// @scripts
import { LOGIN, UPDATE_USER } from '../actions';
import { config } from '../config';

/**
 * @return Object
 */
const accountReducer = (
    state = config.initialState.user.account, action
) => {
    switch (action.type) {
        case LOGIN: {
            const {
                authToken,
                avatarUrl,
                description,
                email,
                name,
                permissions,
                userId
            } = action.payload;
            return {
                authToken,
                avatarUrl,
                description,
                email,
                name,
                permissions,
                userId
            };
        }
        case UPDATE_USER: {
            const {
                avatarUrl,
                description,
                name
            } = action.payload;
            return Object.assign({}, state, {
                avatarUrl,
                description,
                name
            });
        }
        default:
            return state;
    }
};

/**
 * @return Object
 */
const languageCodeReducer = (
    state = config.initialState.user.languageCode
) => state;

export const userReducer = combineReducers({
    account: accountReducer,
    languageCode: languageCodeReducer
});
