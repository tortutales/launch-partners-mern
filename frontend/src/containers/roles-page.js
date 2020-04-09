// @packages
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// @scripts
import RolesPage from '../pages/roles-page';

import {
    deleteRole,
    getAllPermissions,
    getAllRoles,
    getAllUsers,
    insertRole,
    updateRole
} from '../actions';

const RolesPageContainer = ({
    onDeleteRole,
    onGetAllPermissions,
    onGetAllRoles,
    onGetAllUsers,
    onInsertRole,
    onUpdateRole,
    permissions,
    roles,
    users
}) =>
    (
        <RolesPage
            onDeleteRole={onDeleteRole}
            onGetAllPermissions={onGetAllPermissions}
            onGetAllRoles={onGetAllRoles}
            onGetAllUsers={onGetAllUsers}
            onInsertRole={onInsertRole}
            onUpdateRole={onUpdateRole}
            permissions={permissions}
            roles={roles}
            users={users}
        />
    );

RolesPageContainer.propTypes = {
    onDeleteRole: PropTypes.func.isRequired,
    onGetAllPermissions: PropTypes.func.isRequired,
    onGetAllRoles: PropTypes.func.isRequired,
    onGetAllUsers: PropTypes.func.isRequired,
    onInsertRole: PropTypes.func.isRequired,
    onUpdateRole: PropTypes.func.isRequired,
    permissions: PropTypes.arrayOf(PropTypes.shape({
        description: PropTypes.string.isRequired,
        permissionId: PropTypes.number.isRequired
    })).isRequired,
    roles: PropTypes.arrayOf(PropTypes.shape({
        description: PropTypes.string.isRequired,
        permissions: PropTypes.arrayOf(PropTypes.shape({
            description: PropTypes.string.isRequired,
            permissionId: PropTypes.number.isRequired
        })),
        roleId: PropTypes.number.isRequired,
        users: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired
        }))
    })).isRequired,
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
    permissions: security.allPermissions,
    roles: security.allRoles,
    users: security.allUsers
});

const mapDispatchToProps = dispatch => bindActionCreators({
    onDeleteRole: deleteRole,
    onGetAllPermissions: getAllPermissions,
    onGetAllRoles: getAllRoles,
    onGetAllUsers: getAllUsers,
    onInsertRole: insertRole,
    onUpdateRole: updateRole
}, dispatch);

export default connect(
    mapStateToProps, mapDispatchToProps
)(RolesPageContainer);
