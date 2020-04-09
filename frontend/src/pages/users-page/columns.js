// @packages
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

// @scripts
import CtrlAvatarField from '../../controls/general-purpose/ctrl-avatar-field';
import CtrlEditUser from './edit-user';
import CtrlOpenDialogButton from '../../controls/general-purpose/ctrl-open-dialog-button';
import { getRowClass } from '../../styles/globals';
import { toShortDateTimeString } from '../../util';

export const getColumns = ({
    avatarMaxSizeMb,
    classes,
    lang,
    languageList,
    onHideModal,
    onUpdateUser
}) => ([
    {
        id: 'userId',
        label: lang.users.userId,
        width: 60
    }, {
        id: 'avatarUrl',
        label: lang.users.avatar,
        render: cell => (
            <td>
                <CtrlAvatarField
                    id="users-page-avatar"
                    lang={lang}
                    value={cell.dataItem.avatarUrl}
                />
            </td>
        ),
        sortable: false,
        width: 65
    }, {
        id: 'name',
        label: lang.users.name,
        nowrap: true,
        width: 200
    }, {
        id: 'email',
        label: lang.users.email,
        nowrap: true,
        width: 200
    }, {
        id: 'emailConfirmed',
        label: lang.users.emailConfirmed,
        render: cell => (
            <td>
                { cell.dataItem.emailConfirmed &&
                    <div className={classes.gblCenterCell}>
                        <Icon className={classes.confirmIcon}>done</Icon>
                    </div>
                }
            </td>
        ),
        width: 160
    }, {
        id: 'rolesStr',
        label: lang.users.roles,
        nowrap: true,
        width: 200
    }, {
        id: 'languageCode',
        label: lang.users.language,
        render: cell => (
            <td>
                <div className={classes.gblCenterCell}>
                    {(() => {
                        switch (cell.dataItem.languageCode) {
                            case 'en':
                                return <span className={classNames(classes.flag, classes.flagEn)} />;
                            case 'es':
                                return <span className={classNames(classes.flag, classes.flagEs)} />;
                            default:
                                return cell.dataItem.languageCode;
                        }
                    })()}
                </div>
            </td>
        ),
        width: 110
    }, {
        id: 'lockoutEnabled',
        render: cell => (
            <td>
                { cell.dataItem.lockoutEnabled &&
                    <div className={classes.gblCenterCell}>
                        <Icon>lock</Icon>
                    </div>
                }
            </td>
        ),
        label: lang.users.locked,
        width: 120
    }, {
        id: 'lockoutEndDate',
        label: lang.users.lockEnd,
        render: cell => (
            <td>
                { cell.dataItem.lockoutEndDate &&
                    <div>
                        { toShortDateTimeString(cell.dataItem.lockoutEndDate) }
                    </div>
                }
            </td>
        ),
        width: 180
    }, {
        id: 'accessFailedCount',
        label: lang.users.failedAccess,
        render: cell => (
            <td>
                <div className={classes.gblCenterCell}>
                    <span className={classNames({ [classes.failedAccess]: cell.dataItem.accessFailedCount })}>
                        {cell.dataItem.accessFailedCount}
                    </span>
                </div>
            </td>
        ),
        width: 155
    }, {
        id: 'options',
        label: lang.common.options,
        render: cell => (
            <td className={getRowClass(cell, classes)}>
                <CtrlOpenDialogButton
                    content={(<CtrlEditUser
                        avatarMaxSizeMb={avatarMaxSizeMb}
                        id="users-page-edit-form"
                        lang={lang}
                        languageList={languageList}
                        onClose={onHideModal}
                        onSave={onUpdateUser}
                        user={cell.dataItem}
                    />)}
                    icon="edit_icon"
                    id="users-page-edit-button"
                    title={lang.common.edit}
                />
                <IconButton color="primary" id="users-page-delete-button">
                    <Icon>delete</Icon>
                </IconButton>
            </td>
        ),
        sortable: false,
        locked: true,
        width: 125
    }
]);

getColumns.propTypes = {
    avatarMaxSizeMb: PropTypes.number.isRequired,
    classes: PropTypes.object.isRequired,
    lang: PropTypes.shape({
        common: PropTypes.shape({
            cancel: PropTypes.string.isRequired,
            edit: PropTypes.string.isRequired,
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
    onHideModal: PropTypes.func.isRequired,
    onUpdateUser: PropTypes.func.isRequired
};
