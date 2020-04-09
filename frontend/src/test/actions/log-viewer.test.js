// @scripts
import { config } from '../../config';
import { paginateArray } from '../../util';

import {
    CHANGE_LOG_FILTER,
    SEARCH_LOG_ENTRIES,
    changeLogFilter,
    searchLogEntries
} from '../../actions';

test('changeLogFilter', () => {
    const filter = {
        name: 'level',
        value: 'info'
    };
    const actionCreator = changeLogFilter(filter);
    const expectedActions = [{
        type: CHANGE_LOG_FILTER,
        payload: filter
    }];
    return global.testDispatch(actionCreator, expectedActions);
});

test('searchLogEntries (http request success)', () => {
    const filter = {
        pageNumber: 1,
        pageSize: 2,
        sortDirection: 'asc',
        sortKey: 'date'
    };
    const items = config.mockData.logSearchSvcResponse;
    const actionCreator = searchLogEntries(filter);
    const expectedActions = [{
        type: SEARCH_LOG_ENTRIES,
        payload: {
            filter,
            results: {
                items: paginateArray({
                    pageNumber: filter.pageNumber,
                    pageSize: filter.pageSize,
                    sortDirection: filter.sortDirection,
                    sortKey: filter.sortKey,
                    source: items
                }),
                pageCount: Math.ceil(items.length / filter.pageSize),
                pageNumber: filter.pageNumber,
                pageSize: filter.pageSize,
                recordCount: items.length,
                sortDirection: filter.sortDirection,
                sortKey: filter.sortKey
            }
        }
    }];
    return global.testDispatch(actionCreator, expectedActions);
});

test('searchLogEntries (http request fails)', () => {
    const { filter } = config.initialState.logViewer;
    const actionCreator = searchLogEntries({ filter });
    const expectedActions = [];
    return global.testDispatchWithNetworkError(actionCreator, expectedActions);
});
