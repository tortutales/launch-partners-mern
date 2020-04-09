// @packages
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// @scripts
import SettingsPage from '../pages/settings-page';
import { updateUser } from '../actions';

const SettingsPageContainer = ({ user, onUpdateUser }) => (
    <SettingsPage user={user} onUpdateUser={onUpdateUser} />
);

SettingsPageContainer.propTypes = {
    user: PropTypes.shape({
        avatarUrl: PropTypes.string,
        description: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        userId: PropTypes.number.isRequired
    }).isRequired,
    onUpdateUser: PropTypes.func.isRequired
};

const mapStateToProps = ({ user }) => ({
    user: user.account
});

const mapDispatchToProps = dispatch => bindActionCreators({
    onUpdateUser: updateUser
}, dispatch);

export default connect(
    mapStateToProps, mapDispatchToProps
)(SettingsPageContainer);
