// @scripts
import { config } from '../../config';
import { masterDataReducer } from '../../reducers/master-data';

test('masterDataReducer: DEFAULT', () => {
    const action = {
        type: null
    };
    const newState = masterDataReducer(config.initialState.masterData, action);
    const expectedState = config.initialState.masterData;
    expect(newState).toEqual(expectedState);
});
