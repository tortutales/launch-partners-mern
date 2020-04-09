// @scripts
import AppSettingsPageContainer from '../../containers/app-settings-page';
import HomePageContainer from '../../containers/home-page';
import LogViewerPageContainer from '../../containers/log-viewer-page';
import LoginPageContainer from '../../containers/login-page';
import MasterDataPageContainer from '../../containers/master-data-page';
import RolesPageContainer from '../../containers/roles-page';
import SettingsPageContainer from '../../containers/settings-page';
import UsersPageContainer from '../../containers/users-page';

// @constants
const components = {
    AppSettingsPageContainer,
    HomePageContainer,
    LogViewerPageContainer,
    LoginPageContainer,
    MasterDataPageContainer,
    RolesPageContainer,
    SettingsPageContainer,
    UsersPageContainer
};

/**
 * @param {string} componentName
 * @returns {function}
 */
export const mapComponent = componentName =>
    components[componentName];
