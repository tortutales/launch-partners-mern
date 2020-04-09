// packages
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// scripts
import UsersPage from '../pages/users-page';
import { globalUI } from '../core';
import { getAllUsers } from '../actions';

const UsersPageContainer = ({
    onGetAllUsers,
    users
}) =>
    (
        <UsersPage
            onGetAllUsers={onGetAllUsers}
            onHideModal={globalUI.hideModalDialog}
            users={users}
        />
    );

UsersPageContainer.propTypes = {
    onGetAllUsers: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(PropTypes.shape({
        avatarUrl: PropTypes.string,
        description: PropTypes.string,
        email: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        userId: PropTypes.number.isRequired
    })).isRequired
};

const mapStateToProps = ({ security }) => ({
    users: security.allUsers
});

const mapDispatchToProps = dispatch => bindActionCreators({
    onGetAllUsers: getAllUsers
}, dispatch);

export default connect(
    mapStateToProps, mapDispatchToProps
)(UsersPageContainer);
