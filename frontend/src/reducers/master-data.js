// @packages
import { combineReducers } from 'redux';

// @scripts
import { config } from '../config';

import {
    COLLAPSE_MASTER_DATA_ITEMS,
    DELETE_MASTER_DATA,
    EXPAND_MASTER_DATA_ITEMS,
    GET_ALL_MASTER_DATA,
    INSERT_MASTER_DATA,
    UPDATE_MASTER_DATA
} from '../actions';

import {
    addMasterDataItem,
    deleteMasterDataItem,
    sortArray,
    updateMasterDataItem
} from '../util';

/**
 * @return {{
 *  addPermission: string,
 *  autoId: boolean,
 *  code: string,
 *  deletePermission: string,
 *  description: string,
 *  editPermission: string,
 *  id: number,
 *  masterDataId: number,
 *  parentId: number
 * }[]}
 */
export const itemsReducer = (
    state = config.initialState.masterData.items, action
) => {
    switch (action.type) {
        case GET_ALL_MASTER_DATA:
            return sortArray({
                sortKey: 'description',
                source: action.payload
            });
        case INSERT_MASTER_DATA:
            return addMasterDataItem(state, action.payload).masterData;
        case UPDATE_MASTER_DATA:
            return updateMasterDataItem(state, action.payload).masterData;
        case DELETE_MASTER_DATA:
            return deleteMasterDataItem(state, action.payload);
        default:
            return state;
    }
};

/**
 * @return {number[]}
 */
export const expandedItemsReducer = (
    state = config.initialState.masterData.expandedItems, action
) => {
    switch (action.type) {
        case COLLAPSE_MASTER_DATA_ITEMS:
            if (action.payload && Array.isArray(action.payload)) {
                return state.filter(item => !action.payload.find(item));
            } else if (action.payload && !Array.isArray(action.payload)) {
                return state.filter(item => item !== action.payload);
            }

            return [];
        case EXPAND_MASTER_DATA_ITEMS:
            if (Array.isArray(action.payload)) {
                return [...state, ...action.payload];
            }

            return [...state, action.payload];
        default:
            return state;
    }
};

export const masterDataReducer = combineReducers({
    expandedItems: expandedItemsReducer,
    items: itemsReducer
});
