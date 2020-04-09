// @scripts
import { LOGIN } from '../../actions';
import { config } from '../../config';
import { userReducer } from '../../reducers/user';

test('userReducer: LOGIN', () => {
    const action = {
        type: LOGIN,
        payload: config.mockData.securityLoginSvcResponse
    };
    const newState = userReducer(config.initialState.user, action);
    const {
        authToken,
        avatarUrl,
        description,
        email,
        name,
        userId
    } = action.payload;
    const expectedState = Object.assign({}, config.initialState.user, {
        account: {
            authToken,
            avatarUrl,
            description,
            email,
            name,
            userId
        }
    });
    expect(newState).toEqual(expectedState);
});

