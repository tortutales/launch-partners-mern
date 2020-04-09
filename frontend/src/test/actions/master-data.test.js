import { config } from '../../config';


import {
    GET_ALL_MASTER_DATA,
    getAllMasterData
} from '../../actions';

test('getAllMasterData (http request success)', () => {
    const actionCreator = getAllMasterData();
    const expectedActions = [{
        type: GET_ALL_MASTER_DATA,
        payload: config.mockData.masterDataSvcResponse
    }];
    return global.testDispatch(actionCreator, expectedActions);
});
