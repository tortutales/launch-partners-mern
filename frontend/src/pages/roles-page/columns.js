// @pacakges
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import React from 'react';

// @scripts
import CtrlEditRole from './edit-role';
import CtrlOpenDialogButton from '../../controls/general-purpose/ctrl-open-dialog-button';
import { config } from '../../config';
import { format, toEditableObject } from '../../util';
import { globalUI } from '../../core';

export const getColumns = ({
    onDeleteRole,
    onUpdateRole,
    permissions,
    users
}) => ([{
    groupable: false,
    id: 'description',
    label: config.text.rolesPage.table.description,
    sortable: true
}, {
    groupable: false,
    id: 'usersJoin',
    label: config.text.rolesPage.table.users,
    nowrap: true,
    sortable: true
}, {
    groupable: false,
    id: 'permissionsJoin',
    label: config.text.rolesPage.table.permissions,
    nowrap: true,
    sortable: true
}, {
    groupable: false,
    id: 'options',
    label: config.text.rolesPage.table.options,
    render: (cell) => {
        const confirmDelete = () => globalUI.showModalDialog({
            msg: format(config.text.rolesPage.table.deleteConfirmation, cell.dataItem.description),
            onConfirm: () => onDeleteRole(cell.dataItem.roleId),
            title: config.text.rolesPage.table.delete
        });
        return (
            <td style={{ padding: 0 }}>
                <CtrlOpenDialogButton
                    content={(<CtrlEditRole
                        id="roles-page-edit-form"
                        onSave={onUpdateRole}
                        permissions={permissions}
                        role={toEditableObject(cell.dataItem)}
                        users={users}
                    />)}
                    icon="edit_icon"
                    id="roles-page-edit-button"
                    title={config.text.common.edit}
                />
                <IconButton
                    color="primary"
                    id="delete-role-button"
                    onClick={confirmDelete}
                >
                    <Icon>delete</Icon>
                </IconButton>
            </td>
        );
    },
    sortable: false,
    width: 100
}]);

getColumns.propTypes = {
    onDeleteRole: PropTypes.func.isRequired,
    onUpdateRole: PropTypes.func.isRequired,
    permissions: PropTypes.arrayOf(PropTypes.string).isRequired,
    users: PropTypes.arrayOf(PropTypes.shape({
        email: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    })).isRequired
};
