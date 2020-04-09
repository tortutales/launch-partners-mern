// @packages
import axios from 'axios';

// @scripts
import { config } from '../config';

// @constants
export const CHANGE_LOG_FILTER = 'CHANGE_LOG_FILTER';
export const SEARCH_LOG_ENTRIES = 'SEARCH_LOG_ENTRIES';

/**
 * @param {string} name
 * @param {object} value
 */
export const changeLogFilter = ({ name, value }) =>
    ({
        type: CHANGE_LOG_FILTER,
        payload: { name, value }
    });

/**
 * @param {{
 *  date: Date
 *  startHour: number
 *  endHour: number
 *  keyword: string
 *  level: string
 *  pageNumber: number
 *  pageSize: number
 *  sortDirection: string
 *  sortKey: string
 * }} filter
 */
export const searchLogEntries = filter =>
    dispatch =>
        axios.post(config.services.log.search, {
            date: filter.date || new Date(),
            startHour: filter.startHour,
            endHour: filter.endHour,
            keyword: filter.keyword,
            level: (filter.level || '').toLowerCase() === 'any' ? '' : filter.level,
            pageNumber: filter.pageNumber,
            pageSize: filter.pageSize,
            sortDirection: filter.sortDirection,
            sortKey: filter.sortKey
        }).then((results) => {
            dispatch({
                type: SEARCH_LOG_ENTRIES,
                payload: {
                    filter,
                    results
                }
            });
        }).catch(error => Promise.reject(error));
