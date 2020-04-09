// @packages
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlEditRole from './edit-role';
import CtrlOpenDialogButton from '../../controls/general-purpose/ctrl-open-dialog-button';
import CtrlTable from '../../controls/general-purpose/ctrl-table';
import { config } from '../../config';
import { getColumns } from './columns';

// @styles
import styles from './styles';

class RolesPage extends PureComponent {
    componentDidMount() {
        this.props.onGetAllPermissions();
        this.props.onGetAllRoles();
        this.props.onGetAllUsers();
    }

    render() {
        const {
            classes,
            onDeleteRole,
            onInsertRole,
            onUpdateRole,
            permissions,
            roles,
            users
        } = this.props;

        const rolesList = roles.map(role => Object.assign({}, role, {
            permissionsJoin: (role.permissions.map(permission => permission.description) || []).join(', '),
            usersJoin: (role.users.map(user => user.name) || []).join(', ')
        }));

        return (
            <Grid container id="roles-page" className={classes.rolesPage}>
                <Grid item xs={10} />
                <Grid item xs={2} style={{ textAlign: 'right' }}>
                    <CtrlOpenDialogButton
                        className={classes.addButton}
                        content={(<CtrlEditRole
                            id="roles-page-add-form"
                            onSave={onInsertRole}
                            permissions={permissions}
                            users={users}
                        />)}
                        icon="add"
                        id="roles-page-add-button"
                        text={config.text.common.new}
                        title={config.text.common.new}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CtrlTable
                        columns={
                            getColumns({
                                onDeleteRole,
                                onUpdateRole,
                                permissions,
                                users
                            })
                        }
                        data={rolesList}
                        id="roles-page-table"
                        pageable
                        sortable
                    />
                </Grid>
            </Grid>
        );
    }
}

RolesPage.propTypes = {
    classes: PropTypes.object.isRequired,
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
            email: PropTypes.string.isRequired,
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

export default withStyles(styles)(RolesPage);
