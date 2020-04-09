// @scripts
import HomePageContainer from '../../containers/home-page';
import LoginPageContainer from '../../containers/login-page';
import SettingsPageContainer from '../../containers/settings-page';
import UsersPageContainer from '../../containers/users-page';

// @constants
const components = {
    HomePageContainer,
    LoginPageContainer,
    SettingsPageContainer,
    UsersPageContainer
};

/**
 * @param {string} componentName
 * @returns {function}
 */
export const mapComponent = componentName =>
    components[componentName];
