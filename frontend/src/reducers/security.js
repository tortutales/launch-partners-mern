// @packages
import { combineReducers } from 'redux';

// @scripts
import { config } from '../config';
import { GET_ALL_USERS, UPDATE_USER } from '../actions';

const allUsersReducer = (
    state = config.initialState.security.allUsers, action
) => {
    switch (action.type) {
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
    allUsers: allUsersReducer
});
