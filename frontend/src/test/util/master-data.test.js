// @scripts
import {
    addMasterDataItem,
    deleteMasterDataItem,
    getMasterDataParents,
    searchMasterDataItem,
    sortMasterDataItems,
    updateMasterDataItem
} from '../../util';

/* eslint-disable */
const masterData = [
    { masterDataId: 1000, parentId: null, id: 1000, code: 'L01', description: 'Language',
        children: [
            { masterDataId: 1001, parentId: 1000, id: 1, code: 'en', description: 'English' }
        ]
    },
    { masterDataId: 2000, parentId: null, id: 2000, code: 'L02', description: 'Colors',
        children: [
            { masterDataId: 2001, parentId: 2000, id: 1, code: 'B', description: 'Black' },
            { masterDataId: 2002, parentId: 2000, id: 2, code: 'W', description: 'White',
                children: [
                    { masterDataId: 20010001, parentId: 2002, id: 1, code: 'D', description: 'Dark' },
                    { masterDataId: 20010002, parentId: 2002, id: 2, code: 'L', description: 'Light' },
                ]
            }
        ]
    }
  ];
/* eslint-enable */

describe('addMasterDataItem', () => {
    test('addMasterDataItem, having a parent, valid uniqueness', () => {
        const item = {
            parentId: 2002,
            code: 'S',
            description: 'Soft'
        };
        const result = addMasterDataItem(masterData, item);
        expect(result.item.masterDataId).toEqual(20010003);
        expect(result.item.id).toEqual(3);
        expect(result.result).toEqual(true);
    });
    test('addMasterDataItem, having a parent, without children', () => {
        const item = {
            parentId: 20010002,
            code: 'L1',
            description: 'Light 1'
        };
        const result = addMasterDataItem(masterData, item);
        expect(result.item.masterDataId).toEqual(20010003);
        expect(result.item.id).toEqual(1);
        expect(result.result).toEqual(true);
    });
    test('addMasterDataItem, having a parent, providing masterDataId', () => {
        const item = {
            masterDataId: 90000000,
            parentId: 20010002,
            code: 'L1',
            description: 'Light 1'
        };
        const result = addMasterDataItem(masterData, item);
        expect(result.item.masterDataId).toEqual(90000000);
        expect(result.item.id).toEqual(1);
        expect(result.result).toEqual(true);
    });
    test('addMasterDataItem, having a parent, duplicated Id', () => {
        const item = {
            parentId: 2002,
            id: 1,
            code: 'S',
            description: 'Soft'
        };
        const result = addMasterDataItem(masterData, item);
        expect(result.result).not.toEqual(true);
    });
    test('addMasterDataItem, having a parent, duplicated Code', () => {
        const item = {
            parentId: 2002,
            id: 3,
            code: 'D',
            description: 'Soft'
        };
        const result = addMasterDataItem(masterData, item);
        expect(result.result).not.toEqual(true);
    });
    test('addMasterDataItem, having a parent, duplicated Description', () => {
        const item = {
            parentId: 2002,
            id: 3,
            code: 'S',
            description: 'Dark'
        };
        const result = addMasterDataItem(masterData, item);
        expect(result.result).not.toEqual(true);
    });
    test('addMasterDataItem, not having a parent, valid uniqueness', () => {
        const item = {
            code: 'L03',
            description: 'Status'
        };
        const result = addMasterDataItem(masterData, item);
        expect(result.item.masterDataId).toEqual(20010003);
        expect(result.item.id).toEqual(2001);
        expect(result.result).toEqual(true);
    });
    test('addMasterDataItem, not having a parent, duplicated Id', () => {
        const item = {
            id: 1000,
            code: 'L03',
            description: 'Status'
        };
        const result = addMasterDataItem(masterData, item);
        expect(result.result).not.toEqual(true);
    });
    test('addMasterDataItem, not having a parent, duplicated Code', () => {
        const item = {
            code: 'L01',
            description: 'Status'
        };
        const result = addMasterDataItem(masterData, item);
        expect(result.result).not.toEqual(true);
    });
    test('addMasterDataItem, not having a parent, duplicated Description', () => {
        const item = {
            code: 'L03',
            description: 'Language'
        };
        const result = addMasterDataItem(masterData, item);
        expect(result.result).not.toEqual(true);
    });
});

describe('updateMasterDataItem', () => {
    test('updateMasterDataItem, having a parent, valid uniqueness', () => {
        const item = {
            masterDataId: 20010002,
            code: 'K'
        };
        const result = updateMasterDataItem(masterData, item);
        expect(result.item.code).toEqual('K');
        expect(result.result).toEqual(true);
    });
    test('updateMasterDataItem, having a parent, invalid Id', () => {
        const item = {
            masterDataId: 20010002,
            id: 1
        };
        const result = updateMasterDataItem(masterData, item);
        expect(result.result).not.toEqual(true);
    });
    test('updateMasterDataItem, having a parent, invalid Code', () => {
        const item = {
            masterDataId: 20010002,
            code: 'D'
        };
        const result = updateMasterDataItem(masterData, item);
        expect(result.result).not.toEqual(true);
    });
    test('updateMasterDataItem, having a parent, invalid Description', () => {
        const item = {
            masterDataId: 20010002,
            description: 'Dark'
        };
        const result = updateMasterDataItem(masterData, item);
        expect(result.result).not.toEqual(true);
    });
    test('updateMasterDataItem, not having a parent, valid uniqueness', () => {
        const item = {
            masterDataId: 2000,
            code: 'L2'
        };
        const result = updateMasterDataItem(masterData, item);
        expect(result.item.code).toEqual('L2');
        expect(result.result).toEqual(true);
    });
    test('updateMasterDataItem, not having a parent, invalid Id', () => {
        const item = {
            masterDataId: 2000,
            id: 1000
        };
        const result = updateMasterDataItem(masterData, item);
        expect(result.result).not.toEqual(true);
    });
    test('updateMasterDataItem, not having a parent, invalid Code', () => {
        const item = {
            masterDataId: 2000,
            code: 'L01'
        };
        const result = updateMasterDataItem(masterData, item);
        expect(result.result).not.toEqual(true);
    });
    test('updateMasterDataItem, not having a parent, invalid Description', () => {
        const item = {
            masterDataId: 2000,
            description: 'Language'
        };
        const result = updateMasterDataItem(masterData, item);
        expect(result.result).not.toEqual(true);
    });
});

describe('deleteMasterDataItem', () => {
    test('deleteMasterDataItem, having a parent', () => {
        const newMasterDataTree = deleteMasterDataItem(masterData, 20010002);
        const search = searchMasterDataItem(newMasterDataTree, 20010002);
        expect(search).toEqual(null);
    });
    test('deleteMasterDataItem, not having a parent', () => {
        const newMasterDataTree = deleteMasterDataItem(masterData, 1000);
        const search = searchMasterDataItem(newMasterDataTree, 1000);
        expect(search).toEqual(null);
    });
});

test('getMasterDataParents', () => {
    const parents = getMasterDataParents(masterData);
    const expected = [1000, 2000, 2002];
    expect(parents).toEqual(expected);
});

describe('sortMasterDataItems', () => {
    test('sortMasterDataItems, no recursive, null masterData', () => {
        const sortedItems = sortMasterDataItems(null, false);
        expect(sortedItems).toEqual(null);
    });
    test('sortMasterDataItems, no recursive, at list 2 masterData items', () => {
        const sortedItems = sortMasterDataItems(masterData, false);
        expect(sortedItems[0].description).toEqual('Colors');
        expect(sortedItems[1].description).toEqual('Language');
    });
    test('sortMasterDataItems, recursive, no recursive children', () => {
        const sortedItems = sortMasterDataItems(masterData[0].children);
        expect(sortedItems[0].description).toEqual('English');
    });
    test('sortMasterDataItems, recursive, at list 2 children', () => {
        const sortedItems = sortMasterDataItems(masterData);
        expect(sortedItems[0].description).toEqual('Colors');
        expect(sortedItems[1].description).toEqual('Language');
    });
});
