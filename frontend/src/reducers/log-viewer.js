// @packages
import { combineReducers } from 'redux';

// @scripts
import { CHANGE_LOG_FILTER, SEARCH_LOG_ENTRIES } from '../actions';
import { config } from '../config';

/**
 * @returns {{
 *  date: date,
 *  startHour: number,
 *  endHour: number,
 *  keyword: string,
 *  level: string,
 *  pageNumber: number,
 *  pageSize: number,
 *  sortDirection: string,
 *  sortKey: string
 * }}
 */
export const filterReducer = (
    state = config.initialState.logViewer.filter, action
) => {
    switch (action.type) {
        case CHANGE_LOG_FILTER:
            return Object.assign({}, state, {
                [action.payload.name]: action.payload.value
            });
        case SEARCH_LOG_ENTRIES:
            return action.payload.filter;
        default:
            return state;
    }
};

/**
 * @returns {{
 *  items: {
 *      correlationId: string,
 *      date: date,
 *      details: string,
 *      level: string,
 *      message: string
 *  },
 *  recordCount: number
 * }}
 */
export const resultsReducer = (
    state = config.initialState.logViewer.results, action
) => {
    switch (action.type) {
        case SEARCH_LOG_ENTRIES:
            return action.payload.results;
        default:
            return state;
    }
};

export const logViewerReducer = combineReducers({
    filter: filterReducer,
    results: resultsReducer
});
