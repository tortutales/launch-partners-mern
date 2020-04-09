// @scripts
import {
    COLLAPSE_MENU_ITEM,
    EXPAND_MENU_ITEM,
    collapseMenuItem,
    expandMenuItem
} from '../../actions/main-menu';

test('expandMenuItem', () => {
    const menuItem = 'investmentProject';
    const actionCreator = expandMenuItem(menuItem);
    const expectedActions = [{
        type: EXPAND_MENU_ITEM,
        payload: menuItem
    }];

    return global.testDispatch(actionCreator, expectedActions);
});

test('collapseMenuItem', () => {
    const menuItem = 'investmentProject';
    const actionCreator = collapseMenuItem(menuItem);
    const expectedActions = [{
        type: COLLAPSE_MENU_ITEM,
        payload: menuItem
    }];

    return global.testDispatch(actionCreator, expectedActions);
});
