// @packages
import PropTypes from 'prop-types';
import React from 'react';

// @scripts
import CtrlAvatarField from '../../controls/general-purpose/ctrl-avatar-field';
import CtrlOpenDialogButton from '../../controls/general-purpose/ctrl-open-dialog-button';
import CtrlViewProfile from './view-profile';
import { config } from '../../config';
import { getRowClass } from '../../styles/globals';

export const getColumns = ({
    classes,
    onHideModal
}) => ([
    {
        id: 'userId',
        label: config.text.users.userId,
        width: 60
    }, {
        id: 'avatarUrl',
        label: config.text.users.avatar,
        render: cell => (
            <td>
                <CtrlAvatarField
                    id="users-page-avatar"
                    value={cell.dataItem.avatarUrl}
                />
            </td>
        ),
        sortable: false,
        width: 100
    }, {
        id: 'name',
        label: config.text.users.name,
        nowrap: true,
        width: 200
    }, {
        id: 'description',
        label: config.text.users.description,
        nowrap: true
    }, {
        id: 'options',
        label: config.text.common.options,
        render: cell => (
            <td className={getRowClass(cell, classes)}>
                <CtrlOpenDialogButton
                    content={(<CtrlViewProfile
                        id="users-page-edit-form"
                        onClose={onHideModal}
                        user={cell.dataItem}
                    />)}
                    icon="remove_red_eye"
                    id="users-page-edit-button"
                    title="Profile"
                />
            </td>
        ),
        sortable: false,
        locked: true,
        width: 80
    }
]);

getColumns.propTypes = {
    classes: PropTypes.object.isRequired,
    onHideModal: PropTypes.func.isRequired,
    onUpdateUser: PropTypes.func.isRequired
};
