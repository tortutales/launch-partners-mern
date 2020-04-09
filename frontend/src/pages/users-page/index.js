// @packages
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlEditUser from './edit-user';
import CtrlOpenDialogButton from '../../controls/general-purpose/ctrl-open-dialog-button';
import CtrlTable from '../../controls/general-purpose/ctrl-table';
import { getColumns } from './columns';

// @styles
import styles from './styles';

// @constants
const DEFAULT_AVATAR_MAX_SIZE_MB = 1;

class UsersPage extends PureComponent {
    componentDidMount() {
        this.props.onGetAllUsers();
    }

    render() {
        const {
            avatarMaxSizeMb,
            classes,
            lang,
            languageList,
            onHideModal,
            onInsertUser,
            onUpdateUser,
            users
        } = this.props;

        const userColumns = getColumns({
            avatarMaxSizeMb,
            classes,
            lang,
            languageList,
            onHideModal,
            onUpdateUser
        });

        const userList = users.map(user => Object.assign({}, user, {
            rolesStr: (user.roles || []).join(', ')
        }));

        return (
            <Grid
                className={classes.usersPage}
                container
                id="users-page"
            >
                <Grid item xs={10} />
                <Grid item xs={2} style={{ textAlign: 'right' }}>
                    <CtrlOpenDialogButton
                        className={classes.addButton}
                        content={(<CtrlEditUser
                            avatarMaxSizeMb={avatarMaxSizeMb}
                            id="users-page-add-form"
                            lang={lang}
                            languageList={languageList}
                            onClose={onHideModal}
                            onSave={onInsertUser}
                        />)}
                        icon="add"
                        id="users-page-add-button"
                        text={lang.common.new}
                        title={lang.common.new}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CtrlTable
                        columns={userColumns}
                        data={userList}
                        id="users-page-table"
                        pageable
                        sortable
                    />
                </Grid>
            </Grid>
        );
    }
}

UsersPage.propTypes = {
    avatarMaxSizeMb: PropTypes.number,
    classes: PropTypes.object.isRequired,
    lang: PropTypes.shape({
        common: PropTypes.shape({
            cancel: PropTypes.string.isRequired,
            edit: PropTypes.string.isRequired,
            new: PropTypes.string.isRequired,
            options: PropTypes.string.isRequired,
            save: PropTypes.string.isRequired
        }),
        users: PropTypes.shape({
            avatar: PropTypes.string.isRequired,
            avatarSizeExceeded: PropTypes.string.isRequired,
            changeAvatar: PropTypes.string.isRequired,
            confirmPassword: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            emailConfirmed: PropTypes.string.isRequired,
            failedAccess: PropTypes.string.isRequired,
            language: PropTypes.string.isRequired,
            lockEnd: PropTypes.string.isRequired,
            locked: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            password: PropTypes.string.isRequired,
            roles: PropTypes.string.isRequired,
            userId: PropTypes.string.isRequired
        })
    }).isRequired,
    languageList: PropTypes.arrayOf(PropTypes.shape({
        code: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    })).isRequired,
    onGetAllUsers: PropTypes.func.isRequired,
    onHideModal: PropTypes.func.isRequired,
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

UsersPage.defaultProps = {
    avatarMaxSizeMb: DEFAULT_AVATAR_MAX_SIZE_MB
};

export default withStyles(styles)(UsersPage);
