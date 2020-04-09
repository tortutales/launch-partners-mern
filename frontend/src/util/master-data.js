// @imports
import { config } from '../config';
import { format, getMaxFromArray, sortArray } from '../util';

/**
 * Clones the passed-in MasterData tree.
 * @param {Aray} masterData
 * @returns {Array}
 */
export const cloneMasterDataTree = masterData =>
    masterData.map(node =>
        node.children
            ? Object.assign({}, node, { children: cloneMasterDataTree(node.children) })
            : Object.assign({}, node));

/**
 * Visits all nodes of a MasterData tree recursively.
 * @param {Array} masterData
 * @param {function} onVisiteNode
 */
export const visitMasterDataNodes = (masterData, onVisiteNode) => {
    masterData.forEach((node) => {
        onVisiteNode(node);
        if (node.children && node.children.length) {
            visitMasterDataNodes(node.children, onVisiteNode);
        }
    });
};

/**
 * Searches a MasterData item matching the passed-in masterDataId.
 * @param {Array} masterData
 * @param {number} masterDataId
 * @returns {Object}
 */
export const searchMasterDataItem = (masterData, masterDataId) => {
    let item = null;
    visitMasterDataNodes(masterData, (node) => {
        if (node.masterDataId === masterDataId) {
            item = node;
        }
    });
    return item;
};

/**
 * Searchs all master data parents (nodes having at least one child)
 * and returns an array of masterDataId's.
 * @param {Array} masterData
 * @returns {Array}
 */
export const getMasterDataParents = (masterData) => {
    const parents = [];
    visitMasterDataNodes(masterData, (node) => {
        if (node.children && node.children.length) {
            parents.push(node.masterDataId);
        }
    });
    return parents;
};

/**
 * Gets the max masterDataId from the passed-in masterData tree.
 * @param {Array} masterData
 * @returns {number}
 */
export const getMaxMasterDataId = (masterData) => {
    let max = 0;
    visitMasterDataNodes(masterData, (node) => {
        max = Math.max(max, node.masterDataId);
    });
    return max;
};

/**
 * Sorts all items into the passed-in MasterData tree.
 * @param {Array} masterData
 * @param {boolean} recursive
 * @returns {Array}
 */
export const sortMasterDataItems = (masterData, recursive = true) => {
    const sortedItems = masterData && masterData.length >= 2
        ? sortArray({
            sortKey: 'description',
            source: masterData
        })
        : masterData;
    if (recursive) {
        sortedItems.forEach((node) => {
            if (node.children && node.children.length >= 2) {
                node.children = sortMasterDataItems(node.children, recursive);
            }
        });
    }
    return sortedItems;
};

/**
 * Checks wheter the passed-in MasterData item is unique by Id,
 * Code and Description withing the item siblings.
 * @param {Object[]} masterDataSiblings
 * @param {Object} item
 * @returns {boolean|string} True if unique, otherwise an error message.
 */
export const checkMasterDataUniqueness = (masterDataSiblings, item) => {
    let result = true;
    const text = config.text.masterDataPage.notifications;
    masterDataSiblings.forEach((node) => {
        if (node.masterDataId !== item.masterDataId) {
            if (node.id === item.id) {
                result = format(text.existingId, item.id);
            } else if (node.code === item.code) {
                result = format(text.existingCode, item.code);
            } else if (node.description === item.description) {
                result = format(text.existingDescription, item.description);
            }
        }
    });
    return result;
};

/**
 * Adds a MasterData item into the passed-in MasterData tree.
 * @param {Array} masterData
 * @param {Object} item
 * @returns {{
 *  item: {Object} the added item with assiged masterDataId and id,
 *  masterData: {Array} A cloned masterData,
 *  result: {boolean|string} True if adding succeeded, othewise an error message
 * }}
 */
export const addMasterDataItem = (masterData, item) => {
    let masterDataClone = cloneMasterDataTree(masterData);
    let siblings = masterDataClone;
    let parent = null;
    if (item.parentId) {
        parent = searchMasterDataItem(masterDataClone, item.parentId);
        parent.children = parent.children || [];
        siblings = parent.children;
    }
    const result = checkMasterDataUniqueness(siblings, item);
    let addedItem = null;
    if (result === true) {
        addedItem = Object.assign({}, item);
        addedItem.masterDataId = item.masterDataId || 1 + getMaxMasterDataId(
            masterDataClone
        );
        addedItem.id = item.id || 1 + getMaxFromArray({
            defaultValue: 0,
            maxKey: 'id',
            source: siblings
        });
        siblings.push(addedItem);
    }
    if (parent) {
        parent.children = sortMasterDataItems(parent.children, false);
    } else {
        masterDataClone = sortMasterDataItems(masterDataClone, false);
    }
    return {
        item: addedItem,
        masterData: masterDataClone,
        result
    };
};

/**
 * Updates a MasterData item into the passed-in MasterData tree.
 * @param {Array} masterData
 * @param {Object} item
 * @returns {{
 *  item: {Object} the modified item,
 *  masterData: {Array} A cloned masterData,
 *  result: {boolean|string} True if updating succeeded, othewise an error message
 * }}
 */
export const updateMasterDataItem = (masterData, item) => {
    let masterDataClone = cloneMasterDataTree(masterData);
    const storedItem = searchMasterDataItem(masterDataClone, item.masterDataId);
    const modifiedItem = Object.assign(storedItem, {
        code: item.code,
        description: item.description,
        id: item.id
    });
    const parent = modifiedItem.parentId
        ? searchMasterDataItem(masterDataClone, modifiedItem.parentId)
        : null;
    const siblings = parent
        ? parent.children
        : masterDataClone;
    const result = checkMasterDataUniqueness(siblings, modifiedItem);
    if (result === true && parent) {
        parent.children = parent.children.map(
            child => child.masterDataId === item.masterDataId ? modifiedItem : child
        );
    } else if (result === true) {
        masterDataClone = masterDataClone.map(
            child => child.masterDataId === item.masterDataId ? modifiedItem : child
        );
    }
    if (parent) {
        parent.children = sortMasterDataItems(parent.children, false);
    } else {
        masterDataClone = sortMasterDataItems(masterDataClone, false);
    }
    return {
        item: modifiedItem,
        masterData: masterDataClone,
        result
    };
};

/**
 * Deletes a MasterData item from the passed-in MasterData tree.
 * @param {Array} masterData
 * @param {Object} item
 * @returns {Array}
 */
export const deleteMasterDataItem = (masterData, masterDataId) => {
    let masterDataClone = cloneMasterDataTree(masterData);
    const item = searchMasterDataItem(masterDataClone, masterDataId);
    const parent = item.parentId
        ? searchMasterDataItem(masterDataClone, item.parentId)
        : null;
    if (parent) {
        parent.children = parent.children.filter(
            child => child.masterDataId !== masterDataId
        );
    } else {
        masterDataClone = masterDataClone.filter(
            child => child.masterDataId !== masterDataId
        );
    }
    return masterDataClone;
};
