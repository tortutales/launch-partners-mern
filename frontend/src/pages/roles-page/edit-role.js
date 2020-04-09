// @package
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlMultiselectField from '../../controls/general-purpose/ctrl-multiselect-field';
import CtrlTextField from '../../controls/general-purpose/ctrl-text-field';
import { config } from '../../config';
import { globalUI } from '../../core';
import { initialState } from './state';
import { isAllPropsValid } from '../../util';

// @styles
import styles from './styles';

class CtrlEditRole extends PureComponent {
    constructor(props) {
        super(props);

        this.state = Object.assign({}, initialState, {
            role: (this.props.role || initialState.role)
        });

        this.handleOnFieldChange = this.handleOnFieldChange.bind(this);
        this.handleOnPermissionsSearchChange = this.handleOnPermissionsSearchChange.bind(this);
        this.handleOnPermissionsSelectChange = this.handleOnPermissionsSelectChange.bind(this);
        this.handleOnSave = this.handleOnSave.bind(this);
        this.handleOnTabChange = this.handleOnTabChange.bind(this);
        this.handleOnUsersSearchChange = this.handleOnUsersSearchChange.bind(this);
        this.handleOnUsersSelectChange = this.handleOnUsersSelectChange.bind(this);
    }

    get isFormValid() {
        return isAllPropsValid(this.state.role);
    }

    get selectedUsers() {
        return this.state.role.users.value.map(user => user.email);
    }

    get selectedPermissions() {
        return this.state.role.permissions.value.map(permission => permission.permissionId);
    }

    handleOnFieldChange({ isValid, name, value }) {
        this.setState(({ role }) => ({
            role: Object.assign({}, role, {
                [name]: {
                    isValid,
                    value
                }
            })
        }));
    }

    handleOnUsersSearchChange(usersSearchValue) {
        this.setState({ usersSearchValue });
    }

    handleOnUsersSelectChange({ isValid, name, value }) {
        const { users } = this.props;
        this.setState(({ role }) => ({
            role: Object.assign({}, role, {
                [name]: {
                    isValid,
                    value: users.filter(user => value.includes(user.email))
                }
            })
        }));
    }

    handleOnPermissionsSearchChange(permissionsSearchValue) {
        this.setState({ permissionsSearchValue });
    }

    handleOnPermissionsSelectChange({ isValid, name, value }) {
        const { permissions } = this.props;
        this.setState(({ role }) => ({
            role: Object.assign({}, role, {
                [name]: {
                    isValid,
                    value: permissions.filter(permission => value.includes(permission.permissionId))
                }
            })
        }));
    }

    handleOnSave() {
        const { role } = this.state;
        if (this.isFormValid) {
            globalUI.hideModalDialog();

            const payload = {
                description: role.description.value,
                roleId: role.roleId.value,
                permissions: role.permissions.value.map(permission => permission.permissionId),
                users: role.users.value.map(user => user.userId)
            };
            this.props.onSave(payload);
        } else {
            this.setState({ showErrors: true });
        }
    }

    handleOnTabChange(_event, value) {
        this.setState({ tabIndex: value });
    }

    render() {
        const {
            permissionsSearchValue,
            role,
            showErrors,
            tabIndex,
            usersSearchValue
        } = this.state;

        const {
            className,
            classes,
            id,
            users,
            permissions,
            variant
        } = this.props;

        const editRoleClass = classNames(
            className,
            classes.editRole
        );

        const userList = users.map(user => Object.assign({}, user, {
            nameEmail: `${user.name} <${user.email}>`
        }));

        return (
            <Grid container className={editRoleClass} direction="row" id={`${id}-${role.roleId}`}>
                <Grid item xs={12}>
                    <CtrlTextField
                        autoFocus
                        id={`${id}-description`}
                        label={config.text.rolesPage.popup.description}
                        maxLength={50}
                        minLength={3}
                        name="description"
                        onChange={this.handleOnFieldChange}
                        required
                        showErrors={showErrors}
                        value={role.description.value}
                        variant={variant}
                    />
                </Grid>
                <Grid item xs={12}>
                    <AppBar position="static" color="primary">
                        <Tabs
                            onChange={this.handleOnTabChange}
                            scrollButtons="on"
                            value={tabIndex}
                            variant="fullWidth"
                        >
                            <Tab
                                icon={<Icon>people</Icon>}
                                label={config.text.rolesPage.popup.usersTab}
                            />
                            <Tab
                                icon={<Icon>lock_open</Icon>}
                                label={config.text.rolesPage.popup.permissionsTab}
                            />
                        </Tabs>
                    </AppBar>
                    {
                        tabIndex === 0 &&
                        <CtrlMultiselectField
                            allowSearch
                            allowSelectAll
                            id={`${id}-multiselect-users`}
                            itemDesProp="nameEmail"
                            itemValProp="email"
                            items={userList}
                            name="users"
                            onChange={this.handleOnUsersSelectChange}
                            onChangeSearch={this.handleOnUsersSearchChange}
                            placeholder={config.text.multiselect.search}
                            required
                            searchValue={usersSearchValue}
                            selectedItems={this.selectedUsers}
                            sortItems
                        />
                    }
                    {
                        tabIndex === 1 &&
                        <CtrlMultiselectField
                            allowSearch
                            allowSelectAll
                            id={`${id}-multiselect-permissions`}
                            items={permissions}
                            itemValProp="permissionId"
                            name="permissions"
                            onChange={this.handleOnPermissionsSelectChange}
                            onChangeSearch={this.handleOnPermissionsSearchChange}
                            placeholder={config.text.multiselect.search}
                            required
                            searchValue={permissionsSearchValue}
                            selectedItems={this.selectedPermissions}
                            sortItems
                        />
                    }
                </Grid>
                <Grid item xs={12} className={classes.gblAlignRight}>
                    <Button
                        color="secondary"
                        id={`${id}-cancel-button`}
                        onClick={() => globalUI.hideModalDialog()}
                    >
                        {config.text.rolesPage.popup.cancel}
                    </Button>
                    <Button
                        color="primary"
                        id={`${id}-ok-button`}
                        onClick={() => this.handleOnSave()}
                    >
                        {config.text.rolesPage.popup.save}
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

CtrlEditRole.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    permissions: PropTypes.arrayOf(PropTypes.shape({
        description: PropTypes.string.isRequired,
        permissionId: PropTypes.number.isRequired
    })).isRequired,
    role: PropTypes.shape({
        description: PropTypes.shape({
            isValid: PropTypes.bool.isRequired,
            value: PropTypes.string.isRequired
        }).isRequired,
        roleId: PropTypes.shape({
            isValid: PropTypes.bool.isRequired,
            value: PropTypes.number.isRequired
        }).isRequired,
        users: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired
        }))
    }),
    users: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired
    })).isRequired,
    variant: PropTypes.string
};

CtrlEditRole.defaultProps = {
    className: null,
    role: null,
    variant: 'standard'
};

export default withStyles(styles)(CtrlEditRole);
