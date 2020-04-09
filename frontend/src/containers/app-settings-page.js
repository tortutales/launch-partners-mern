// @packages
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// @scripts
import AppSettingsPage from '../pages/app-settings-page';
import { getAppSettings, saveAppSettings } from '../actions';

const AppSettingsPageContainer = ({
    onGetAppSettings,
    onSaveAppSettings,
    userPermissions
}) =>
    (
        <AppSettingsPage
            onGetAppSettings={onGetAppSettings}
            onSaveAppSettings={onSaveAppSettings}
            userPermissions={userPermissions}
        />
    );

AppSettingsPageContainer.propTypes = {
    onGetAppSettings: PropTypes.func.isRequired,
    onSaveAppSettings: PropTypes.func.isRequired,
    userPermissions: PropTypes.arrayOf(PropTypes.string).isRequired
};

const mapStateToProps = ({ user }) => ({
    userPermissions: user.account.permissions
});

const mapDispatchToProps = dispatch => bindActionCreators({
    onGetAppSettings: getAppSettings,
    onSaveAppSettings: saveAppSettings
}, dispatch);

export default connect(
    mapStateToProps, mapDispatchToProps
)(AppSettingsPageContainer);
