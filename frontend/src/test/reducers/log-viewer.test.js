// @scripts
import { CHANGE_LOG_FILTER, SEARCH_LOG_ENTRIES } from '../../actions';
import { config } from '../../config';
import { logViewerReducer } from '../../reducers/log-viewer';

test('logViewerReducer: CHANGE_LOG_FILTER', () => {
    const filter = { name: 'level', value: 'info' };
    const action = {
        type: CHANGE_LOG_FILTER,
        payload: filter
    };
    const newState = logViewerReducer(config.initialState.logViewer, action);
    const filterState = Object.assign({}, config.initialState.logViewer.filter, {
        [filter.name]: filter.value
    });
    const expectedState = Object.assign({}, config.initialState.logViewer, {
        filter: filterState
    });
    expect(newState).toEqual(expectedState);
});

test('logViewerReducer: SEARCH_LOG_ENTRIES', () => {
    const { logSearch } = config.initialState.logViewer;
    const action = [{
        type: SEARCH_LOG_ENTRIES,
        payload: logSearch
    }];
    const newState = logViewerReducer(config.initialState.logViewer, action);
    const expectedState = Object.assign({}, config.initialState.logViewer, {
        logSearch
    });
    expect(newState).toEqual(expectedState);
});

