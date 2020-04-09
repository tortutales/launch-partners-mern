// @packages
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// @scripts
import SettingsPage from '../pages/settings-page';
import { config } from '../config';
import { updateLanguage, updateMyPassword } from '../actions';

const SettingsPageContainer = ({
    languageOnChange,
    languageCode
}) => (
    <SettingsPage
        languageProps={{
            list: config.masterData.languages,
            onChange: languageOnChange,
            value: languageCode
        }}
        userProps={{
            onUpdateMyPassword: updateMyPassword
        }}
    />
);

SettingsPageContainer.propTypes = {
    languageOnChange: PropTypes.func.isRequired,
    languageCode: PropTypes.string.isRequired
};

const mapStateToProps = ({ user }) => ({
    languageCode: user.languageCode
});

const mapDispatchToProps = dispatch => bindActionCreators({
    languageOnChange: updateLanguage
}, dispatch);

export default connect(
    mapStateToProps, mapDispatchToProps
)(SettingsPageContainer);
