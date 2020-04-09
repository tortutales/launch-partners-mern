// packages
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// scripts
import UsersPage from '../pages/users-page';
import { config } from '../config';
import { globalUI } from '../core';

import {
    getAllUsers,
    insertUser,
    updateUser
} from '../actions';

const UsersPageContainer = ({
    onGetAllUsers,
    onInsertUser,
    onUpdateUser,
    users
}) =>
    (
        <UsersPage
            lang={config.text}
            languageList={config.masterData.languages}
            onGetAllUsers={onGetAllUsers}
            onHideModal={globalUI.hideModalDialog}
            onInsertUser={onInsertUser}
            onUpdateUser={onUpdateUser}
            users={users}
        />
    );

UsersPageContainer.propTypes = {
    onGetAllUsers: PropTypes.func.isRequired,
    onInsertUser: PropTypes.func.isRequired,
    onUpdateUser: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(PropTypes.shape({
        accessFailedCount: PropTypes.number.isRequired,
        avatarUrl: PropTypes.string,
        email: PropTypes.string.isRequired,
        emailConfirmed: PropTypes.bool.isRequired,
        languageCode: PropTypes.string.isRequired,
        lockoutEnabled: PropTypes.bool.isRequired,
        lockoutEndDate: PropTypes.string,
        name: PropTypes.string.isRequired,
        permissions: PropTypes.arrayOf(PropTypes.string).isRequired,
        roles: PropTypes.arrayOf(PropTypes.string).isRequired,
        userId: PropTypes.number.isRequired
    })).isRequired
};

const mapStateToProps = ({ security }) => ({
    users: security.allUsers
});

const mapDispatchToProps = dispatch => bindActionCreators({
    onGetAllUsers: getAllUsers,
    onInsertUser: insertUser,
    onUpdateUser: updateUser
}, dispatch);

export default connect(
    mapStateToProps, mapDispatchToProps
)(UsersPageContainer);
