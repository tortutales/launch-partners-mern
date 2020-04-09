// @packages
import axios from 'axios';

// @scripts
import { config } from '../config';

// @constants
export const COLLAPSE_MASTER_DATA_ITEMS = 'COLLAPSE_MASTER_DATA_ITEMS';
export const DELETE_MASTER_DATA = 'DELETE_MASTER_DATA';
export const EXPAND_MASTER_DATA_ITEMS = 'EXPAND_MASTER_DATA_ITEM';
export const GET_ALL_MASTER_DATA = 'GET_ALL_MASTER_DATA';
export const INSERT_MASTER_DATA = 'INSERT_MASTER_DATA';
export const UPDATE_MASTER_DATA = 'UPDATE_MASTER_DATA';

export const getAllMasterData = () =>
    dispatch => axios
        .get(config.services.masterData.getAll)
        .then((response) => {
            dispatch({
                type: GET_ALL_MASTER_DATA,
                payload: response
            });
        })
        .catch(error => Promise.reject(error));

/**
 * @param {{
 *  parentId: number,
 *  id: number,
 *  code: string,
 *  description: string
 * }} item
 */
export const insertMasterData = item =>
    dispatch => axios
        .put(config.services.masterData.insert, item)
        .then((response) => {
            dispatch({
                type: INSERT_MASTER_DATA,
                payload: response
            });
        })
        .catch(error => Promise.reject(error));

/**
 * @param {{
 *  code: string,
 *  description: string,
 *  id: number,
 *  masterDataId: number
 * }} item
 */
export const updateMasterData = item =>
    dispatch => axios
        .patch(config.services.masterData.update, item)
        .then((response) => {
            dispatch({
                type: UPDATE_MASTER_DATA,
                payload: response
            });
        })
        .catch(error => Promise.reject(error));

/**
 * @param {number} masterDataId
 */
export const deleteMasterData = masterDataId =>
    dispatch => axios
        .delete(config.services.masterData.delete, {
            params: {
                masterDataId
            }
        })
        .then(() => {
            dispatch({
                type: DELETE_MASTER_DATA,
                payload: masterDataId
            });
        })
        .catch(error => Promise.reject(error));

/**
 * @param {number|number[]} masterDataIds
 */
export const collapseMasterDataItems = masterDataIds =>
    ({
        type: COLLAPSE_MASTER_DATA_ITEMS,
        payload: masterDataIds
    });

/**
 * @param {numbernumber[]} masterDataIds
 */
export const expandMasterDataItems = masterDataIds =>
    ({
        type: EXPAND_MASTER_DATA_ITEMS,
        payload: masterDataIds
    });
