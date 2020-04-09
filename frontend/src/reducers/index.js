// @packages
import { combineReducers } from 'redux';

// @scripts
import { LOGOUT } from '../actions';
import { appVersionReducer } from './app-version';
import { commonDataReducer } from './common-data';
import { loadingPageReducer } from './loading-page';
import { logViewerReducer } from './log-viewer';
import { mainMenuReducer } from './main-menu';
import { masterDataReducer } from './master-data';
import { modalDialogReducer } from './modal-dialog';
import { securityReducer } from './security';
import { toastNotificationReducer } from './toast-notification';
import { userReducer } from './user';

const appReducer = combineReducers({
    appVersion: appVersionReducer,
    commonData: commonDataReducer,
    loadingPage: loadingPageReducer,
    logViewer: logViewerReducer,
    mainMenu: mainMenuReducer,
    masterData: masterDataReducer,
    modalDialog: modalDialogReducer,
    security: securityReducer,
    toastNotification: toastNotificationReducer,
    user: userReducer
});

/**
 * We wrap the appReducer into this rootReducer in order to easily
 * handle the LOGOUT event, on which we should reset the state back
 * to the to initial state.
 * @param {Object} state - Current application state.
 * @param {Object} action - Current dispatched action.
 * @return {Object}
 */
export const rootReducer = (state, action) => {
    const currentState = (action.type === LOGOUT)
        ? undefined
        : state;
    return appReducer(currentState, action);
};
